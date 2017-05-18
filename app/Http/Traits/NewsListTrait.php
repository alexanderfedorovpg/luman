<?php
namespace App\Http\Traits;

use App\Models\News;

trait NewsListTrait {

    public function processing(&$request, &$news) {
        $this->validate($request, [
            'orderBy' => 'in:id,top,publish_date',
            'orderType' => 'in:asc,desc'
        ]);

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

        $infoNoise = $request->input('infoNoise');
        if ($infoNoise === 'true') {
            $news->infoNoise(true);
        } elseif ($infoNoise === 'false') {
            $news->infoNoise(false);
        }

        $constructor = $request->input('constructor');
        if ($constructor === 'true') {
            $news->constructor(1);
        } elseif ($constructor === 'false') {
            $news->constructor(0);
        }

        $isPublish = $request->input('is_publish');
        if ($isPublish === 'true') {
            $news->is_publish(1);
        } elseif ($isPublish === 'false') {
            $news->is_publish(0);
        }

        $video = $request->input('video');
        if ($video !== null) {
            if ($video === 'true') {
                $news->existVideo(true);
            } elseif ($video === 'false') {
                $news->existVideo(false);
            }
        }

        $orderBy = $request->input('orderBy');
        if ($orderBy !== null) {
            $orderType = $request->input('orderType') ? $request->input('orderType') : 'ASC';
            $news->orderBy($orderBy , $orderType);
            if ($orderBy !== 'publish_date'){
                $news->orderBy('publish_date' , 'ASC');
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
    }
}