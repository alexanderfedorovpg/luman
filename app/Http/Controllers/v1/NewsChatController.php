<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use App\Http\Transformers\v1\NewsChatTransformer;
use App\Models\News;
use App\Models\NewsChat;
use App\Models\NewsChatMessage;
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
     * @var \App\Http\Transformers\v1\NewsChatTransformer
     */
    protected $newsChatTransformer;

    /**
     * NewsChatController constructor.
     * @param \App\Http\Transformers\v1\NewsChatTransformer $newsChatTransformer
     */
    public function __construct(NewsChatTransformer $newsChatTransformer)
    {
        parent::__construct();
        $this->newsChatTransformer = $newsChatTransformer;
    }

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

        $chat = $news->chat;
        if ($chat) {
            return $this->respond(
                $this->newsChatTransformer->transformMessages($chat->messages)
            );
        } else {
            return $this->respond([]);
        }
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
        $files = (array) $request->input('files');
        $user = Auth::user();

        return $this->respond(['success' => $chat->newMessage($message, $user, $files)]);
    }
}