<?php

namespace App\Http\Controllers\v1;


use App\Http\Controllers\ApiController;
use App\Http\Transformers\v1\UsersTransformer;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Auth;
use Hash;
use App\Models\News;

/**
 * Контроллер управления пользователя
 * @package App\Http\Controllers\v1\Cms
 */
class UserController extends ApiController
{


    /**
     * @var \App\Http\Transformers\v1\UsersTransformer
     */
    protected $usersTransformer;

    /**
     * UserController constructor.
     * @param UsersTransformer $usersTransformer
     */
    public function __construct(UsersTransformer $usersTransformer)
    {

        $this->usersTransformer = $usersTransformer;
    }

    /**
     * Получение всех пользователей
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::where('is_deleted', '=', '0')->get();

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

            $user = User::where('id', '=', $id)->where('is_deleted', '=', '0')->firstOrFail();


            return $this->respond($this->usersTransformer->transform($user->toArray()));
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound($e->getMessage());
        } catch (\Exception $e) {
            return $this->respondFail500x($e > getMessage());
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

            if (!Auth::user()->isAdmin()) {
                return response('Unauthorized.', 401);
            }


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



        if (Auth::user()->isAdmin() || Auth::id() == $id || Auth::user()->can('v1.user-update')) {


            $user = User::find($id);
            if (!$user) {
                return $this->respondNotFound('User is not found');
            }

            try {
                $validation = Validator::make(
                    $request->all(),
                    [
                        'firstname' => 'max:255',
                        'lastname' => 'max:255',
                        'login' => "max:255|unique:users,login,{$id}",
                        'email' => "email|unique:users,email,{$id}",
                        'need_change_password' => 'boolean',
                        'enabled' => 'boolean',
                        'avatar_id' => 'integer|exists:cdn_files,id'
                    ]
                );
                if ($validation->fails()) {

                    throw new ValidationException($validation->errors()->all());
                }

            } catch (ValidationException $e) {
                return $this->respondFail422x($e->validator);
            }
            $user->update($request->all());
            return $this->respond($this->usersTransformer->transform($user->toArray()));
        } else {
            return response('Unauthorized.', 401);
        }
    }

    /**
     * Удаление пользователя
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {

        if (Auth::user()->isAdmin() || Auth::user()->can('v1.user-destroy')) {


            $user = User::find($id);
            if ($user) {
                $user->is_deleted = true;
                $user->deleted_at = Carbon::now();
                return $this->respond(['success' => $user->save()]);
            }

            return $this->respondNotFound('User is not found');

        } else {
            return response('Unauthorized.', 401);
        }
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


        if (Auth::user()->isAdmin() || Auth::id() == $user->id || Auth::user()->can('v1.user-editProfile')) {


            try {
                $this->validate($request, [
                    'firstname' => 'required|max:255',
                    'lastname' => 'max:255',
                    'login' => "required|max:255|unique:users,login,{$user->id}",
                    'email' => "required|email|unique:users,email,{$user->id}",
                    'avatar_id' => 'integer|exists:cdn_files,id',
                    'password' => 'min:6|confirmed',
                    'password_confirmation' => 'min:6',
                    'need_change_password' => 'in:1,0'
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

        } else {
            return response('Unauthorized.', 401);
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

            if (Auth::user()->isAdmin() || Auth::id() == $user->id || Auth::user()->can('v1.user-getStatistic')) {
                $written = News::where('is_publish', '=', true)
                    ->where('editor_id', '=', $user->id)->count();
                $edited = News::where('editor_id', '=', $user->id)->count();

                return $this->respond([
                    'written' => $written,
                    'edited' => $edited
                ]);
            } else {
                return response('Unauthorized.', 401);
            }
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