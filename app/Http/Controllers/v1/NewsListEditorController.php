<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\v1\NewsListController,
    Illuminate\Support\Facades\Auth,
    Illuminate\Http\Request,
    App\Http\Controllers\ApiController,
    App\News,
    App\NewsCommentsEditor,
    App\Http\Traits\NewsListTrait,
    App\Helpers\LogController;
use Illuminate\Database\Eloquent\ModelNotFoundException;


/**
 * Class NewsListController
 * @package App\Http\Controllers\v1\Client
 */
class NewsListEditorController extends CmsController
{

    use NewsListTrait;

    /**
     * @var \App\Http\Transformers\v1\Client\NewsListTransformer
     */
    protected $newsListTransformer;
    protected $log;
    private $user_id;

    /**
     * NewsListController constructor.
     * @param \App\Http\Transformers\v1\NewsListTransformer $newsListTransformer
     */
    public function __construct(\App\Http\Transformers\v1\NewsListTransformer $newsListTransformer)
    {
        parent::__construct();
        $this->user_id = Auth::id();
        $this->log = new LogController();
        $this->newsListTransformer = $newsListTransformer;
    }

    /**
     * Получить список новостей
     * string $assigned = 'me' : 'all'
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request, $assigned = 'me')
    {

        try {

            $this->getArray = true;

            $user_id = $this->user_id;

            switch ($assigned) {
                case 'me' :
                    $params = ['editor_id' => $user_id, 'moderation' => 0, 'delete' => 0, 'is_publish' => 0];
                    break;
                case 'all' :
                    $params = ['editor_id' => 0, 'moderation' => 0, 'delete' => 0, 'is_publish' => 0];
                    break;
                default :
                    $params = false;
            }

            if (!$params) {
                $this->respondFail422x();
            }

            $news = News::ModerationThisEditor($params);

            $this->processing($request, $news);

            $news = $news->get();

            if ($news->isEmpty()) {
                return $this->respondNotFound();
            }

            $news = $news->toArray();


            $newsList = [];

            foreach ($news as $item) {

                $comments = NewsCommentsEditor::PublishedLostComment($item['id']);
                $comments = $comments->get();
                $comments = $comments->toArray();

                if(!empty($comments)) {
                    $item["lostComment"] = $comments[0];
                }

                $newsList[] = $item;
            }

            return $this->respond($newsList);
         } catch (\Exception $e) {
            return $this->respondFail500x($e);
         }

    }

    /**
     * Получить новость по ID
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        $this->getArray = true;
        $news = News::whereId($id)->published(false)->first();
        if (!$news) {
            return $this->respondNotFound();
        }
        $newsArray = $news->toArray();
        $comments = $news->comments()->published()->get();


        $data = $this->newsListTransformer->transformOneNews($newsArray, $comments);


        if($this->getArray){
            return $data;
        } else {
            return $this->respond($data);
        }
    }

    /**
     * Редактировать новость
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request)
    {
        try {

            //устанавливаем часовой пояс
            date_default_timezone_set('Europe/Moscow');

            $this->validate($request, [
                'action' => 'required',
                'title' => 'required|max:120',
                'sub_title' => 'required|max:140',
                'id' => 'required|numeric',
                'editor_id' => 'required|numeric',
                'rubrics_id' => 'required|numeric',
                'keywords' => 'required',
                'tags' => 'required',
                'top' => 'required|numeric',
                'original_source_link' => 'url',
                'image_main' => 'required',
                'image_preview' => 'required',
                'is_online' => 'in:0,1',
                'is_war_mode' => 'in:0,1',
            ]);

            $id = $request->input('id');
            $action = $request->input('action');
            $title = $request->input('title');
            $sub_title = $request->input('sub_title');
            $top = $request->input('top');
            $note = $request->input('note');
            $video_stream = $request->input('video_stream');
            $rubrics_id = $request->input('rubrics_id');
            $body = $request->input('body');
            $keywords = $request->input('keywords');
            $tags = $request->input('tags');
            $editor_id = $request->input('editor_id');
            $image_main = $request->input('image_main');
            $image_preview = $request->input('image_preview');
            $is_online = $request->input('is_online');
            $updated_at = new \DateTime(); // date('Y-m-d H:i:s')
            $is_war_mode = $request->input('is_war_mode');
            $publish_date = $request->input('publish_date');
            $original_source_link = $request->input('original_source_link');
            $moderation = $request->input('moderation');

            $newsEdit = News::ModerationMode()->find(intval($id));

            if($newsEdit == null) {
                return $this->respondWithError("Элемент не найден");
            }

            if ($newsEdit && $action == 'edit') {

                $newsEdit->title = $title;
                $newsEdit->sub_title = $sub_title;
                $newsEdit->note = $note;
                $newsEdit->video_stream = $video_stream;
                $newsEdit->is_publish = '0';
                $newsEdit->publish_date = 'null';
                $newsEdit->top = $top;
                $newsEdit->body = $body;
                $newsEdit->tags = $tags;
                $newsEdit->keywords = $keywords;
                $newsEdit->moderation = 0;
                $newsEdit->rubrics_id = $rubrics_id;

                if($this->user_id != $newsEdit->editor_id) {
                    return $this->respondWithError("Данный пользователь не являеться редактором данной новости");
                }

                //необязательные поля
                if (isset($sub_title)) {
                    $newsEdit->sub_title = $sub_title;
                }
                if (isset($video_stream)) {
                    $newsEdit->video_stream = $video_stream;
                }
                if (isset($image_main)) {
                    $newsEdit->image_main = $image_main;
                }
                if (isset($image_preview)) {
                    $newsEdit->image_preview = $image_preview;
                }
                if (isset($is_online)) {
                    $newsEdit->is_online = $is_online;
                }
                if (isset($is_war_mode)) {
                    $newsEdit->is_war_mode = $is_war_mode;
                }

                if ($newsEdit->save()) {
                    $this->respond($newsEdit);
                    $this->log->setLog('MODERATION_NEWS', $this->user_id, "Successful");
                    return $this->respond(
                        $newsEdit->toArray()
                    );
                }
                $this->log->setLog('MODERATION_NEWS', $this->user_id, "Save error");
                throw new \Exception("Ошибка, новость не отредактирована");
            }

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound(['Исходная запись в ленте новостей не найдена либо скрыта']);
        } catch (\Exception $e) {
            $this->log->setLog('MODERATION_NEWS', $this->user_id, "Error 500");
            return $this->respondFail500x([$e->getTrace()]);
        }
    }

    /*
     * Удалить новость
     */
    public function delete($id)
    {
        try {

            $news = News::find($id);

            if($this->user_id != $news->editor_id) {
                return $this->respondWithError("Данный пользователь не являеться редактором данной новости");
            }

            $news->delete = 1;
            $news->moderation = 0;

            if ($news->save()) {
                $this->log->setLog('DELETE_NEWS', $this->user_id, "Successful, news id=".$id." delete");
                return $this->respondCreated(
                    ["data" => "delete"]
                );
            }
            $this->log->setLog('DELETE_NEWS', $this->user_id, "Error, news id=".$id." don't delete");
            throw new \Exception('Error, news don\'t delete');
        } catch (\Exception $e) {
            $this->log->setLog('DELETE_NEWS', $this->user_id, "Error 500 news id=".$id);
            return $this->respondFail500x($e->getMessage());
        }
    }

