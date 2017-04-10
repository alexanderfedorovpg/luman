<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\ApiController;
use App\News;
use Illuminate\Http\Request;

/**
 * Class NewsListController
 * @package App\Http\Controllers\v1\Client
 */
class NewsListController extends CmsController
{
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
        $this->newsListTransformer = $newsListTransformer;
    }

    /**
     * Получить список новостей
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request)
    {

        $news = News::published();
        $searchString = $request->input('searchString');
        if ($searchString) {
            $substrings = explode(',', $searchString);
            $news->substring($substrings);
        }

        $tagList = $request->input('tagList');
        if ($tagList) {
            $tags = explode(',', $tagList);
            $news->tags($tags);
        }

        $video = $request->input('video');
        if ($video !== null) {
            if ($video === 'true') {
                $news->existVideo(true);
            } elseif ($video === 'false') {
                $news->existVideo(false);
            }
        }

        $start = $request->input('start');
        if ($start !== null) {
            $news->skip($start);
        }

        $limit = $request->input('limit');
        if ($limit !== null) {
            $news->take($limit);
        }

        if ($limit === null && $start !== null) {
            $limit = News::count() - $start;
            $news->take($limit);
        }

        $news = $news->get();

        return $this->respond(
            $this->newsListTransformer->transformCollection($news->toArray())
        );
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
        return $this->respond(
            $this->newsListTransformer->transformOneNews($newsArray, $comments)
        );
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
}
