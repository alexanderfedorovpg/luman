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
     * @param string $login Логин пользователя
     * @param string $password Пароль польщователя
     */
    public static function checkAccessByLogin($login, $password)
    {
        $user = static::where('login', $login)->first();
        if ($user && !$user->is_deleted ) {
            if ($user->checkAuthPassword($password)) {
                return $user;
            }
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
        $isCorrect = Hash::check($password, $this->password);
        if (!$isCorrect) {
            $this->password_err_count += 1;
            if ($this->isPasswordLimitError()) {
                $this->enabled = false;
            }
        } else {
            $this->password_err_count = 0;
        }
        $this->save();

        return $isCorrect;
    }

    public function isPasswordLimitError()
    {
        if ($this->password_err_count > 2) {
            return true;
        }
        return false;
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

    /**
     * Проверяет блокировку пользователя
     *
     * @return bool
     */
    public function isEnabled()
    {
        return (bool)$this->enabled;
    }



}