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
                'created_at' => $message->created_at,
                'files' => $this->transformFiles($message->files)
            ];
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