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
    $group->get('/newsfeed/', 'NewsFeedController@getNewsFeed');
    $group->post('/newsfeed/work', 'NewsFeedController@add');
    $group->get('/newslist','NewsListController@get');
    $group->get('/news/{id}','NewsListController@getOne');
    $group->get('/news/{id}/related','NewsListController@getRelated');
    $group->post('/auth/login','AuthController@login');
    $group->post('/user/create', 'UserController@create');
});


