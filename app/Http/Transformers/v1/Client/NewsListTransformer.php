<?php

namespace App\Http\Transformers\v1\Client;

use App\User;
use App\Http\Transformers\Transformer;

/**
 * Class NewsListTransformer
 * @package App\Http\Transformers\v1\Client
 */
class NewsListTransformer extends Transformer
{
    /**
     * @param $news
     * @return array
     */
    public function transform($news)
    {
         return [
            'Id' => $news['id'],
            'PublishDate' => $news['publish_date'],
            'Top' => $news['top'],
            'Title' => $news['title'],
            'ImagePreview' => $news['image_preview'],

        ];
    }


}