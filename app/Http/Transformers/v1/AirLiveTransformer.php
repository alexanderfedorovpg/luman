<?php

namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;

class AirLiveTransformer extends Transformer
{
    public function transform($live)
    {
        $transform = $live;
        unset($transform['created_at'], $transform['updated_at'], $transform['enabled_live']);
        return $transform;
    }
}