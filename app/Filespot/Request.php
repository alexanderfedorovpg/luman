<?php

namespace App\Filespot;

use Exception;
use CURLFile;

trait Request
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
     * Отправляет запрос на сервер
     *
     * @param \Closure $options фунция обратного вызова для устновки доп. пораметров
     * @return string
     */
    public function request(\Closure $options)
    {
        $ch = curl_init();

        $userAgent = 'Mozilla/5.0 (X11; Linux x86_64) ' .
            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36';

        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_ENCODING, '');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
        $options($ch);

        $result = null;
        if (!$result = curl_exec($ch)) {
            //DEBUG
            print_r( curl_getinfo($ch) );
            print_r( curl_errno($ch) );
            print_r( curl_error($ch) );
            throw new Exception(curl_error($ch));
        }
        curl_close($ch);

        return $result;
    }

    /**
     * Загружает файл на сервер
     *
     * @param string $controller Контроллер Platformcraft
     * @param resource $file Файл
     * @param string $fileName Имя файла
     * @return string
     */
    public function requestUpload($controller, $file, $fileName = null)
    {
        $data = [
            'file' => new CURLFile($file, null, $fileName)
        ];

        if ($fileName) {
            $data['name'] = $fileName;
        }

        $url = "{$this->baseUrl}{$controller}?{$this->authParams}";
        $url .= '&hash=' . $this->signRequest('POST+' . $url);

        return $this->request(function($curlResource) use ($data, $url) {
            curl_setopt($curlResource, CURLOPT_POST, true);
            curl_setopt($curlResource, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curlResource, CURLOPT_URL, $url);
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
}