<?php

namespace App\Http\Controllers\v1;


use App\Http\Transformers\v1\UsersTransformer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Auth;
use Hash;
use App\Models\News;

/**
 * Контроллер управления пользователя
 * @package App\Http\Controllers\v1\Cms
 */
class UserController extends CmsController
{


    /**
     * @var \App\Http\Transformers\v1\UsersTransformer
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
            $rules['password'] = 'required|min:6';
//            $rules['password_confirmation']=  'min:6';
            $this->validate($request, $rules);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        }

        $user = User::createNew($request->all());
        if ($user) {

            return $this->respond($this->usersTransformer->transform($user->toArray()));
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
        $user->update($request->all());
        return $this->respond($this->usersTransformer->transform($user->toArray()));
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

    /**
     * Профмль текущего пользователя
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        $user = Auth::user();
        return $this->respond($this->usersTransformer->transform($user->toArray()));
    }

    /**
     * Редактирование профиля
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function editProfile(Request $request)
    {
        $user = Auth::user();

        try {
            $this->validate($request, [
                'firstname' => 'required|max:255',
                'lastname' => 'max:255',
                'login' => "required|max:255|unique:users,login,{$user->id}",
                'email' => "required|email|unique:users,email,{$user->id}",
                'avatar_id' => 'integer|exists:cdn_files,id',
                'password' => 'min:6|confirmed',
                'password_confirmation'=> 'min:6',
                'need_change_password'=>'in:1,0'
            ]);
            $requestData = $request->all();
            $password = $request->input('password');
            if ($password) {
                $user->setAuthPassword($password);
            }

            return $this->respond(['success' => $user->update($requestData)]);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        }
    }

    /**
     * Статистика пользователей
     *
     * @param int $userId ID пользователя
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStatistic($userId)
    {
        try {
            $user = User::findOrFail($userId);
            $written = News::where('is_publish', '=', true)
                ->where('editor_id', '=', $user->id)->count();
            $edited = News::where('editor_id', '=', $user->id)->count();

            return $this->respond([
                'written' => $written,
                'edited' => $edited
            ]);
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('User not found');
        }
    }

    /**
     * Статистика текущего пользователя
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStatisticCurrentUser()
    {
        try {
            $user = Auth::user();

            $written = News::where('is_publish', '=', true)
                ->where('editor_id', '=', $user->id)->count();
            $edited = News::where('editor_id', '=', $user->id)->count();

            return $this->respond([
                'written' => $written,
                'edited' => $edited
            ]);
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('User not found');
        }
    }
}