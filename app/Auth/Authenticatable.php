<?php

namespace App\Auth;

use Illuminate\Auth\Authenticatable as BaseAuthenticatable;
use Illuminate\Support\Facades\Hash;

/**
 * @packege App\Auth
 */
trait Authenticatable
{
    use BaseAuthenticatable;

    /**
     * Проверяет логин и пароль
     *
     * @param string $email Email пользователя
     * @param string $password Пароль польщователя
     */
    public static function checkAccessByLogin($email, $password)
    {
        $user = static::where('email', $email)->first();
        if ($user && $user->checkAuthPassword($password)) {
            return $user;
        }

        return null;
    }

    /**
     * Проверяет пароль
     *
     * @param string $password Пароль
     * @return bool
     */
    public function checkAuthPassword($password)
    {
        return Hash::check($password, $this->password);
    }

    /**
     * Хеширует и обновляет пароль
     *
     * @param string $password Новый пароль
     * @return void
     */
    public function setAuthPassword($password)
    {
        $this->password = Hash::make($password);
    }

    /**
     * Обновляет API токен
     *
     * @return \App\Auth\Authenticatable
     */
    public function updateApiToken()
    {
        $token = null;
        while (true) {
            $token = str_random(32);
            $user = static::where('api_token', $token)->first();
            if (!$user) {
                break;
            }
        }
        $this->api_token = $token;
        return $this;
    }

}