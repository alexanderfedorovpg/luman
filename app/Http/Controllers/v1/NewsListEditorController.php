<?php

namespace App\Http\Controllers\v1;

use Illuminate\Support\Facades\Auth,
    Illuminate\Http\Request,
    App\Models\News,
    App\Models\NewsCommentsEditor,
    App\Http\Traits\NewsListTrait,
    App\Helpers\LogController,
    App\Http\Transformers\v1\NewsEditorTransformer,
    App\Helpers\NewsModerationLogHelper,
    Illuminate\Database\Eloquent\ModelNotFoundException,
    Illuminate\Validation\ValidationException;

define('DEFAULT_VALUE', '50');

/**
 * Class NewsListController
 * @package App\Http\Controllers\v1\Client
 */
class NewsListEditorController extends CmsController
{

    use NewsListTrait;

    /**
     * @var \App\Http\Transformers\v1\NewsEditorTransformer
     */
    protected $newsEditorTransformer;
    protected $log;
    private $user_id;

    /**
     * NewsListController constructor.
     * @param \App\Http\Transformers\v1\NewsEditorTransformer $newsEditorTransformer
     */
    public function __construct(NewsEditorTransformer $newsEditorTransformer)
    {
        parent::__construct();
        $this->user_id = Auth::id();
        $this->log = new LogController();
        $this->newsEditorTransformer = $newsEditorTransformer;
    }

