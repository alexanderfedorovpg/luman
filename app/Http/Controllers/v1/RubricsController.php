<?php

namespace App\Http\Controllers\v1;

use App\Rubrics;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\Validator;

use Illuminate\Http\Request;

/**
 * Class TagsController
 * @package App\Http\Controllers\v1
 */
class RubricsController extends CmsController
{

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        try {
            $this->validate($request, [
                'name' => 'required|max:50',
            ]);

            $rubrics = new Rubrics;
            $rubrics->name = $request->input('name');
            if ($rubrics->save()) {
                return $this->respondCreated(["id" => $rubrics->id]);
            };

        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }

    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $tags = Rubrics::all();
            return $this->respond($tags);

        } catch (ModelNotFoundException $e) {
            $this->respondNotFound($e->getMessage());
        }

    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $rubric = Rubrics::findOrFail($id);

            return $this->respond($rubric);

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound($e->getMessage());
        }

    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {

            $this->validate($request, [
                'name' => 'required',
            ]);

            $rubric = Rubrics::findOrFail($id);
            $rubric->name = $request->input('name');

            if ($rubric->save()) {
                return $this->respondCreated($rubric);
            };

        } catch (ModelNotFoundException $e) {
            $this->respondNotFound($e);

        } catch
        (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }

    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        try {

            $rubric = Rubrics::findOrFail($id);
            if ($rubric->delete()) {
                return $this->respond([]);
            };

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound($e->getMessage());
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }
    }
}