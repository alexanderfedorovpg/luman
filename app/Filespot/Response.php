<?php

namespace App\Filespot;

/**
 * class Response
 * @package App\Filespot
 */
class Response
{
    /**
     * Обработчик CURL
     *
     * @var resource
     */
    private $curlHandler;

    /**
     * CURL ответ
     *
     * @var string
     */
    private $response;

    /**
     * Constructor
     *
     * @param resource $curlHandler Обработчик CURL
     * @param string $response CURL ответ
     */
    public function __construct($curlHandler, $response)
    {
        $this->curlHandler = $curlHandler;
        $this->response = $response;
    }

    /**
     * Destructor
     */
    public function __destruct()
    {
        curl_close($this->curlHandler);
    }

    /**
     * Ответ
     *
     * @return string
     */
    public function __toString()
    {
        return $this->response;
    }

    /**
     * Возвращает информацию о последнем запросе
     *
     * @return array
     */
    public function getInfo()
    {
        return curl_getinfo($this->curlHandler);
    }

    /**
     * HTTP статус код ответа
     *
     * @return int
     */
    public function getStatusCode()
    {
        return curl_getinfo($this->curlHandler, CURLINFO_HTTP_CODE);
    }

    /**
     * Возвращает послдению ошибку в виде массива
     * ['code' => 'код ошибки curl', 'message' => 'текст ошибки']
     *
     * @return array
     */
    public function getLastError()
    {
        return [
            'code' => curl_errno($this->curlHandler),
            'message' => curl_error($this->curlHandler)
        ];
    }

    /**
     * Преобразует строку json ответа в массив
     *
     * @return array
     */
    public function jsonDecode()
    {
        return json_decode($this->response);
    }
    public function toArray() {
        return json_decode( $this->response, true);
    }
}