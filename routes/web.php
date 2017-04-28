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
                'Access-Control-Allow-Headers'=> ['Content-Type, Api-Token'],
                'Access-Control-Request-Method' => ['POST, GET, PUT, OPTIONS, DELETE'],
                'Access-Control-Allow-Methods' => ['POST, GET, OPTIONS, PUT, DELETE'],

            ];
        return response()->json([] ,200 , $headers);
    });
    $group->get('/newsfeed', 'NewsFeedController@getNewsFeed');
    $group->get('/newsfeed/reload', 'NewsFeedController@reload');
    $group->post('/newsfeed', 'NewsFeedController@update');
    $group->post('/newsfeed/work', 'NewsFeedController@create');
    $group->get('/newslist','NewsListController@get');
    $group->get('/news/{id}','NewsListController@getOne');
    $group->get('/news/{id}/related','NewsListController@getRelated');
    $group->get('/news/check/{id}','NewsListController@checkNews');

    $group->post('/auth/login','AuthController@login');

    //Редакторы новостей
    $group->get('/newseditor/moderated','NewsListEditorController@getModerated');
    $group->get('/newslisteditor[/{assigned}]','NewsListEditorController@get');
    $group->get('/newseditor/{id}','NewsListEditorController@getOne');
    $group->post('/newseditor','NewsListEditorController@create');

    $group->put('/newseditor/edit','NewsListEditorController@edit');
    $group->put('/newseditor/publish/{id}','NewsListEditorController@publish');

    $group->delete('/newseditor/{id}','NewsListEditorController@delete');
    $group->post('/newseditor/delegate','NewsListEditorController@delegate');
    $group->post('/newseditor/rejection','NewsListEditorController@rejection');
    $group->post('/newseditor/work','NewsListEditorController@in_work');
    $group->post('/newseditor/tofix','NewsListEditorController@toFix');

    //Пользователи
    $group->get('/user','UserController@index');
    $group->get('/userprofile','UserController@profile');
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
    $group->get('/group/{id}/users','GroupController@UsersByGroup');


    // Уведомления
	$group->get('/notification/{id}','NotificationController@sendMessage');
	$group->post('/notification/','NotificationController@addDevice');
	$group->delete('/notification/{guid}','NotificationController@removeDevice');
	$group->post('/notification/one','NotificationController@sendOneMessage');
	$group->post('/notification/to','NotificationController@sendMessageTo');

    //Права
    $group->get('/permission','PermissionController@index');

    //Чат новостей
    $group->get('/newschat/{newsId}','NewsChatController@index');
    $group->post('/newschat/{newsId}','NewsChatController@create');

    //Рубрики
    $group->get('/rubrics','RubricsController@index');
    $group->get('/rubrics/{id}','RubricsController@show');
    $group->post('/rubrics','RubricsController@create');
    $group->put('/rubrics/{id}','RubricsController@update');
    $group->delete('/rubrics/{id}','RubricsController@destroy');

    //Справка
    $group->get('/reference/search','ReferenceController@search');
    $group->get('/reference/page','ReferenceController@getPage');

    //Файлы
    $group->post('/file','FileController@upload');
    $group->delete('/file/{id}','FileController@destroy');

    //Статистика
	$group->get('/newsstatistics','NewsStatisticsController@getTimeAllEditors');
	$group->get('/newsstatistics/editor','NewsStatisticsController@getTimeEditor');
	$group->get('/newsstatistics/counters/','NewsStatisticsController@getCountersAll');
	$group->get('/newsstatistics/editor/dynamics/','NewsStatisticsController@getTimeDynamicsEditor');
	$group->get('/newsstatistics/editor/counters/','NewsStatisticsController@getCountersEditor');
	$group->get('/newsstatistics/editor/extended/','NewsStatisticsController@getTimeAllEditorsExtended');
    $group->get('/newsstatistics/editor/top/','NewsStatisticsController@getTopAuthors');

    $group->get('/statistics','StatisticsController@getCountersAll');

    //Телепередачи
    $group->get('/tv-program','TvProgramController@index');
    $group->get('/tv-program/{id}','TvProgramController@show');
    $group->post('/tv-program','TvProgramController@create');
    $group->put('/tv-program/{id}','TvProgramController@update');
    $group->delete('/tv-program/{id}','TvProgramController@destroy');

    //Записи эфиров
    $group->get('/air/record','AirRecordController@index');
    $group->get('/air/record/{id}','AirRecordController@show');
    $group->post('/air/record','AirRecordController@create');
    $group->put('/air/record/{id}','AirRecordController@update');
    $group->delete('/air/record/{id}','AirRecordController@destroy');

    //Конструктор главной страницы
    $group->get('/homepage','HomepageController@index');
    $group->put('/homepage','HomepageController@update');
    $group->get('/homepage/newscategory','HomepageController@getNewsCategories');

    //Текстовый онлайн
	//$group->get('/news/online/','NewsListOnlineController@getListOnline');
	$group->get('/news/online/setstatus/{id}','NewsListOnlineController@updateStatusNewsOnline');
	$group->get('/news/online/comments/{id}','NewsListOnlineController@getListCommentsNewsOnline');
	$group->post('/news/online/comments','NewsListOnlineController@addCommentNewsOnline');
	$group->put('/news/online/comments','NewsListOnlineController@addCommentNewsOnline');
	$group->delete('/news/online/comments/{id}','NewsListOnlineController@deleteCommentNewsOnline');

});



$app->get('/{any:.*}',function (){
    return response()->json('404 Not found!' , 404);
});
