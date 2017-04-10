<?php

namespace App\Search\Reference\Wikipedia;

use App\Search\Reference\ReferenceAbstract;


/**
 * Ищет информацию на Wikipedia
 *
 * class Wikipedia
 * @package App\Search\Reference\Wikipedia
 */
class Wikipedia extends ReferenceAbstract
{
    /**
     * Формат ответа
     *
     * @var string
     */
    public $format = 'json';

    /**
     * Поиск справки
     *
     * @param string $query Текст для поиска
     * @return array
     */
    public function search($query)
    {
        $this->bildLink();
        $link = $this->link . "&search=" . urlencode($query);

        return  json_decode($this->loadData($link));
    }

    /**
     * Формирует ссылку
     *
     * @return void
     */
    protected function bildLink()
    {
        $this->link = "https://{$this->lang}.wikipedia.org/w/api.php?" .
            "action=opensearch" .
            "&format={$this->format}" .
            "&prop=images" .
            "&errorlang={$this->lang}";
    }

}