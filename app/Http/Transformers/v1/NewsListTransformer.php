<?php

namespace App\Http\Transformers\v1;

use App\Helpers\UrlReplaceHelper;
use App\Models\News;
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


        $imagePreview = CdnFile::where('id', '=', $news['image_preview'])->pluck('url')->first();
        $transform['image_preview'] = $imagePreview;

	    $imageMain = CdnFile::where('id', '=', $news['image_main'])->pluck('url')->first();
	    $transform['image_main'] = $imageMain;

        $transform['video_stream'] = $news['video_stream'];

        $transHelper = new UrlReplaceHelper();
	    $url_title = $transHelper->translate($news['title']);

        $transform['share_link'] = 'http://rtvi.com/news/'. $news['id'].'-'.$url_title;

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