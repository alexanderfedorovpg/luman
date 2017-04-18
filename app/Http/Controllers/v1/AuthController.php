<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use App\Models\User;

/**
 * Контроллер аутентификации пользователей CMS
 * @package App\Http\Controllers\v1\Cms
 */
class AuthController extends CmsController
{
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->middleware('auth', [
            'except' => ['login']
        ]);
    }

    /**
     * Экшен аутентификации
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $login = $request->input('login');
        $password = $request->input('password');
        if ($user = User::checkAccessByLogin($login, $password)) {
            if ($user->isEnabled()) {
                if (!$user->api_token) {
                    $user->updateApiToken()->save();
                }
                if ($user->need_change_password) {
                    return $this->respondFail403x('Must change password');
                }
                return $this->respond(['api_token' => $user->api_token]);
            }
            return $this->respondFail403x('The user is blocked');
        }

        return $this->respondFail403x('Incorrect login or password');
    }

}