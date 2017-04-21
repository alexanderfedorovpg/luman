<?php

namespace App\Http\Controllers\v1;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Transformers\v1\AirRecordTransformer;
use App\Models\AirRecord;
use App\Models\TvProgram;

/**
 * Контроллер записей эфиров
 * @package App\Http\Controllers\v1\Cms
 */
class AirRecordController extends CmsController
{

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
    public function index()
    {
        $records = AirRecord::all();

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
            return $this->respondFail422x($e->getMessage());
        }

        $record = new AirRecord($request->all());
        if ($record->save()) {
            return $this->respondCreated(['success' => true]);
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

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('Air record not found');
        } catch (\Exception $e) {
            return $this->respondFail422x($e->getMessage());
        }

        return $this->respondCreated(['success' => $record->update($request->all())]);
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

}