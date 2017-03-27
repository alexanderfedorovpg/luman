<?php

namespace App\Http\Controllers\v1\Client;

use App\Http\Controllers\ApiController;
use App\News;

/**
 * Class NewsListController
 * @package App\Http\Controllers\v1\Client
 */
class NewsListController extends ApiController
{
    /**
     * @var \App\Http\Transformers\v1\Client\NewsListTransformer
     */
    protected $newsListTransformer;

    /**
     * NewsListController constructor.
     * @param \App\Http\Transformers\v1\Client\NewsListTransformer $newsListTransformer
     */
    public function __construct(\App\Http\Transformers\v1\Client\NewsListTransformer $newsListTransformer)
    {
        $this->newsListTransformer = $newsListTransformer;
    }

    /**
     * Получить список новостей
     * @return \Illuminate\Http\JsonResponse
     */
    public function get()
    {

        /**
         * пример на будующее
         */
//        if (\Auth::user()->cannot('show_public_news')) {
//            return $this->respondFail403x();
//        };

        $news =  News::get();
        return $this->respond(['data' => $this->newsListTransformer->transformCollection($news->toArray())]);

        $this->respond();
    }


}
