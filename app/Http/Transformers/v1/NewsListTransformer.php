<?php

namespace App\Http\Transformers\v1;

use App\User;
use App\Http\Transformers\Transformer;

/**
 * Class NewsListTransformer
 * @package App\Http\Transformers\v1
 */
class NewsListTransformer extends Transformer
{
    /**
     * @param $news
     * @return array
     */
    public function transform($news)
    {
        $transform = [
            'Id' => $news['id']
        ];

        if ($news['publish_date']) {
            $transform['PublishDate'] = implode('T', explode(' ', $news['publish_date']));
        } else {
            $transform['PublishDate'] = '';
        }

        $transform['Top'] = $news['top'];
        $transform['Title'] = $news['title'];
        $transform['Subtitle'] = $news['sub_title'];
        $transform['Tags'] =  explode(',', $news['tags']);
        $transform['ImagePreview'] = $news['image_preview'];

        if ($news['video_stream']) {
            $transform['VideoStream'] = $news['video_stream'];
        }

        $hh = 0;
        $mm = 0;
        $ss = 0;

        if ($news['time_edit'] && $news['moderation']) {
            $time_edit = implode('T', explode(' ', $news['time_edit']));
            $diff = strtotime($time_edit) - time(); // разница в секундах
            list($hh, $mm, $ss) = explode(':', gmdate('H:i:s', $diff));

            $transform['time_edit'] = ['hh' => $hh, 'mm' => $mm];
        }

        if(is_string($news['original_source_link'])) {
            $transform['OriginalLink'] = $news['original_source_link'];
        } else {
            $transform['OriginalLink'] = false;
        }


        return $transform;
    }


    /**
     * @params array $rows
     * @param \Illuminate\Database\Eloquent\Collection
     * @return array
     */
    public function transformOneNews($news, $comments)
    {
        $transform = $this->transform($news);
        $transform['Note'] = $news['note'];
        $transform['Body'] = $news['body'];
        $transform['ImageMain'] = $news['image_main'];
        $transform['Comments'] = $this->transformComments($comments);

        return $transform;
    }

    /**
     * @param \Illuminate\Database\Eloquent\Collection
     * @return array
     */
    public function transformComments($comments)
    {
        $transform = [];
        foreach ($comments as $key => $comment) {
            $transform[$key]['IdEditor'] = $comment->id;
            $transform[$key]['Editor'] = $comment->editor->name;
            if ($comment->publish_date) {
                $transform[$key]['PublishDate'] = implode('T', explode(' ', $comment->publish_date));
            } else {
                $transform[$key]['PublishDate'] = '';
            }
            $transform[$key]['Body'] = $comment->body;
        }

        return $transform;
    }
}