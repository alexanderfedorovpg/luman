<?php

namespace App\Http\Controllers\v1;

use App\Http\Transformers\v1\NewsEditorTransformer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Http\Transformers\v1\AirRecordTransformer;
use App\Models\News;
use App\Http\Traits\AirRecordFilter;
use App\Helpers\FileHelper;
use App\Filespot\Configuration;

/**
 * Контроллер записей эфиров
 * @package App\Http\Controllers\v1\Cms
 */
class AirRecordController extends CmsController
{

    use AirRecordFilter;

    /**
     * @var AirRecordTransformer
     */
    protected $recordTransformer;

    /**
     * AirRecordTransformer constructor.
     * @param AirRecordTransformer $transformer
     */
    public function __construct(AirRecordTransformer $transformer)
    {
        parent::__construct();
        $this->recordTransformer = $transformer;
    }

    /**
     * Получение всех записей
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $records = $this->filter($request, News::query())->AirRecords()->where('delete','=','0')->get();

        return $this->respond(
            $this->recordTransformer->transformCollection($records->toArray())
        );
    }

    /**
     * Получение записи по ID
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $record = News::findOrFail($id);
            if ($record) {
                return $this->respond(
                    $this->recordTransformer->transform($record->toArray())
                );
            }
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('Air record not found');
        }
    }

    /**
     * Добавление эфирной записи
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {

        $this->validate($request, [
            'program_id' => 'required|integer|exists:tv_programs,id',
        ]);

        $request->request->add(['video_stream'=> $request->input('video')]);
        $request->request->add(['video_stream_preview'=>  $request->input('video_preview')]);
        $editor_id =$request->input('editor_id');

        $request->request->add( ['editor_id'=> $editor_id?$editor_id:Auth::id()] );

        $news = new NewsListEditorController();
        $result = $news->create($request);
        return $this->respond($result->original);
    }

    /**
     * Редактирование эфирной записи
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {


        $this->validate($request, [
            'program_id' => 'required|integer|exists:tv_programs,id',
        ]);

        $request->request->add(['id' => $id]);
        $editor_id =$request->input('editor_id');

        $request->request->add( ['editor_id'=> $editor_id?$editor_id:Auth::id()] );

        $news = new NewsListEditorController();


       $result = $news->edit($request);
        return $this->respond($result->original);
    }

    /**
     * Удаление эфирной записи
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {

        $news = new NewsListEditorController();
        $result=$news->delete($id);

        return $this->respond($result->original);
    }

    /**
     * Публикует эфирные записи
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function publish(Request $request)
    {

        $news = new NewsListEditorController();
        $result=$news->publish($request, $request->input('id'));
        return $this->respond($result->original);
    }

    /**
     * Аплоад видео файла
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        try {
            $this->validate($request, [
                'file' => 'file|required|max:262144',
            ]);

            $info = [
                'object_source' => $request->input('object_source') ? $request->input('object_source') : null,
                'object_author' => $request->input('object_author') ? $request->input('object_author') : null,
                'object_name' => $request->input('object_name') ? $request->input('object_name') : null,
            ];
            $cdnFile = FileHelper::uploadFilespotFile($request->file('file'), $info);
            if ($cdnFile) {
                return $this->respond([
                    'success' => true,
                    'file' => $cdnFile->toArray()
                ]);
            }

            throw new \Exception('Error uploading file');
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
            return $this->respondFail500x();
        }
    }

    public function triggerVisibleConstructor(Request $request)
    {
        $news = new NewsListEditorController();
        $news->triggerVisibleConstructor($request);
    }


}