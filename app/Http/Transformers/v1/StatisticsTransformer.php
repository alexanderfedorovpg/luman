<?php


namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;
use App\Models\Counters;

class StatisticsTransformer extends Transformer
{
    public function transform($counter)
    {
        $transform = $counter;
        $transform['type']=Counters::$_type_counters[$transform['type']];

        return $transform;
    }


}