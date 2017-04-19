<?php


namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;
use App\Http\Transformers\v1\NewsListTransformer;
use App\NewsCommentsEditor;
use App\Rubrics;
use App\News;
use App\User;

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
        if ($editorComments) {
            $transform['lastEditorComment'] = $editorComments[count($editorComments) - 1];
        } else {
            $transform['lastEditorComment'] = null;
        }

        unset(
            $transform['rubrics_id'],
            $transform['editor_id']
        );
        return $transform;
    }

    public function transformOneNews($news, $comments)
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