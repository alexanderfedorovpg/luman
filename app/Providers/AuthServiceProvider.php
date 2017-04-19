<?php

namespace App\Providers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use App\Auth\Rbac;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        App::bind('Rbac', function () {
            return new Rbac();
        });
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.
        $this->app['auth']->viaRequest('api', function ($request) {

            //Авторизация по токену в заголовке
            $headerApiToken = $request->header('Api-Token');
            if ($headerApiToken) {
                return User::where('api_token', $headerApiToken)->first();
            }

        });
    }
}
