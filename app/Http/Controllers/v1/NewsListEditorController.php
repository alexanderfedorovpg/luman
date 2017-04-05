<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\v1\NewsListController;
use Illuminate\Http\Request;

/**
 * Class NewsListController
 * @package App\Http\Controllers\v1\Client
 */
class NewsListEditorController extends NewsListController
{

    /**
     * Получить список новостей
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request)
    {
        //var_dump(1);
       return parent::get($request);
    }

    /**
     * Получить новость по ID
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne($id)
    {
        var_dump(2);
       // parent::getOne($id);
    }

}
