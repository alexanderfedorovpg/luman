<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\v1\NewsListController,
    Illuminate\Support\Facades\Auth,
    Illuminate\Http\Request,
    App\Http\Controllers\ApiController,
    App\News,
    App\NewsCommentsEditor,
    App\Http\Traits\NewsListTrait;
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

    /**
     * NewsListController constructor.
     * @param \App\Http\Transformers\v1\NewsListTransformer $newsListTransformer
     */
    public function __construct(\App\Http\Transformers\v1\NewsListTransformer $newsListTransformer)
    {
        parent::__construct();
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

            $user_id = Auth::id();

            switch ($assigned) {
                case 'me' :
                    $params = ['editor_id' => $user_id, 'moderation' => 1];
                    break;
                case 'all' :
                    $params = ['editor_id' => 5, 'moderation' => 1];
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

            $newsList = $this->newsListTransformer->transformCollection($newsList);
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
        $news = News::whereId($id)->published()->first();
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

    public function update(Request $request)
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
                'keywords' => 'required',
                'tags' => 'required',
                'top' => 'required|numeric',
                'original_source_link' => 'url',
                'image_main' => 'mimes:jpeg,png',
                'image_preview' => 'mimes:jpeg,png',
                'is_online' => 'in:0,1',
                'is_war_mode' => 'in:0,1',
            ]);

            $id = $request->input('id');
            $action = $request->input('action');
            $title = $request->input('title');
            $sub_title = $request->input('sub_title');
            $note = $request->input('note');
            $video_stream = $request->input('video_stream');
            $body = $request->input('body');
            $keywords = $request->input('keywords');
            $tags = $request->input('tags');
            $editor_id = $request->input('editor_id');
            $is_publish = $request->input('action');
            $publish_date = $request->input('action');
            $top = $request->input('action');

            if ($request->hasFile('photo')) {
                $image_main = $request->file('image_main');
                $file = $request->photo;
            }

            $image_preview = $request->file('image_preview');




            $feed = News::ModerationMode(1)->findOrFail($id);

            if ($feed && $action == 'work') {

                $news = new News;
                $news->title = $feed->header;
                $news->is_publish = '0';
                $news->publish_date = 'null';
                $news->top = $top;
                $news->body = $body;
                $news->tags = $tags;
                $news->keywords = $keywords;
                $news->editor_id = $editor_id;
                //необязательные поля
                if (isset($sub_title)) {
                    $news->sub_title = $sub_title;
                }
                if (isset($video_stream)) {
                    $news->video_stream = $video_stream;
                }
                if (isset($image_main)) {
                    $news->image_main = $image_main;
                }
                if (isset($image_preview)) {
                    $news->image->preview = $image_preview;
                }
                if (isset($is_online)) {
                    $news->is_online = $is_online;
                }
                if (isset($is_war_mode)) {
                    $news->is_war_mode = $is_war_mode;
                }

                $news->save();

                if ($news->save()) {
                    $feed->hidden = '1';
                    $feed->save();
                    $this->respond($news);
                    return $this->respondCreated(
                        $feed->toArray()
                    );
                }
                throw new \Exception("Ошибка, новость не создана...");
            }

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound(['Исходня запись в ленте новостей не найдена либо скрыта']);
        } catch (\Exception $e) {
            return $this->respondFail500x([$e->getTrace()]);
        }
    }


}
