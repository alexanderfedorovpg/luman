<?php


namespace App\Http\Transformers\v1;

use App\Helpers\UrlReplaceHelper;
use App\Http\Transformers\Transformer;
use App\Models\NewsCommentsEditor;
use App\Models\NewsUri;
use App\Models\Rubrics;
use App\Models\News;
use App\Models\CdnFile;

class NewsEditorTransformer extends Transformer
{
    public function transform($news)
    {
        $transform = $news;

        $transform['keywords'] = explode(',', $news['keywords']);
        $transform['rubrics'] = News::find($news['id'])->rubrics()->orderBy('name')->get(['rubrics.id', 'rubrics.name'])->toArray();
        $transform['editor'] = $this->transformEditor($news['id']);
        $editorComments = $this->transformEditorComments($news['id']);
        $transform['editor_id'] = isset($transform['editor']['id']) ? $transform['editor']['id'] : null;
        if ($editorComments) {
            $transform['lastEditorComment'] = $editorComments[count($editorComments) - 1];
        } else {
            $transform['lastEditorComment'] = null;
        }

        if ($news['cover_id']) {

            $cover = CdnFile::where('id', '=', $news['cover_id'])->pluck('url')->first();
            $transform['cover']['cover_url'] = $cover;
            $transform['cover']['cover_id'] = $news['cover_id'];
        }

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
        }
        elseif($news['ext_video_link']){
            $preview=CdnFile::where('id', '=', $news['video_stream_preview'])->first();
            $transform['video_stream'] = [
                'url' => $news['ext_video_link'],
                'id' => null,
                'duration' => null,
                'preview' => $preview['url'],
                'preview_id' => $news['video_stream_preview'],
                'preview_source' => $preview['object_source'],
                'preview_author' => $preview['object_author'],
                'preview_name' => $preview['object_name'],
            ];
        }
        else {
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


        $datetime_now = new \DateTime($news['is_publish'] ? $news['publish_date'] : "now");
        $time_edit = new \DateTime($news['created_at']);
        $interval = $time_edit->diff($datetime_now);
        $transform['time_edit'] = $interval->format('%D:%H:%I:%S');


        return $transform;
    }

    public function transformOneNews($news)
    {
        $transform = $this->transform($news);
        $transform['editorComments'] = $this->transformEditorComments($news['id']);

        $datetime_now = new \DateTime($news['is_publish'] ? $news['publish_date'] : "now");
        $time_edit = new \DateTime($news['created_at']);
        $interval = $time_edit->diff($datetime_now);
        $transform['time_edit'] = $interval->format('%D:%H:%I:%S');
        $transHelper = new UrlReplaceHelper();
        $url_title = $transHelper->translate($news['title']);
        $uri=NewsUri::where('news_id','=',$news['id'])->pluck('uri')->first();
        $transform['uri'] = $uri?'https://'.$uri:'https://rtvi.com/news/'. $news['id'].'-'.$url_title;
        unset($transform['lastEditorComment']);

        return $transform;
    }

    /**
     * Комментарии редактора
     * @param int $newsId ID новости
     * @return array
     */
    public function transformEditorComments($newsId)
    {
        $comments = NewsCommentsEditor::where('news_id', '=', $newsId)->get();
        $transform = [];
        foreach ($comments as $comment) {
            $transform[] = [
                'id' => $comment->id,
                'publish_date' => $comment->publish_date,
                'description' => $comment->description,
                'is_online' => $comment->is_online,
                'editor' => $this->transformEditor($newsId),
            ];
        }
        return $transform;
    }

    /**
     * Редактор новости
     * @param int $newsId ID новости
     * @param return array
     */
    public function transformEditor($newsId)
    {
        $news = News::where('id', '=', $newsId)->first();
        $editor = $news->editor;
        if (!$editor) {
            return null;
        }
        $transform = [
            'id' => $editor->id,
            'login' => $editor->login,
            'email' => $editor->email
        ];

        return $transform;
    }
}