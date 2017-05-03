<?php

namespace App\Jobs;


use Illuminate\Support\Facades\Artisan;

/**
 * Задание на загрузку новостных фидов
 * Class NewsFeedParserJob
 * @package App\Jobs
 */
class NewsFeedParserJob  extends Job
{
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * @throws \Exception
     */
    public function handle()
    {
        try {

            Artisan::call('parse:upload', [
                'source'=>'tass'
            ]);

        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

}
