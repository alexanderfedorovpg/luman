<?php


namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;
use App\Models\NewsCommentsEditor;
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
            $transform['video_stream'] = [
                'url' => CdnFile::where('id', '=', $news['video_stream'])->pluck('url')->first(),
                'id' =>  $news['video_stream'],
                'duration' => $news['video_stream_duration'],
                'preview' => CdnFile::where('id', '=', $news['video_stream_preview'])->pluck('url')->first(),
            ];
        } else {
            $transform['video_stream'] = null;
        }


        if ($news['image_main']) {
            $imageMain = CdnFile::where('id', '=', $news['image_main'])->select(['url', 'id'])->first();
            $transform['image_main'] = [
                'url' => $imageMain->url,
                'id' =>  $imageMain->id,
                'object_source' => $imageMain->object_source,
                'object_author' => $imageMain->object_source,
                'object_name' => $imageMain->object_source,
            ];
        } else {
            $transform['image_main'] = null;
        }


        if ($news['image_preview']) {
            $imagePreview = CdnFile::where('id', '=', $news['image_preview'])->select(['url', 'id'])->first();
            $transform['image_preview'] = [
                'url' => $imagePreview->url,
                'id' =>  $imagePreview->id,
                'object_source' => $imagePreview->object_source,
                'object_author' => $imagePreview->object_source,
                'object_name' => $imagePreview->object_source,
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