<?php
/**
 * Author: Arsen
 */

namespace App\Http\Controllers\v1;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Validation\Validator;
/**
 * Class WikiParser
 * @package App\Http\Controllers\v1
 */
class WikiParser extends ApiController {

	public function parse(Request $request) {

		$data = $request->except('_token');

		$this->validate($request, [
            'query' => 'required',
        ]);

		$str = $data['query'];
		$title = str_replace([' ', ','], '_', $str);

		$opts = array('http' =>
		  array(
		    'user_agent' => 'MyBot/1.0 (http://www.mysite.com/)'
		  )
		);
		$context = stream_context_create($opts);

		$url = "http://ru.wikipedia.org/w/api.php?action=query&prop=revisions&titles=$title&rvprop=timestamp|comment|content&format=json";
		$result = file_get_contents($url, FALSE, $context);

		echo "$result";
	}

		
}