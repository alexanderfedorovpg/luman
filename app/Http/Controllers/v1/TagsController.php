<?php

namespace App\Http\Controllers\v1;

use App\Tag;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\Validator;

use Illuminate\Http\Request;

/**
 * Class TagsController
 * @package App\Http\Controllers\v1
 */
class TagsController extends CmsController
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

            $tags = new Tag;
            $tags->name = $request->name;
            if ($tags->save()) {
                return $this->respondCreated(["id" => $tags->id]);
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
            $tags = Tag::all();
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
            $tag = Tag::findOrFail($id);

            return $this->respond($tag);

        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound($e->getMessage());
        }

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        try {
            if (Tag::find($request->id)) {

                $this->validate($request, [
                    'name' => 'required',
                ]);

                $tag = Tag::find($request->id);
                $tag->name = $request->name;

                if ($tag->save()) {
                    return $this->respondCreated($tag);
                };

            }
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request)
    {
        try {
            if (Tag::find($request->id)) {

                $tag = Tag::findOrFail($request->id);
                if ($tag->delete()) {
                    return $this->respond([]);
                };

            }
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound($e->getMessage());
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }
    }
}