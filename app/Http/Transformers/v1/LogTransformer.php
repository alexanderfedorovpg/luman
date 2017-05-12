<?php

namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;

class LogTransformer extends Transformer
{
    public function transform($log)
    {
        $transform = $log;
        list($date, $time) = explode(' ', $log['updated_at']);
        $transform['date'] = $date;
        $transform['time'] = $time;

        unset($transform['created_at'], $transform['updated_at']);
        return $transform;
    }
}   