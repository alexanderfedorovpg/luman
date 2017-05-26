<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\ApiController;
use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Traits\NewsListTrait;

/**
 * Class NewsListController
 * @package App\Http\Controllers\v1\Client
 */
class NewsListController extends CmsController
{
    use NewsListTrait;
    /**
     * @var \App\Http\Transformers\v1\Client\NewsListTransformer
     */
    protected $newsListTransformer;
    protected $getArray = false;

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
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request)
    {

        $news = News::published()->NotInHomePage();

        $this->processing($request, $news);

        $news = $news->get();

        $data = $this->newsListTransformer->transformCollection($news->toArray());

        if($this->getArray){
            return $data;
        } else {
            return $this->respond($data);
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

    /**
     * Получить список связонных новостей
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRelated($id)
    {
        $news = News::whereId($id)->published()->first();
        $newsRelated = [];
        if ($news) {
            $newsRelated = $news->newsRelated()->get()->toArray();
        }
        return $this->respond(
            $this->newsListTransformer->transformCollection($newsRelated)
        );
    }

	/**
	 * @param $news_id
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function checkNews( $news_id ) {
		try {
			News::findorfail( $news_id )->first();

			return $this->respond( array( 'check' => true ) );
		} catch ( \Exception $e ) {
			return $this->respond( array( 'check' => false ) );
		}

	}
}
