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

    //Текстовый онлайн
    $group->get('/news/onlines/','NewsListOnlineController@getListOnline');
    $group->get('/news/online/setstatus/{id}','NewsListOnlineController@updateStatusNewsOnline');
    $group->get('/news/online/comments/{id}','NewsListOnlineController@getListCommentsNewsOnline');
    $group->post('/news/online/comments','NewsListOnlineController@addCommentNewsOnline');
    $group->put('/news/online/comments','NewsListOnlineController@updateCommentNewsOnline');
    $group->delete('/news/online/comments/{id}','NewsListOnlineController@deleteCommentNewsOnline');
    $group->get('/news/{id}','NewsListController@getOne');
    $group->get('/news/{id}/related','NewsListController@getRelated');
    $group->get('/news/check/{id}','NewsListController@checkNews');


    $group->get('/news/{id}/related','NewsListController@getRelated');
    $group->get('/news/check/{id}','NewsListController@checkNews');
    $group->get('/news/{id}','NewsListController@getOne');

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
    $group->put('/newseditor/cover','NewsListEditorController@updateCover');
    $group->put('/newseditor/trigger_vc','NewsListEditorController@triggerVisibleConstructor');
    $group->put('/newseditor/title','NewsListEditorController@updateTitle');

    //Пользователи
    $group->get('/user','UserController@index');
    $group->get('/userprofile','UserController@profile');
    $group->get('/user/{id:[0-9]+}','UserController@show');
    $group->post('/user','UserController@create');
    $group->put('/user/{id}','UserController@update');
    $group->delete('/user/{id}','UserController@destroy');
    $group->put('/userprofile','UserController@editProfile');
    $group->get('/user/{id}/statistic','UserController@getStatistic');
    $group->get('/user/statistic','UserController@getStatisticCurrentUser');

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
    $group->get('/group/{id}/permiss','GroupController@PermissByGroup');


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
    $group->get('/file/{id}','FileController@get');
    $group->get('/file','FileController@all');
    $group->delete('/file/{id}','FileController@destroy');

    //Статистика
	$group->get('/newsstatistics','NewsStatisticsController@getTimeAllEditors');
	$group->get('/newsstatistics/editor','NewsStatisticsController@getTimeEditor');
	$group->get('/newsstatistics/counters/','NewsStatisticsController@getCountersAll');
	$group->get('/newsstatistics/dynamics/','NewsStatisticsController@getTimeDynamics');
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
    $group->put('/air/record/{id:[0-9]+}','AirRecordController@update');
    $group->delete('/air/record/{id}','AirRecordController@destroy');
    $group->put('/air/record/publish','AirRecordController@publish');
    $group->post('/air/record/upload','AirRecordController@upload');
    $group->put('/air/record/trigger_vc','AirRecordController@triggerVisibleConstructor');

    //Конструктор главной страницы
    $group->get('/homepage','HomepageController@index');
    $group->put('/homepage','HomepageController@update');
    $group->get('/homepage/newscategory','HomepageController@getNewsCategories');

    //Уведомление редактору (сообщение)
	$group->post('/editor/notification','MessagingController@sentMessage');
	$group->get('/editor/notification','MessagingController@checkMessage');
	$group->put('/editor/notification/{id}','MessagingController@switchStatusMessage');

    //Прямой эфир
    $group->get('/air/live','AirLiveController@index');
    $group->post('/air/live','AirLiveController@onAir');
    $group->delete('/air/live','AirLiveController@disableAir');

    //Логи
    $group->get('/logs','LogController@getAll');
    $group->get('/logs/user','LogController@getCurrentUser');
});



$app->get('/{any:.*}',function (){
    return response()->json('404 Not found!' , 404);
});
