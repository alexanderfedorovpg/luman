<?php

namespace App\Http\Controllers\v1;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Transformers\v1\AirRecordTransformer;
use App\Models\AirRecord;
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
        $records = $this->filter($request, AirRecord::query())->get();

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
            $record = AirRecord::findOrFail($id);
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
        try {
            $this->validate($request, AirRecord::$rules);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        }

        $record = new AirRecord($request->all());
        if ($record->save()) {
            return $this->respondCreated([
                'success' => true,
                'data' => [
                    'id' => $record->id
                ]
            ]);
        }

        return $this->respondFail500x();
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
        try {
            $record = AirRecord::findOrFail($id);
            $this->validate($request, AirRecord::$rules);

            return $this->respondCreated([
                'success' => $record->update($request->all())
            ]);
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('Air record not found');
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        }

    }

    /**
     * Удаление эфирной записи
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $record = AirRecord::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('Air record not found');
        }

        return $this->respond(['success' => $record->delete()]);
    }

    /**
     * Публикует эфирные записи
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function publish(Request $request)
    {
        try {
            $this->validate($request, [
                'records' => 'array',
                'records.*' => 'integer|exists:air_records,id'
            ]);

            $records = $request->input('records');
            if (!$records) {
                $records = [];
            }

            return $this->respondCreated([
                'success' => (bool)AirRecord::publish($records)
            ]);

        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        }
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
        try {
            $this->validate($request, [
                'id' => 'required:exists:air_records,id',
            ]);
            $id = $request->input('id');

            $rec = AirRecord::findOrfail($id);
            $rec->to_constructor = !$rec->to_constructor;

            if ($rec->save()) {
                return $this->respond($rec->toArray());
            } else {
                return $this->respondNotFound();
            }
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }
}


}