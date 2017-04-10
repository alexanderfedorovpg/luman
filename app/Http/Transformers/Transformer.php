<?php

namespace  App\Http\Transformers;

abstract class Transformer  {

    /**
     * @param array $items
     * @return array
     */
	public function transformCollection(array $items){

		return array_map([$this,'transform'], $items);
	}

    /**
     * @param $items
     * @return mixed
     */
	public abstract function transform($items);
}