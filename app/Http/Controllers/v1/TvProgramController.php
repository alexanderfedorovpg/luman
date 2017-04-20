<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use App\Http\Transformers\v1\TvProgramTransformer;
use App\Models\TvProgram;

/**
 * Контроллер телепередач
 * @package App\Http\Controllers\v1\Cms
 */
class TvProgramController extends CmsController
{

    /**
     * @var TvProgramTransformer
     */
    protected $programsTransformer;

    /**
     * TvProgramsController constructor.
     * @param TvProgramTransformer $transformer
     */
    public function __construct(TvProgramTransformer $transformer)
    {
        parent::__construct();
        $this->programsTransformer = $transformer;
    }

    /**
     * Получение всех телепередач
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $programs = TvProgram::all();

        return $this->respond(
            $this->programsTransformer->transformCollection($programs->toArray())
        );
    }

    /**
     * Получение телепередачи по ID
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $program = TvProgram::findOrFail($id);
            if ($program) {
                return $this->respond(
                    $this->programsTransformer->transformWithRecords($program->toArray())
                );
            }
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('TV program not found');
        } catch (\Exception $e) {
            $this->respondFail500x();
        }
    }

    /**
     * Добавление телепрограмы
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        try {
            $this->validate($request, TvProgram::$rules);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->getMessage());
        }

        $program = new TvProgram($request->all());
        if ($program->save()) {
            return $this->respondCreated(['success' => true]);
        }

        return $this->respondFail500x();
    }

    /**
     * Редактирование телепередачи
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $program = TvProgram::findOrFail($id);
            $this->validate($request, TvProgram::$rules);

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('TV program not found');
        } catch (\Exception $e) {
            return $this->respondFail422x($e->getMessage());
        }

        return $this->respondCreated(['success' => $program->update($request->all())]);
    }

    /**
     * Удаление телепередачи
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $program = TvProgram::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('TV program not found');
        }

        return $this->respond(['success' => $program->delete()]);
    }
}