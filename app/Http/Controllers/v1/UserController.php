<?php

namespace App\Http\Controllers\v1;


use App\Http\Transformers\v1\UsersTransformer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Contracts\Validation\ValidationException;
use App\User;

/**
 * Контроллер управления пользователя
 * @package App\Http\Controllers\v1\Cms
 */
class UserController extends CmsController
{


    /**
     * @var App\Http\Transformers\v1\UsersTransformer
     */
    protected $usersTransformer;

    /**
     * UserController constructor.
     * @param UsersTransformer $usersTransformer
     */
    public function __construct(UsersTransformer  $usersTransformer)
    {
        parent::__construct();
        $this->usersTransformer = $usersTransformer;
    }

    /**
     * Получение всех пользователей
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::all();

        return $this->respond($this->usersTransformer->transformCollection($users->toArray()));
    }

    /**
     * Получение пользователя по ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $user = User::findOrFail($id);
            if (!$user) {
                return $this->respondNotFound('User is not found');
            }
            return $this->respond($this->usersTransformer->transform($user->toArray()));
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound($e);
        } catch (\Exception $e) {
            return $this->respondFail500x($e);
        }

    }

    /**
     * Добавление пользователя
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        try {
            $rules = User::$rules;
            $rules['password'] = 'required|min:6|confirmed';
            $this->validate($request, $rules);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->getMessage());
        }

        $user = User::createNew($request->all());
        if ($user) {
            return $this->respondCreated(['success' => true]);
        }

        return $this->respondFail500x();

    }

    /**
     * Редактирование пользователя
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return $this->respondNotFound('User is not found');
        }

        try {
            $rules = User::$rules;
            $rules['email'] = $rules['email'] . ",{$id}";
            $rules['login'] = $rules['login'] . ",{$id}";
            $this->validate($request, $rules);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->getMessage());
        }

        return $this->respondCreated(['success' => $user->update($request->all())]);
    }

    /**
     * Удаление пользователя
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            return $this->respond(['success' => $user->delete()]);
        }

        return $this->respondNotFound('User is not found');
    }


}