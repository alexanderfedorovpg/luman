<?php

namespace App\Search\Reference;

use Exception;

/**
 * Абстрактный класс для получения спарвки с разных источников
 *
 * class ReferenceAbstract
 * @package App\Search\Reference
 */
abstract class ReferenceAbstract
{
    /**
     * Формат ответа
     *
     * @var string
     */
    public $format;

    /**
     * Язык запроса
     *
     * @var string
     */
    public $lang = 'en';

    /**
     * Запрос на получение справки
     *
     * @var string
     */
    protected $link;

    /**
     * Поиск справки
     *
     * @param string $query Текст для поиска
     * @return array
     */
    abstract public function search($query);

    /**
     * Выполняет загрузку страницы
     *
     * @param string $url Адрес страницы
     * @return string
     */
    public function loadPage($url)
    {
        return $this->loadData($url);
    }

    /**
     * Отправляет запрос на поиск данных и возвращает результат
     *
     * @param string $link Строка запроса
     * @return string
     * @throws \Exception
     */
    protected function loadData($link)
    {
        $userAgent = 'Mozilla/5.0 (X11; Linux x86_64) ' .
            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36';

        $options = [
            CURLOPT_USERAGENT => $userAgent,
            CURLOPT_CONNECTTIMEOUT => 30,
            CURLOPT_FOLLOWLOCATION => 1,
            CURLOPT_FRESH_CONNECT => 1,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $link,
        ];

        $ch = curl_init();
        curl_setopt_array($ch, $options);

        $result = null;
        if (!$result = curl_exec($ch)) {
            throw new Exception(curl_error($ch));
        }

        return $result;
    }
}