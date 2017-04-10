<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use Illuminate\Contracts\Validation\ValidationException;
use App\Search\Reference\Reference;

/**
 * Контроллер справки
 *
 * class ReferenceController
 * @package App\Http\Controllers\v1
 */
class ReferenceController extends CmsController
{
    /**
     * Поиск справки
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        try {
            $this->validate($request, [
                'query' => 'required'
            ]);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->getMessage());
        }

        $reference = $this->getReferenceSource();
        $result = $reference->search($request->input('query'));

        return $this->respond($result);
    }

    /**
     * Загрузка страницы по ссылке
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPage(Request $request)
    {
        try {
            $this->validate($request, [
                'url' => 'required'
            ]);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->getMessage());
        }

        $reference = $this->getReferenceSource();
        $result = $reference->loadPage($request->input('url'));

        return $this->respond(['page' => $result]);

    }

    /**
     * Возвращает ресурс справки
     *
     * @return \App\Search\Reference\Reference
     */
    private function getReferenceSource()
    {
        $reference = new Reference();
        $reference->lang = 'ru';

        return $reference;
    }
}