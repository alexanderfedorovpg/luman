<?php

namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;

class AirRecordTransformer extends Transformer
{
    public function transform($record)
    {
        $transform = $record;

        return $transform;
    }
}