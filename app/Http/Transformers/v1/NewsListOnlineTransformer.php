<?php

namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;
use App\Models\CdnFile;

class NewsListOnlineTransformer extends Transformer
{
    private $newsListTransformer;

    public function __construct()
    {
        $this->newsListTransformer = new NewsListTransformer();
    }

    public function transform($news)
    {
        $transform = $this->newsListTransformer->transform($news);
        return $transform;
    }

    public function transformComment($comment)
    {
        $transform = $comment;

        if ($comment['image_preview']) {
            $preview = CdnFile::where('id', '=', $comment['image_preview'])->pluck('url')->first();
            $transform['image_preview'] = [
                'id' => $comment['image_preview'],
                'url' => $preview
            ];
        }

        if ($comment['cover_id']) {
            $cover = CdnFile::where('id', '=', $comment['cover_id'])->pluck('url')->first();
            $transform['cover_id'] = $cover;
        }


        if ($comment['video_stream_preview']) {
            $preview = CdnFile::where('id', '=', $comment['video_stream_preview'])->pluck('url')->first();
            $transform['video_stream_preview'] = [
                'id' => $comment['video_stream_preview'],
                'url' => $preview
            ];
        }
        return $transform;
    }

    public function transformCollectionComments(array $items)
    {
        return array_map([$this, 'transformComment'], $items);
    }
}