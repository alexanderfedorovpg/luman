<?php


namespace App\Search\Reference;

use App\Search\Reference\Wikipedia\Wikipedia;

/**
 * Класс для получения спарвки с разных источников
 *
 * class Reference
 * @package App\Search\Reference
 */
class Reference extends ReferenceAbstract
{

    /**
     * Выполняет поиск по всем источникам
     *
     * @param string $query Запрос
     * @return array
     */
    public function search($query)
    {
        $result = [];

        $wiki = new Wikipedia();
        $wiki->lang = $this->lang;
        $result['wikipedia'] = $this->wikiTransform($wiki->search($query));

        return $result;
    }

    /**
     * Преобразует данные с wikipedia к нужному виду
     *
     * @param array $wikiData Данные с wikipedia
     * @return array
     */
    protected function wikiTransform(array $wikiData)
    {

        $titleId = 1; $descriptId = 2; $urlId = 3;
        $result = [];
        for ($i = 0; $i < count($wikiData[$titleId]); $i++) {
            $result[] = [
                'title' => $wikiData[$titleId][$i],
                'description' => $wikiData[$descriptId][$i],
                'url' => $wikiData[$urlId][$i]
            ];
        }
        return $result;
    }
}