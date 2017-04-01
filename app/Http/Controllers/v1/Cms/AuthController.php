<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 30.03.17
 * Time: 15:06
 */

namespace App\Http\Controllers\v1\Cms;

use Illuminate\Http\Request;
use App\User;
use Auth;

class AuthController extends CmsController
{
    public function __construct()
    {
        $this->middleware('auth', [
            'except' => ['login']
        ]);
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        if ($user = User::checkAccessByLogin($email, $password)) {
            if (!$user->api_token) {
                $user->updateApiToken()->save();
            }
            return $this->respond(['api_token' => $user->api_token]);
        }

        return $this->respondFail403x('Incorrect login or password');
    }

}