    /**
     * Получить список новостей
     * string $assigned = 'me' : 'all'
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request, $assigned = 'me')
    {

        try {

            $this->getArray = true;

            $user_id = $this->user_id;

            switch ($assigned) {
                case 'me' :
                    $params = ['editor_id' => $user_id, 'moderation' => 0, 'delete' => 0, 'is_publish' => 0];
                    break;
                case 'all' :
                    $params = ['editor_id' => null, 'moderation' => 0, 'delete' => 0, 'is_publish' => 0];
                    break;
                default :
                    $params = false;
            }

            if (!$params) {
                $this->respondFail422x();
            }

            $news = null;
            if (Auth::user()->isAdmin()) {
                $news = News::query();
            } else {
                $news = News::ModerationThisEditor($params);
            }

            $this->processing($request, $news);

            $news = $news->get();

            if ($news->isEmpty()) {
                return $this->respond([]);
            }

            $newsList = $this->newsEditorTransformer
                ->transformCollection($news->toArray());

            return $this->respond($newsList);
        } catch (\Exception $e) {
            return $this->respondFail500x($e);
        }

    }

    public function getModerated(Request $request)
    {

        try {

            $news = News::ModerationMode();

            $searchString = $request->input('searchString');
            $orderBy = $request->input('orderBy');

            if ($searchString) {
                $substrings = explode(',', $searchString);
                $news->substring($substrings);
            }

            switch ($orderBy) {
                case 'datetime':
                    $news->orderBy('created_at', 'asc');
                    break;
                case 'top':
                    $news->orderBy('top', 'desc');
                    break;
                default:
                    break;
            }


            $news = $news->paginate(DEFAULT_VALUE);

            $news = $news->toArray();
            $result = $this->newsEditorTransformer->transformCollection($news['data']);
            return $this->respond(
                $result
            );

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound($e->getMessage());
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }

    }


    /**
     * Получить новость по ID
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        try {
            $news = News::findOrFail($id);

            return $this->respond(
                $this->newsEditorTransformer->transformOneNews($news->toArray())
            );
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('News not found');
        }
    }

    /**
     * Редактировать новость
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request)
    {
        try {

            //устанавливаем часовой пояс
            date_default_timezone_set('Europe/Moscow');

            if ($request->get('rubrics')) {
                foreach ($request->get('rubrics') as $key => $val) {
                    $rules['rubrics.' . $key] = 'required|exists:rubrics,id';
                }
            }

            $rules['id'] = 'required|exists:news,id';
            $rules['editor_id'] = 'numeric|exists:users,id';

            $rules['is_online'] = 'in:0,1';
            $rules['is_war_mode'] = 'in:0,1';
            $rules['top'] = 'required|numeric';

            $rules['title'] = 'required|max:120';
            $rules['sub_title'] = 'required|max:140';
            $rules['theses'] = 'required';

            $rules['image_main'] = 'required';
            $rules['image_preview'] = 'required';
            $rules['original_source_link'] = 'url';

            $this->validate($request,
                $rules
            );


            $id = $request->input('id');

            $title = $request->input('title');
            $sub_title = $request->input('sub_title');
            $top = $request->input('top');
            $note = $request->input('note');
            $video_stream = $request->input('video_stream');

            $body = $request->input('body');


            $editor_id = $request->input('editor_id');
            $image_main = $request->input('image_main');
            $image_preview = $request->input('image_preview');
            $is_online = $request->input('is_online');
            $updated_at = new \DateTime(); // date('Y-m-d H:i:s')
            $is_war_mode = $request->input('is_war_mode');
            $publish_date = $request->input('publish_date');
            $original_source_link = $request->input('original_source_link');
            $moderation = $request->input('moderation');
            $theses = $request->input('theses');

            $newsEdit = News::find(intval($id));

            if ($newsEdit == null) {
                return $this->respondNotFound("Элемент не найден");
            }

            if ($newsEdit ) {

                $newsEdit->title = $title;
                $newsEdit->sub_title = $sub_title;
                $newsEdit->note = $note;
                $newsEdit->video_stream = $video_stream;
                $newsEdit->is_publish = 0;
                $newsEdit->publish_date = null;
                $newsEdit->top = $top;
                $newsEdit->body = $body;

                $newsEdit->moderation = 0;


                $log_moderation = new NewsModerationLogHelper($newsEdit);

                if ((!Auth::user()->isAdmin()) && ($this->user_id != $newsEdit->editor_id)) {
                    return $this->respondFail403x("Данный пользователь не являеться редактором данной новости");
                }

                //необязательные поля
                if ($request->get('keywords')) {
                    $newsEdit->keywords = $request->get('keywords');
                }


                if ($request->get('rubrics')) {
                    $rubrics = $request->get('rubrics');
                }
                if (isset($theses)) {
                    $newsEdit->theses = $theses;
                }
                if (isset($sub_title)) {
                    $newsEdit->sub_title = $sub_title;
                }
                if (isset($video_stream)) {
                    $newsEdit->video_stream = $video_stream;
                }
                if (isset($image_main)) {
                    $newsEdit->image_main = $image_main;
                }
                if (isset($image_preview)) {
                    $newsEdit->image_preview = $image_preview;
                }
                if (isset($is_online)) {
                    $newsEdit->is_online = $is_online;
                }
                if (isset($is_war_mode)) {
                    $newsEdit->is_war_mode = $is_war_mode;
                }

                if ($log_moderation->setEndModeration() && $newsEdit->save()) {
                    if (isset($rubrics) && is_array($rubrics)) {
                        $newsEdit->rubrics()->sync($rubrics);
                    }
                    $this->respond($newsEdit);
                    $this->log->setLog('MODERATION_NEWS', $this->user_id, "Successful");
                    return $this->respond(
                        $newsEdit->toArray()
                    );
                }
                $this->log->setLog('MODERATION_NEWS', $this->user_id, "Save error");
                throw new \Exception("Ошибка, новость не отредактирована");
            }

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound(['Исходная запись в ленте новостей не найдена либо скрыта']);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
            $this->log->setLog('MODERATION_NEWS', $this->user_id, "Error 500");
            return $this->respondFail500x([$e->getMessage()]);
        }
    }

    public function create(Request $request)
    {
        try {

            //устанавливаем часовой пояс
            date_default_timezone_set('Europe/Moscow');

            if ($request->get('rubrics')) {
                foreach ($request->get('rubrics') as $key => $val) {
                    $rules['rubrics.' . $key] = 'required|exists:rubrics,id';
                }
            }

            $rules['editor_id'] = 'numeric|exists:users,id';

            $rules['is_online'] = 'in:0,1';
            $rules['is_war_mode'] = 'in:0,1';
            $rules['top'] = 'required|numeric';

            $rules['title'] = 'required|max:120';
            $rules['sub_title'] = 'required|max:140';
            $rules['theses'] = 'required';

            $rules['image_main'] = 'required';
            $rules['image_preview'] = 'required';
            $rules['original_source_link'] = 'url';

            $this->validate($request,
                $rules
            );


            $title = $request->input('title');
            $sub_title = $request->input('sub_title');
            $top = $request->input('top');
            $note = $request->input('note');
            $video_stream = $request->input('video_stream');

            $body = $request->input('body');


            $editor_id = $request->input('editor_id');
            $image_main = $request->input('image_main');
            $image_preview = $request->input('image_preview');
            $is_online = $request->input('is_online');
            $updated_at = new \DateTime(); // date('Y-m-d H:i:s')
            $is_war_mode = $request->input('is_war_mode');
            $publish_date = $request->input('publish_date');
            $original_source_link = $request->input('original_source_link');
            $moderation = $request->input('moderation');
            $theses = $request->input('theses');

            $news = new News();

            $news->editor_id = $editor_id ? $editor_id : null;
            $news->title = $title;
            $news->sub_title = $sub_title;
            $news->note = $note ? $note : '';
            $news->video_stream = $video_stream;
            $news->is_publish = true;
            $news->publish_date = new \DateTime();
            $news->top = $top;
            $news->body = $body ? $body : '';


            $news->moderation = false;

            $news->original_source_link = $original_source_link ? $original_source_link : '';


            //необязательные поля
            if ($request->get('keywords')) {
                $news->keywords = $request->get('keywords');
            }

            if ($request->get('rubrics')) {
                $rubrics = $request->get('rubrics');
            }
            if (isset($theses)) {
                $news->theses = $theses;
            }
            if (isset($sub_title)) {
                $news->sub_title = $sub_title;
            }
            if (isset($video_stream)) {
                $news->video_stream = $video_stream;
            }
            if (isset($image_main)) {
                $news->image_main = $image_main;
            }
            if (isset($image_preview)) {
                $news->image_preview = $image_preview;
            }
            if (isset($is_online)) {
                $news->is_online = $is_online;
            }
            if (isset($is_war_mode)) {
                $news->is_war_mode = $is_war_mode;
            }

            if ($news->save()) {
                if (isset($rubrics) && is_array($rubrics)) {
                    $news->rubrics()->attach($rubrics);
                }
                $this->respond($news);
                $this->log->setLog('CREATE_NEWS', $this->user_id, "Successful");
                return $this->respond(
                    $news->toArray()
                );
            }
            $this->log->setLog('CREATE_NEWS', $this->user_id, "Save error");
            throw new \Exception("Ошибка, новость не создана");

        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
            $this->log->setLog('CREATE_NEWS', $this->user_id, "Error 500");
            return $this->respondFail500x([$e->getMessage()]);
        }
    }

    /*
     * Удалить новость
     */
    public function delete($id)
    {
        try {

            $news = News::find($id);
            $log_moderation = new NewsModerationLogHelper($news);

            if ($this->user_id != $news->editor_id) {
                return $this->respondWithError("Данный пользователь не являеться редактором данной новости");
            }

            $news->delete = 1;
            $news->moderation = 0;

            if ($log_moderation->rejectionModeration() && $news->save()) {
                $this->log->setLog('DELETE_NEWS', $this->user_id, "Successful, news id=" . $id . " delete");
                return $this->respondCreated(
                    ["data" => "delete"]
                );
            }
            $this->log->setLog('DELETE_NEWS', $this->user_id, "Error, news id=" . $id . " don't delete");
            throw new \Exception('Error, news don\'t delete');
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
            $this->log->setLog('DELETE_NEWS', $this->user_id, "Error 500 news id=" . $id);
            return $this->respondFail500x($e->getMessage());
        }
    }

