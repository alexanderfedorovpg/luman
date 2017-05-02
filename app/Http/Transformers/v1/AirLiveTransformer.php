<?php

namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;

class AirLiveTransformer extends Transformer
{
    public function transform($live)
    {
        $transform = $live;
        unset($live['created_at'], $live['updated_at']);
        return $live;
    }
}