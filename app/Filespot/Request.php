<?php

namespace App\Filespot;

use Exception;
use CURLFile;

/**
 * class Request
 * @package \App\Filespot
 */
class Request
{
    /**
     * Базовый URL API
     *
     * @var string
     */
    protected $baseUrl;

    /**
     * Параметры авторизации
     *
     * @var string
     */
    protected $authParams;

    /**
     * Ключ для подписи запросов
     *
     * @var string
     */
    protected $signatureKey;

    /**
     * Constructor
     *
     * @param Configuration $config Конфигурация
     */
    public function __construct(Configuration $config)
    {
        $this->baseUrl = $config->getApiUrl();
        $this->authParams = $config->getAuthString();
        $this->signatureKey = $config->getUserKey();
    }

    /**
     * Собирает URL и добовляет подпись
     *
     * @param string $subUrl Долнительная часть URL
     * @param string $requestMethod Метод запроса
     * @return string
     */
    public function buildUrl($subUrl, $requestMethod, $params = [])
    {
        //Формирование основного URL и добавление араметров авторизации
        $url = "{$this->baseUrl}{$subUrl}";
        if (mb_strpos($url, '?') === false) {
            $url .= "?{$this->authParams}";
        } else {
            $url .= "&{$this->authParams}";
        }

        //Добавление подписи
        $url .= "&hash=" . $this->signRequest($requestMethod . "+" . $url);

        //Параметры которые НЕ должны быть включены в подпись
        foreach ($params as $key => $value) {
            $url .= "&{$key}=" . urlencode($value);
        }

        echo $url;

        return "https://" . $url;
    }

    /**
     * Отправляет запрос на сервер
     *
     * @param \Closure $curlOptions фунция обратного вызова для устновки доп. пораметров
     * @return \App\Filespot\Response
     */
    public function request(\Closure $curlOptions)
    {
        $ch = curl_init();

        $userAgent = 'Mozilla/5.0 (X11; Linux x86_64) ' .
            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36';

        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_ENCODING, '');
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        $curlOptions($ch);

        $result = curl_exec($ch);

        return new Response($ch, $result);
    }

    /**
     * Отправляет DELETE запрос
     *
     * @param string $subUrl Часть URL
     * @return \App\Filespot\Response
     */
    public function sendDelete($subUrl)
    {
        $url = $this->buildUrl($subUrl, 'DELETE');

        return $this->request(function($curlHandle) use ($url) {
            curl_setopt($curlHandle, CURLOPT_URL, $url);
            curl_setopt($curlHandle, CURLOPT_CUSTOMREQUEST, 'DELETE');
        });
    }

    /**
     * Отправляет GET запрос
     *
     * @param string $subUrl Часть URL
     * @param array $params Параметры запроса
     * @return \App\Filespot\Response
     */
    public function sendGet($subUrl, array $params = [])
    {
        $url = $this->buildUrl($subUrl, 'GET', $params);

        return $this->request(function($curlHandle) use ($url) {
            curl_setopt($curlHandle, CURLOPT_URL, $url);
        });
    }

    /**
     * Отправляет POST запрос
     *
     * @param string $subUrl Часть URL
     * @param array $fields Поля формы
     * @return \App\Filespot\Response
     */
    public function sendPost($subUrl, array $fields = [])
    {
        $url = $this->buildUrl($subUrl, 'POST');
        return $this->request(function($curlHandle) use ($url, $fields) {
            curl_setopt($curlHandle, CURLOPT_URL, $url);
            curl_setopt($curlHandle, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($curlHandle, CURLOPT_POSTFIELDS, json_encode($fields));
            curl_setopt($curlHandle, CURLOPT_HTTPHEADER, ['Content-Type:application/json']);
        });
    }

    /**
     * Отправляет PUT запрос
     *
     * @param string $subUrl Часть URL
     * @param array $fields Поля формы
     * @return \App\Filespot\Response
     */
    public function sendPut($subUrl, array $fields = [])
    {
        $url = $this->buildUrl($subUrl, 'PUT');
        return $this->request(function($curlHandle) use ($url, $fields) {
            curl_setopt($curlHandle, CURLOPT_URL, $url);
            curl_setopt($curlHandle, CURLOPT_CUSTOMREQUEST, "PUT");
            curl_setopt($curlHandle, CURLOPT_POSTFIELDS, json_encode($fields));
            curl_setopt($curlHandle, CURLOPT_HTTPHEADER, ['Content-Type:application/json']);
        });
    }

    /**
     * Подписывает запрос и возвращает хэш подписи
     *
     * @param string $request Запрос
     * @return string
     */
    protected function signRequest($request)
    {
        return hash_hmac('sha256', $request, $this->signatureKey);
    }

    /**
     * Загружает файл на сервер
     *
     * @param string $subUrl Часть URL
     * @param string $file Путь к файлу
     * @param string $fileName Имя файла
     * @return \App\Filespot\Response
     */
    public function uploadFile($subUrl, $file, $fileName = '')
    {
        $data = [
            'file' => new CURLFile($file, null, $fileName)
        ];

        if ($fileName) {
            $data['name'] = $fileName;
        }

        $url = $this->buildUrl($subUrl, 'POST');

        return $this->request(function($curlHandle) use ($data, $url) {
            curl_setopt($curlHandle, CURLOPT_POST, true);
            curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curlHandle, CURLOPT_URL, $url);
        });
    }
}