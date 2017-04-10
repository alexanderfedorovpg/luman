<?php

namespace App\Filespot\Api;

use App\Filespot\Request;

/**
 * Класс для работы с потоками
 *
 * class Streams
 * @package App\Filespot\Api
 */
class Streams
{
    /**
     * Запрос
     *
     * @var Request
     */
    private $request;

    /**
     * Constructor
     *
     * @param \App\Filespot\Request Запрос
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Добовляет новый видеопоток
     *
     * @param string $name имя видеопотока
     * @param string $url rtmp или hls URL видеопотока
     * @return \App\Filespot\Response
     */
    public function createStream($name, $url)
    {
        $subUrl = 'streams';
        return $this->request->sendPost($subUrl, ['name' => $name, 'url' => $url]);
    }

    /**
     * Возвращает информацию о всех видеопотоках
     *
     * @return \App\Filespot\Response
     */
    public function getStreamList()
    {
        $subUrl = 'streams';
        return $this->request->sendGet($subUrl);
    }

    /**
     * Возвращает информацию о видеопотоке
     *
     * @param string $streanId идентификатор видеопотока
     * @return \App\Filespot\Response
     */
    public function getStreamInfo($streanId)
    {
        $subUrl = "streams/{$streanId}";
        return $this->request->sendGet($subUrl);
    }

    /**
     * Удаляет видеопоток с заданным id
     *
     * @param string $streanId идентификатор видеопотока
     * @return \App\Filespot\Response
     */
    public function deleteStream($streanId)
    {
        $subUrl = "streams/{$streanId}";
        return $this->request->sendDelete($subUrl);
    }
}