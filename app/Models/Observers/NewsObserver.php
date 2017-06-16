<?php

namespace App\Models\Observers;

use App\Models\HomepageInfoNoise;
use App\Models\HomepageNews;
use App\Models\HomepageRecord;
use App\Models\HomepageWar;
use App\Models\News;
use Illuminate\Support\Facades\Cache;

class NewsObserver
{

    public function saved(News $news)
    {

        if ($news['attributes']['is_publish'] == 0 && $news['original']['is_publish'] == 1) {

            HomepageNews::destroy($news['attributes']['id']);
            HomepageInfoNoise::destroy($news['attributes']['id']);
            HomepageWar::destroy($news['attributes']['id']);
            HomepageRecord::destroy($news['attributes']['id']);
        }
        if (env('CACHE_DRIVER') == 'redis') {
            if ($news['attributes']['is_publish'] == 1) {
                Cache::flush();
            }


        }

    }

}