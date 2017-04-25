<?php

namespace App\Jobs;

use App\Helpers\ITARTASSParser;
use App\Helpers\ParserHelpers;

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

            $parserTASS=new ITARTASSParser();
            $parserTASS->parse();
            unset($parserTASS);

        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

}
