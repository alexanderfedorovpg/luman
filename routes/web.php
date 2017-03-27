<?php
 use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->group(['prefix' => 'client/api/v1', 'namespace'=>'\App\Http\Controllers\v1\Client'], function ($group)    {
    $group->get('/newslist','NewsListController@get');
});

$app->group(['prefix' => 'cms/api/v1'], function ($group)   {
    return $group->version();
});
