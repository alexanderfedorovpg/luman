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


            //$arr = parent::get($request);
            //return $arr;

            $user_id = Auth::id();

//            if (empty($user_id)) {
//                $user_id = 2;
//            }

            switch ($assigned) {
                case 'me' :
                    $params = ['editor_id' => $user_id, 'moderation' => 1];
                    break;
                case 'all' :
                    $params = ['editor_id' => 0, 'moderation' => 1];
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

                $item["lostComment"] = $comments[0];
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
        var_dump(2);
        // parent::getOne($id);
    }

}
