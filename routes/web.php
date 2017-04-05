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

$app->group(['prefix' => 'api/v1', 'namespace'=>'\App\Http\Controllers\v1'], function ($group)   {
    $group->options('/{any:.*}',function (){
        $headers=
            [
                'Access-Control-Allow-Origin'=>'*',
                'Access-Control-Allow-Headers'=> 'Api-Token',
                'Access-Control-Request-Method' => ['POST, GET, PUT, OPTIONS, DELETE'],
            ];
        return response()->json([] ,200 , $headers);
    });
    $group->get('/newsfeed/', 'NewsFeedController@getNewsFeed');
    $group->post('/newsfeed/work', 'NewsFeedController@add');
    $group->get('/newslist','NewsListController@get');
    $group->get('/news/{id}','NewsListController@getOne');
    $group->get('/news/{id}/related','NewsListController@getRelated');
    $group->post('/auth/login','AuthController@login');

    //Пользователи
    $group->get('/user','UserController@index');
    $group->get('/user/{id}','UserController@show');
    $group->post('/user','UserController@create');
    $group->put('/user/{id}','UserController@update');
    $group->delete('/user/{id}','UserController@destroy');

    //Группы
    $group->get('/group','GroupController@index');
    $group->get('/group/{id}','GroupController@show');
    $group->post('/group','GroupController@create');
    $group->put('/group/{id}','GroupController@update');
    $group->delete('/group/{id}','GroupController@destroy');
    $group->post('/group/{groupId}/bind/{userId}','GroupController@bindUser');
    $group->delete('/group/{groupId}/bind/{userId}','GroupController@unbindUser');
    $group->post('/group/{groupId}/permiss','GroupController@addPermiss');
    $group->delete('/group/{groupId}/permiss/{permissId}','GroupController@addPermiss');


    //Права
    $group->get('/permission','PermissionController@index');

});


