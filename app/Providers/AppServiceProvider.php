<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Models\News;
use App\Models\NewsComments;
use App\Models\HomepageInfoNoise;
use App\Models\HomepageNews;
use App\Models\HomepageOption;
use App\Models\HomepageRecord;
use App\Models\HomepageWar;
use App\Models\AirRecord;

use App\Models\Observers\NewsObserver;
use App\Models\Observers\CacheClearObserver;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        News::observe(NewsObserver::class);
       	NewsComments::observe(CacheClearObserver::class); 	

        HomepageInfoNoise::observe(CacheClearObserver::class);
        HomepageNews::observe(CacheClearObserver::class);
        HomepageOption::observe(CacheClearObserver::class);
        HomepageRecord::observe(CacheClearObserver::class);
        HomepageWar::observe(CacheClearObserver::class);
        AirRecord::observe(CacheClearObserver::class);
    }
}
