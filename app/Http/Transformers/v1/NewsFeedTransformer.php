<?php

namespace App\Http\Transformers\v1;

use App\User;
use App\Http\Transformers\Transformer;

/**
 * Class NewsFeedTransformer
 * @package App\Http\Transformers\v1
 */
class NewsFeedTransformer extends Transformer
{
    /**
     * @param $feed
     * @return array
     */
    public function transform($feed)
    {
        $transform = $feed;

        return $transform;
    }

}