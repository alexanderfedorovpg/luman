<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use App\News;
use App\NewsChat;
use App\NewsChatMessage;
use Auth;

/**
 * Контроллер чата новостей
 *
 * class NewsChatController
 * @package App\Http\Controllers\v1
 */
class NewsChatController extends CmsController
{
    /**
     * Возвращает все сообщения чата
     *
     * @param int $newsId ID новости
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($newsId)
    {
        $news = News::find($newsId);
        if (!$news) {
            return $this->respondNotFound('News not found');
        }

        return $this->respond($news->chat->messages);
    }

    /**
     * Создает новое сообщение чата
     *
     * @param \Illuminate\Http\Request $request
     * @param int $newsId ID новости
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request, $newsId)
    {
        $news = News::find($newsId);
        if (!$news) {
            return $this->respondNotFound('News not found');
        }

        try {
            $this->validate($request, NewsChatMessage::$rules);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->getMessage());
        }

        $chat = $news->chat;
        if (!$news->chat) {
            $chat = new NewsChat(['news_id' => $news->id]);
            $chat->save();
        }

        $message = $request->input('message');
        $user = Auth::user();

        return $this->respond(['success' => $chat->newMessage($message, $user)]);
    }
}