    /*
     * Делегировать новость
     */
    public function delegate(Request $request)
    {
        try {

            $this->validate($request, [
                'id' => 'required|numeric',
                'new_editor_id' => 'required|numeric',
            ]);

            $id = $request->input('id');
            $new_editor_id = $request->input('new_editor_id');

            $news = News::find($id);

            if($this->user_id != $news->editor_id) {
                return $this->respondWithError("Данный пользователь не являеться редактором данной новости");
            }

            $news->editor_id = $new_editor_id;
            $news->moderation = 0;

            if ($news->save()) {
                $this->log->setLog('DELEGATE', $this->user_id, "Successful, news id=".$id." delegate [".$this->user_id.">".$new_editor_id."]");
                return $this->respondCreated(
                    ["data" => "delegate"]
                );
            }
            $this->log->setLog('DELEGATE', $this->user_id, "Error, news id=".$id." don't delegate  [".$this->user_id.">".$new_editor_id."]");
            throw new \Exception('Error, news don\'t delegate');
        } catch (\Exception $e) {
            $this->log->setLog('DELEGATE', $this->user_id, "Error 500 news id=".$id);
            return $this->respondFail500x($e->getMessage());
        }
    }

    /* REJECTION
     * Отказаться от редактирования новости
     */
    public function rejection(Request $request)
    {
        try {

            $this->validate($request, [
                'id' => 'required|numeric',
            ]);

            $id = $request->input('id');

            $news = News::find($id);

            if($this->user_id != $news->editor_id) {
                return $this->respondWithError("Данный пользователь не являеться редактором данной новости");
            }

            $news->editor_id = 'NULL';
            $news->moderation = 0;

            if ($news->save()) {
                $this->log->setLog('REJECTION', $this->user_id, "Successful, news id=".$id." rejection ".$this->user_id);
                return $this->respondCreated(
                    ["data" => "rejection"]
                );
            }

            $this->log->setLog('REJECTION', $this->user_id, "Error, news id=".$id." don't rejection  ".$this->user_id);
            throw new \Exception('Error, news don\'t rejection');
        } catch (\Exception $e) {
            $this->log->setLog('REJECTION', $this->user_id, "Error 500 news id=".$id);
            return $this->respondFail500x($e->getMessage());
        }
    }

    /* IN_WORK
     * Начать редактирование новости
     */
    public function in_work(Request $request)
    {
        try {

            $this->validate($request, [
                'id' => 'required|numeric',
            ]);

            $id = $request->input('id');

            $news = News::find($id);

            if($this->user_id != $news->editor_id) {
                return $this->respondWithError("Данный пользователь не являеться редактором данной новости");
            }

            $news->time_edit = date('Y-m-d H:i:s');
            $news->moderation = 1;

            if ($news->save()) {
                $this->log->setLog('IN_WORK', $this->user_id, "Successful, news id=".$id." in work user_id=".$this->user_id);
                return $this->respondCreated(
                    ["data" => "in_work"]
                );
            }

            $this->log->setLog('IN_WORK', $this->user_id, "Error, news id=".$id." don't in work user_id=".$this->user_id);
            throw new \Exception('Error, news don\'t rejection');
        } catch (\Exception $e) {
            $this->log->setLog('IN_WORK', $this->user_id, "Error 500 news id=".$id);
            return $this->respondFail500x($e->getMessage());
        }
    }

}
