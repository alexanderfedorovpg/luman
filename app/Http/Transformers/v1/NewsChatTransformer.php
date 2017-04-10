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
                'files' => $message->files
            ];
        }

        return $transform;
    }
}