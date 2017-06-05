<?php

namespace App\Models\Observers;

use App\Models\News;
use Illuminate\Support\Facades\Cache;

class NewsObserver
{
   
   public function saved(News $news)
    {

        if (env('CACHE_DRIVER')=='redis') {
            if (  $news['attributes']['is_publish']==1 ) {
             Cache::flush(); 
         }
           
        }
       
    }
 
}