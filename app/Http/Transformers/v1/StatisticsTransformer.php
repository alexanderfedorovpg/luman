<?php


namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;
use App\Models\Counters;

class StatisticsTransformer extends Transformer
{
    public function transform($counters)
    {
        $transform = [];
        foreach ($counters as $counter) {
            $counter['type'] = Counters::$_type_counters[$counter['type']];
            $transform[] = $counter;
        }

        return $transform;
    }


}