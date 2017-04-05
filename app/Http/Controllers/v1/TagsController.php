<?php

namespace App\Http\Controllers\v1;

use App\Tag;

use Illuminate\Validation\Validator;
use App\Http\Controllers\CmsController;
use Illuminate\Http\Request;

class TagsController extends CmsController {

	public function create(Request $request) {

		$this->validate($request, [
            'name' => 'required|max:50',
        ]);

		$tags = new Tag;
		$tags->name = $request->name;
		$tags->save();

	}

	public function read() {

		$tags = Tag::all();

		return response()->json(['tags' => $tags]);
	}

	public function read_id($id) {

		$tag = Tag::find($id);

		return response()->json(['tag' => $tag]);
	}

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

	public function delete(Request $request) {

		if(Tag::find($request->id)) {

			$tag = Tag::find($request->id);
			$tag->delete();

		}
		
	}



}