    /*
     * Делегировать новость
     */
    public function delegate(Request $request)
    {

        try {

            $this->validate($request, [
                'id' => 'required|numeric',
                'new_editor_id' => 'required|numeric',
            ]);

            $id = $request->input('id');
            $new_editor_id = $request->input('new_editor_id');

            $news = News::find($id);
          //  $log_moderation = new NewsModerationLogHelper($news);

            if ((!Auth::user()->isAdmin()) && ($this->user_id != $news->editor_id)) {
                return $this->respondWithError("Данный пользователь не являеться редактором данной новости");
            }

            $news->editor_id = $new_editor_id;
            $news->moderation = 0;

            if (/*$log_moderation->setModeration() &&*/ $news->save()) {
                $this->log->setLog('DELEGATE', $id, "Successful, news id=" . $id . " delegate [" . $id . ">" . $new_editor_id . "]");
                return $this->respondCreated(
                    ["data" => "delegate"]
                );
            }
         $this->log->setLog('DELEGATE', $id, "Error, news id=" . $id . " don't delegate  [" . $id . ">" . $new_editor_id . "]");
            throw new \Exception('Error, news don\'t delegate');
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
            $id = $request->input('id');
           $this->log->setLog('DELEGATE', $id, "Error 500 news id=" . $id);
            return $this->respondFail500x($e->getMessage());
        }
    }

    /* REJECTION
     * Отказаться от редактирования новости
     */
    public function rejection(Request $request)
    {
        try {

            $this->validate($request, [
                'id' => 'required|numeric',
            ]);

            $id = $request->input('id');

            $news = News::find($id);
            $log_moderation = new NewsModerationLogHelper($news);

            if ((!Auth::user()->isAdmin()) && ($this->user_id != $news->editor_id)) {
                return $this->respondWithError("Данный пользователь не являеться редактором данной новости");
            }

            $news->editor_id = null;
            $news->moderation = 0;

            if ($log_moderation->rejectionModeration() && $news->save()) {
                $this->log->setLog('REJECTION', $this->user_id, "Successful, news id=" . $id . " rejection " . $this->user_id);
                return $this->respondCreated(
                    ["data" => "rejection"]
                );
            }

            $this->log->setLog('REJECTION', $this->user_id, "Error, news id=" . $id . " don't rejection  " . $this->user_id);
            throw new \Exception('Error, news don\'t rejection');

        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
            $this->log->setLog('REJECTION', $this->user_id, "Error 500 news id=" . $id);
            return $this->respondFail500x($e->getMessage());
        }
    }

