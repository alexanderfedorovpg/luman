<?php

namespace App\Http\Controllers\v1;

use App\Tag;

use Illuminate\Validation\Validator;
use App\Http\Controllers\CmsController;
use Illuminate\Http\Request;

/**
 * Class TagsController
 * @package App\Http\Controllers\v1
 */
class TagsController extends CmsController {

	public function create(Request $request) {

		$this->validate($request, [
            'name' => 'required|max:50',
        ]);

		$tags = new Tag;
		$tags->name = $request->name;
		$tags->save();

	}

    /**
     * @return \Illuminate\Http\JsonResponse
     */
	public function index() {

		$tags = Tag::all();

		return response()->json(['tags' => $tags]);
	}

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
	public function show($id) {

		$tag = Tag::find($id);

		return response()->json(['tag' => $tag]);
	}

    /**
     * @param Request $request
     */
	public function update(Request $request) {

		if(Tag::find($request->id)) {

			$this->validate($request, [
            'name' => 'required',
        	]);

			$tag = Tag::find($request->id);
			$tag->name = $request->name;
			$tag->save();

		}
		
		
	}

    /**
     * @param Request $request
     */
	public function destroy(Request $request) {

		if(Tag::find($request->id)) {

			$tag = Tag::find($request->id);
			$tag->delete();

		}
		
	}



}