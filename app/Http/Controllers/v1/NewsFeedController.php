<?php
/**
 * Author: Arsen
 */

namespace App\Http\Controllers\v1;


use App\Http\Transformers\v1\NewsFeedTransformer;
use App\Http\Transformers\v1\NewsListTransformer;
use App\Jobs\NewsFeedParserJob;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Models\NewsFeed;
use App\Models\News;



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
        try {
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

            $searchIA = $request->input('ia');
            if ($searchIA) {
                $feed->InformAgency($searchIA);
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

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound($e->getMessage());
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }
    }

    public function update(Request $request)
    {

        try {

            $this->validate($request, [
                'action' => 'in:hide',
                'id' => 'required|numeric',
            ]);

            $action = $request->input('action');
            $id = $request->input('id');

            $feed = NewsFeed::find($id);

            if ($action == "hide") {
                $feed->hidden = 1;

            }

            if ($feed->save()) {

                return $this->respondCreated(
                    ["data" => "hidden"]
                );
            }

            throw new \Exception('Ошибка, новость не скрыта');
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }
    }

    public function create(Request $request)
    {
        try {
            //все данные из реквест переносим
            //в $data, для удобного использования
            $data = $request->except('_token');

            //устанавливаем часовой пояс
            date_default_timezone_set('Europe/Moscow');

            if ($request->get('rubrics')) {
                foreach ($request->get('rubrics') as $key => $val) {
                    $rules['rubrics.' . $key] = 'required|exists:rubrics,id';
                }
            }

            $rules['action']= 'required';
            $rules['id']= 'exists:news_feed,id';
            $rules['editor_id']= 'numeric|exists:users,id';
            $rules['keywords']= 'required';
            $rules['header']= 'required';
            $rules['body']= 'required';
            $rules['top']='required|numeric';
            $rules['is_online']= 'in:0,1';
            $rules['is_war_mode']= 'in:0,1';

            $this->validate($request,
                $rules
            );

            if (isset($data['id'])){
                $feed = NewsFeed::ViewMode(0)->find($data['id']);
            }


            if ($data['action'] == 'work') {

                $news = new News;
                $news->title = $data['header'];
                $news->is_publish = '0';
                $news->publish_date = 'null';
                $news->top = $data['top'];
                $news->body = $data['body'];
                $news->keywords = $data['keywords'];
                $news->editor_id = $data['editor_id'];

                //необязательные поля

                if (isset($data['rubrics'])) {
                    $rubrics = $data['rubrics'];
                }
                if (isset($data['theses'])) {
                    $news->theses = $data['theses'];
                }
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
                    $news->image->preview = $data['image-preview'];
                }
                if (isset($data['is_online'])) {
                    $news->is_online = $data['is_online'];
                }
                if (isset($data['is_war_mode'])) {
                    $news->is_war_mode = $data['is_war_mode'];
                }

                $news->save();

                if ($news->save()) {
                    if (isset($rubrics) && is_array($rubrics)) {
                        $news->rubrics()->attach($rubrics);
                    }

                    if ($feed ) {
                        $feed->hidden = '1';
                        $feed->save();
                    }

                    $this->respond($news);
                    $newsListTransformer=new NewsListTransformer;
                    return $this->respondCreated(
                        $newsListTransformer->transform($news)
                    );
                }
                throw new \Exception("Ошибка, новость не создана...");
            }

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound(['Исходня запись в ленте новостей не найдена либо скрыта']);
        } catch (\Exception $e) {
            return $this->respondFail500x([$e->getTrace(), $e->getMessage()]);
        }
    }

    public function reload()
    {
        $job = (new NewsFeedParserJob())->onQueue('parser');
        dispatch($job);
        return $this->respondAccepted(['Задание на обновление информации из новостных источников принято!']);
    }
}