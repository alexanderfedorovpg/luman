<?php

namespace App\Providers;

use App\Helpers\LogController;
use Illuminate\Support\ServiceProvider;


class LogServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
	    $this->app->bind('App\Helpers\LogHelpers', function(){
		    return new LogController();
	    });
    }
}
