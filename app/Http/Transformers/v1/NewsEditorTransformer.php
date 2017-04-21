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
        $transform['tags'] =  explode(',', $news['tags']);
        $transform['keywords'] = explode(',', $news['keywords']);
        $transform['rubrics'] = Rubrics::where('id', '=', $news['rubrics_id'])->get();
        $transform['editor'] = $this->transformEditor($news['id']);
        $editorComments = $this->transformEditorComments($news['id']);
        $transform['editor_id'] = isset($transform['editor']['id']) ? $transform['editor']['id'] : null;
        if ($editorComments) {
            $transform['lastEditorComment'] = $editorComments[count($editorComments) - 1];
        } else {
            $transform['lastEditorComment'] = null;
        }

        $imageMain = CdnFile::where('id', '=', $news['image_main'])->select(['url', 'id'])->first();
        $transform['image_main'] = $imageMain['url'];
        $transform['image_main_id'] = $imageMain['id'];

        $imagePreview = CdnFile::where('id', '=', $news['image_preview'])->select(['url', 'id'])->first();
        $transform['image_preview'] = $imagePreview['url'];
        $transform['image_preview_id'] = $imagePreview['id'];

        unset($transform['rubrics_id']);
        
        return $transform;
    }

    public function transformOneNews($news)
    {
        $transform = $this->transform($news);
        $transform['editorComments'] = $this->transformEditorComments($news['id']);
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
     * @param int $newsId  ID новости
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