<?php
namespace App\Http\Traits;

use App\Models\News;

trait NewsListTrait {

    public function processing(&$request, &$news) {
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
    }
}