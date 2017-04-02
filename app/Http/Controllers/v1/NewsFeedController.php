<?php
/**
 * Author: Arsen
 */

namespace App\Http\Controllers\v1;

use App\Http\Controllers\ApiController;
use App\Http\Transformers\v1\NewsFeedTransformer;
use App\Http\Transformers\v1\NewsListTransformer;
use Illuminate\Http\Request;
use App\NewsFeed;
use Illuminate\Validation\Validator;

define('DEFAULT_VALUE', '50');

/**
 * Class NewsFeedController
 * @package App\Http\Controllers\v1
 */
class NewsFeedController extends ApiController
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
            'fromDate'=>'date|date_format:Y-m-d H:i:s',
            'toDate'=>'date|date_format:Y-m-d H:i:s',
        ]);

        if (isset($viewMode) && $viewMode!==null) {
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
        $feed->dateFilter($fromDate,$toDate);


        $feed = $feed->paginate(DEFAULT_VALUE);


        return $this->respond(
            $this->newsFeedTransformer->transformCollection( $feed->toArray() )
        );
    }


}