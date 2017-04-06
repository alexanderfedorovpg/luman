<?php
/**
 * Author: Arsen
 */

namespace App\Http\Controllers\v1;

use App\Http\Controllers\ApiController;
use App\Http\Transformers\v1\NewsFeedTransformer;
use Illuminate\Http\Request;
use App\NewsFeed;
use App\News;
use Mockery\Exception;


define('DEFAULT_VALUE', '50');

/**
 * Class NewsFeedController
 * @package App\Http\Controllers\v1
 */
class NewsFeedController extends CmsController
{

    /**
     * @var \App\Http\Transformers\v1\NewsFeedTransformer
     */
    protected $newsFeedTransformer;

    /**
     * NewsFeedController constructor.
     * @param \App\Http\Transformers\v1\NewsFeedTransformer $newsFeedTransformer
     */
    public function __construct(NewsFeedTransformer $newsFeedTransformer)
    {
        $this->newsFeedTransformer = $newsFeedTransformer;
    }

    /**
     * Получить выборку новостей с параметрами
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNewsFeed(Request $request)
    {

        $this->validate($request, [
            'viewMode' => 'in:hidden,all',
            'fromDate' => 'date|date_format:Y-m-d H:i:s',
            'toDate' => 'date|date_format:Y-m-d H:i:s',
        ]);

        if (isset($viewMode) && $viewMode !== null) {
            if ($viewMode === 'hidden') {
                $feed = NewsFeed::viewMode(1);
            } elseif ($viewMode === 'all') {
                $feed = NewsFeed::viewMode('all');
            }
        } else {
            $feed = NewsFeed::viewMode(0);
        }

        $searchString = $request->input('searchString');
        if ($searchString) {
            $substrings = explode(',', $searchString);
            $feed->substring($substrings);
        }

        $tagList = $request->input('tagList');
        if ($tagList) {
            $tags = explode(',', $tagList);
            $feed->tags($tags);
        }


        $limit = $request->input('limit');
        if ($limit !== null) {
            $feed->take($limit);
        }


        $fromDate = $request->input('fromDate');
        $toDate = $request->input('toDate');
        $feed->dateFilter($fromDate, $toDate);


        $feed = $feed->paginate(DEFAULT_VALUE);


        return $this->respond(
            $this->newsFeedTransformer->transformCollection($feed->toArray())
        );
    }

    public function add(Request $request)
    {
        try {
            //все данные из реквест переносим
            //в $data, для удобного использования
            $data = $request->except('_token');

            //устанавливаем часовой пояс
            date_default_timezone_set('Europe/Moscow');

            $this->validate($request, [
                'feed_id' => 'required|numeric',
                'editor_id' => 'required|numeric',
                'keywords' => 'required',
                'top' => 'required|numeric',
                'video_stream' => 'url',
                'image_main' => 'mimes:jpeg,png',
                'image_preview' => 'mimes:jpeg,png',
                'is_online' => 'in:0,1',
                'is_war_mode' => 'in:0,1',
            ]);

            if (NewsFeed::find($data['feed_id'])) {

                $feed = NewsFeed::find($data['feed_id']);

                $news = new News;
                $news->title = $feed->header;
                $news->is_publish = '0';
                $news->publish_date = 'null';
                $news->top = $data['top'];
                $news->body = $feed->body;
                $news->tags = $feed->tags;
                $news->keywords = $data['keywords'];
                $news->editor_id = $data['editor_id'];
                //необязательные поля
                if (isset($data['sub_title'])) {
                    $news->sub_title = $data['sub_title'];
                }
                if (isset($data['video_stream'])) {
                    $news->video_stream = $data['video_stream'];
                }
                if (isset($data['image_main'])) {
                    $news->image_main = $data['image-main'];
                }
                if (isset($data['image_preview'])) {
                    $news->image_main = $data['image-preview'];
                }
                if (isset($data['is_online'])) {
                    $news->image_main = $data['is_online'];
                }
                if (isset($data['is_war_mode'])) {
                    $news->image_main = $data['is_war_mode'];
                }

                $news->save();

                if ($news->save()) {
                    $feed->hidden = '1';
                    $feed->save();
                    $this->respond($news);
                    return $this->respond(
                        $this->newsFeedTransformer->transform($feed->toArray())
                    );
                }
                throw new \Exception("Ошибка, новость не создана...");
            }

        } catch (\Exception $e) {
            $this->respondFail500x($e->getMessage());
        }
    }

}