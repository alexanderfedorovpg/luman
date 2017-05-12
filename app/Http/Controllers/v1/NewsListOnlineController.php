<?php

namespace App\Http\Controllers\v1;


use App\Helpers\LogController;
use App\Models\NewsComments;
use App\Providers\LogServiceProvider;
use App\Http\Transformers\v1\NewsListTransformer;
use App\Models\News;
use Illuminate\Http\Request;
use App\Auth\Rbac\Models\Permission;
use App\Http\Traits\NewsListTrait;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use App\Http\Transformers\v1\NewsListOnlineTransformer;
use Validator;

/**
 * Class NewsListOnlineController
 * @package App\Http\Controllers\v1
 */
class NewsListOnlineController extends CmsController
{
    use NewsListTrait;

    private $newsListTransformer;
    private $user_id;
    private $log;

    /**
     * NewsListOnlineController constructor.
     * @param NewsListOnlineTransformer $transformer
     */
    function __construct(NewsListOnlineTransformer $transformer)
    {
        parent::__construct();
        $this->user_id = Auth::id();
        $this->log = new LogController();
        $this->newsListTransformer = $transformer;
    }


    /** Получить спикок текущих онлайнов
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getListOnline(Request $request)
    {

        try {

            $news = News::published()->newsOnline();

            $this->processing($request, $news);
            $news = $news->get();

            return $this->respond(
                $this->newsListTransformer->transformCollection($news->toArray())
            );
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }
    }


    /**  Обновить статус новости
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatusNewsOnline($id)
    {
        try {
            $news = News::findOrfail($id);
            $news->is_online = !$news->is_online;
            if ($news->save()) {
                return $this->respond(['status_online' => $news->is_online]);
            } else {
                return $this->respondNotFound();
            }
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }
    }


    /** Добавить комментарий к новостоному онлайну
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function addCommentNewsOnline(Request $request)
    {
        try {
            $validator = new Validator($request->all(), NewsComments::$rules);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            if ($request->input('image_preview') && $request->input('video_stream')) {

            }
            $news = NewsComments::create($request->all());
            return $this->respondCreated([
                'success' => true
            ]);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }

    }

    /**Обновить комментарий  новостного онлайна
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateCommentNewsOnline(Request $request)
    {
        try {
            $this->validate($request, [
                'id' => 'required',
                'body' => 'required',
            ]);
            $id = $request->input('id');
            $news = NewsComments::findOrfail($id);
            $news->editor_id = $this->user_id;
            $news->body = $request->input('body');
            if ($news->save()) {
                return $this->respond($news->toArray());
            } else {
                return $this->respondNotFound();
            }
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }

    }

    /** Удалить коменнтарий новстоного онлайна
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteCommentNewsOnline($id)
    {

        try {

            $news = NewsComments::findOrfail($id);
            if ($news->delete()) {
                return $this->respond($news->toArray());
            } else {
                return $this->respondNotFound();
            }
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }


    }

    /** Получить список комментариев новостного онлайн
     * @param $news_id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getListCommentsNewsOnline($id)
    {
        try {
            $newsComments = NewsComments::where('news_id', '=', $id)->get();
            return $this->respond(
                $this->newsListTransformer
                    ->transformCollectionComments($newsComments->toArray())
            );
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('News not found');
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }
    }

}