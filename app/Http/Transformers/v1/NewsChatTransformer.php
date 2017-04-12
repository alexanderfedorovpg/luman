<?php


namespace App\Http\Transformers\v1;


use App\Http\Transformers\Transformer;

class NewsChatTransformer extends Transformer
{
    /**
     * @param $messages
     * @return array
     */
    public function transform($chat)
    {
        $transform = $chat;

        return $transform;
    }

    public function transformMessages($messages)
    {
        $transform = [];
        foreach ($messages as $message) {
            $transform[] = [
                'id' => $message->id,
                'message' => $message->message,
                'author' => $this->transformAuthor($message->author),
                'created_at' => $message->created_at,
                'files' => $this->transformFiles($message->files)
            ];
        }

        return $transform;
    }

    public function transformAuthor($user)
    {
        $transform = [];
        if ($user) {
            $transform = $userTransform = (new UsersTransformer())->transform($user);
            unset(
                $transform['need_change_password'],
                $transform['enabled'],
                $transform['created_at'],
                $transform['updated_at'],
                $transform['groups'],
                $transform['password_err_count']
            );
        }

        return $transform;
    }

    public function transformFiles($files)
    {
        $transform = [];
        foreach ($files as $file) {
            $transform[] = [
                'id' => $file->id,
                'url' => $file->url
            ];
        }
        return $transform;
    }
}