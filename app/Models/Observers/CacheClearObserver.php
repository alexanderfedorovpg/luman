<?php

namespace App\Models\Observers;

 
use Illuminate\Support\Facades\Cache;

class CacheClearObserver
{
   
   public function clearCache()
    {

        if (env('CACHE_DRIVER')=='redis') {           
             Cache::flush(); 
         }
           
      
       
    }
 
}