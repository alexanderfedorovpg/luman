<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 30.03.17
 * Time: 15:06
 */

namespace App\Http\Controllers\v1\Cms;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;
use App\User;

class AuthController extends ApiController
{
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            return $this->respond(['api_token' => '111']);
        }

        return $this->respondFail403x('Incorrect login or password');
    }
}