    /* IN_WORK
     * Начать редактирование новости
     */
    public function in_work(Request $request)
    {
        try {

            $this->validate($request, [
                'id' => 'required|numeric',
            ]);

            $id = $request->input('id');

            $news = News::find($id);
            $log_moderation = new NewsModerationLogHelper($news);

            if ((!Auth::user()->isAdmin()) && ($this->user_id != $news->editor_id)) {
                return $this->respondWithError("Данный пользователь не являеться редактором данной новости");
            }

            $news->time_edit = date('Y-m-d H:i:s');
            $news->moderation = 1;

            if ($log_moderation->setModeration() && $news->save()) {
                $this->log->setLog('IN_WORK', $this->user_id,
                    "Successful, news id=" . $id . " in work user_id=" . $this->user_id);
                return $this->respondCreated(
                    ["data" => "in_work"]
                );
            }

            $this->log->setLog('IN_WORK', $this->user_id,
                "Error, news id=" . $id . " don't in work user_id=" . $this->user_id);
            throw new \Exception('Error, news don\'t rejection');
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
            $this->log->setLog('IN_WORK', $this->user_id, "Error 500 news id=" . $id);
            return $this->respondFail500x($e->getMessage());
        }
    }

    /*
     * Опубликовать новость
     */
    public function publish(Request $request, $id)
    {
        try {

            $this->validate($request, News::$rules);

            $news = News::find($id);
            $log_moderation = new NewsModerationLogHelper($news);

            if ((!Auth::user()->isAdmin()) && ($this->user_id != $news->editor_id)) {
                return $this->respondWithError("Данный пользователь не являеться редактором данной новости");
            }


            $news->is_publish = 1;

            if (/* $log_moderation->setPublish() &&*/
            $news->save()
            ) {
//                $this->log->setLog('DELEGATE', $this->user_id, "Successful, news id=".$id." delegate [".$this->user_id.">".$new_editor_id."]");
                return $this->respondCreated('publish');
            }
            $this->log->setLog('PUBLISH', $this->user_id, "Error, news id=" . $id . " don't publish  [" . $this->user_id . "]");
            throw new \Exception('Error, news don\'t publish');
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }
    }

    /**
     * На исправление
     */
    public function toFix(Request $request)
    {
        $id = null;
        try {

            $this->validate($request, [
                'id' => 'required|integer',
            ]);

            $id = $request->input('id');

            $news = News::findOrFail($id);
            $log_moderation = new NewsModerationLogHelper($news);

            if ((!Auth::user()->isAdmin()) && ($this->user_id != $news->editor_id)) {
                return $this->respondFail403x("Данный пользователь не являеться редактором данной новости");
            }

            if (!$news->editor_id) {
                return $this->respondWithError('У новости нет редактора');
            }

            $news->moderation = false;
            $news->is_publish = false;

            if ($log_moderation->setModeration() && $news->save()) {
                $this->log->setLog('TO_FIX',
                    $this->user_id,
                    "Successful, news id={$id} to fix [{$this->user_id}>{$news['editor_id']}]"

                );
                return $this->respondCreated(
                    ["data" => "to fix"]
                );
            }
            $this->log->setLog('TO_FIX',
                $this->user_id,
                "Error, news id={$id} don't to fix  [{$this->user_id}>{$news['editor_id']}]"
            );
            throw new \Exception('Error, news don\'t to fix');

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('News not found');
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
            $this->log->setLog('TO_FIX', $this->user_id, "Error 500 news id=" . $id);
            return $this->respondFail500x($e->getMessage());
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateCover(Request $request)
    {
        try {
            $this->validate($request, [
                'id' => 'required',
                'cover_id' => 'integer|exists:cdn_files,id',
            ]);
            $id = $request->input('id');
            $request->input('id');
            $news = News::findOrfail($id);
            $news->cover_id = $request->input('cover_id');

            if ($news->save()) {
                return $this->respond($news->toArray());
            } else {
                return $this->respondNotFound();
            }
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }
    }

    public function updateTitle(Request $request)
    {
        try {
            $this->validate($request, [
                'id' => 'required',
                'title' => 'required|string',
            ]);
            $id = $request->input('id');
            $request->input('id');
            $news = News::findOrfail($id);
            $news->title = $request->input('title');

            if ($news->save()) {
                return $this->respond($news->toArray());
            } else {
                return $this->respondNotFound();
            }
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }
    }
}
