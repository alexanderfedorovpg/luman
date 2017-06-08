<?php
namespace App\Http\Traits;

use App\Models\News;

trait NewsListTrait {

    public function processing(&$request, &$news) {
        $this->validate($request, [
            'orderBy' => 'in:id,top,publish_date',
            'orderType' => 'in:asc,ASC,desc,DESC'
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
            $news->constructor(1)->NotInHomePage();
        } elseif ($constructor === 'false') {
            $news->constructor(0);
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


        $programId = $request->input('programId');
        if ($programId) {
            $news->where('program_id', '=', $programId);
        }

        if ($request->input('fullVideo') === 'true') {
            $news->fullVideo();
        } elseif ($request->input('fullVideo') === 'false') {
            $news->fullVideo(false);
        }

    }
}