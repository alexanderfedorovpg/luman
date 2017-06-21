<?php

namespace App\Models\Observers;


use App\Models\News;
use Illuminate\Support\Facades\Cache;

class NewsObserver
{

    public function saved(News $news)
    {


//        if ($news['attributes']['is_publish'] == 0 && isset($news['original']['is_publish']) && $news['original']['is_publish'] == 1) {
//
//            HomepageNews::destroy($news['attributes']['id']);
//            HomepageInfoNoise::destroy($news['attributes']['id']);
//            HomepageWar::destroy($news['attributes']['id']);
//            HomepageRecord::destroy($news['attributes']['id']);
//        }
        if (env('CACHE_DRIVER') == 'redis') {
            if ($news['attributes']['is_publish'] == 1) {
                Cache::flush();
            }


        }

    }

}