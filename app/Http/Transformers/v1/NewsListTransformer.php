<?php

namespace App\Http\Transformers\v1;

use App\Helpers\UrlReplaceHelper;
use App\Models\News;
use App\Models\NewsUri;
use App\Models\User;
use App\Http\Transformers\Transformer;
use App\Models\Rubrics;
use App\Models\CdnFile;

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
            'id' => $news['id']
        ];

        if ($news['publish_date']) {
            $transform['publish_date'] = implode('T', explode(' ', $news['publish_date']));
        } else {
            $transform['publish_date'] = '';
        }

        $transform['top'] = $news['top'];
        $transform['title'] = $news['title'];
        $transform['subtitle'] = $news['sub_title'];




        if ($news['video_stream']) {
            $preview=CdnFile::where('id', '=', $news['video_stream_preview'])->first();
            $transform['video_stream'] = [
                'url' => CdnFile::where('id', '=', $news['video_stream'])->pluck('url')->first(),
                'id' =>  $news['video_stream'],
                'duration' => $news['video_stream_duration'],
                'preview' => $preview['url'],
                'preview_id' => $news['video_stream_preview'],
                'preview_source' => $preview['object_source'],
                'preview_author' => $preview['object_author'],
                'preview_name' => $preview['object_name'],
            ];
        } else {
            $transform['video_stream'] = null;
        }


        if ($news['image_main']) {
            $imageMain = CdnFile::where('id', '=', $news['image_main'])->select()->first();
            $transform['image_main'] = [
                'url' => $imageMain->url,
                'id' =>  $imageMain->id,
                'object_source' => $imageMain->object_source,
                'object_author' => $imageMain->object_author,
                'object_name' => $imageMain->object_name,
            ];
        } else {
            $transform['image_main'] = null;
        }


        if ($news['image_preview']) {
            $imagePreview = CdnFile::where('id', '=', $news['image_preview'])->select()->first();
            $transform['image_preview'] = [
                'url' => $imagePreview->url,
                'id' =>  $imagePreview->id,
                'object_source' => $imagePreview->object_source,
                'object_author' => $imagePreview->object_author,
                'object_name' => $imagePreview->object_name,
            ];
        } else {
            $transform['image_preview'] = null;
        }



        $transform['cover']=null;



        if ($news['cover_id']) {

            $cover = CdnFile::where('id', '=', $news['cover_id'])->pluck('url')->first();
            $transform['cover']['cover_url'] = $cover;
            $transform['cover']['cover_id'] = $news['cover_id'];
        }




        $transform['editor_id'] = $news['editor_id'];

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
            $transform['original_link'] = $news['original_source_link'];
        } else {
            $transform['original_link'] = false;
        }


        $transform['keywords'] = explode(',', $news['keywords']);

        $transform['rubrics'] = News::find($news['id'])->rubrics()->orderBy('name')->get(['rubrics.id','rubrics.name'])->toArray();

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
        $transform['note'] = $news['note'];
        $transform['body'] = $news['body'];
        $transform['comments'] = $this->transformComments($comments);

        $transHelper = new UrlReplaceHelper();
        $url_title = $transHelper->translate($news['title']);

        $uri=NewsUri::where('news_id','=',$news['id'])->pluck('uri')->first();
        $transform['uri'] = $uri?'https://'.$uri:'https://rtvi.com/news/'. $news['id'].'-'.$url_title;

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
            $transform[$key]['id_editor'] = $comment->id;
            $transform[$key]['editor'] = $comment->editor->name;
            if ($comment->publish_date) {
                $transform[$key]['publish_date'] = implode('T', explode(' ', $comment->publish_date));
            } else {
                $transform[$key]['publish_date'] = '';
            }
            $transform[$key]['body'] = $comment->body;
        }

        return $transform;
    }
}