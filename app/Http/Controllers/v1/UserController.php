<?php

namespace App\Http\Controllers\v1;

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
     * Получение всех пользователей
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::all();

        return $this->respond($users);
    }

    /**
     * Получение пользователя по ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return $this->respondNotFound('User is not found');
        }

        return $this->respond($user);
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
            return $this->respond(['success' => true]);
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
            $this->validate($request,  $rules);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->getMessage());
        }

        return $this->respond(['success' => $user->update($request->all())]);
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