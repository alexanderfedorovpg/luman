<?php

namespace App\Filespot;

/**
 * Класс конфигурации
 *
 * class Configuration
 * @package App\Filespot
 */
class Configuration
{
    /**
     * Базовый URL API
     *
     * @var string
     */
    private $apiUrl = 'https://api.platformcraft.ru';

    /**
     * Версия API
     *
     * @var string
     */
    private $apiVersion = '1';

    /**
     * ID выданный менеджером
     *
     * @var string
     */
    private $userId;

    /**
     * Подпись текущего запроса (HMAC хеш-сумма в шестнадцатеричном виде
     * с использованием SHA-256 и ключа пользователя)
     *
     * @var string
     */
    private $hash;

    /**
     * текущее время в Unix формате
     *
     * @var integer
     */
    private $timestamp;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->userId = env('FILESPOT_USER_ID');
        $this->timestamp = time();
        $this->hash = hash_hmac('sha256', $this->timestamp, env('FILESPOT_USER_KEY'));
    }

    /**
     * Возвращает сформированный базовый url к api
     *
     * @return string
     */
    public function getApiUrl()
    {
        return "{$this->apiUrl}/{$this->apiVersion}/";
    }

    /**
     * Возвращает часть url строки с параметрами авторизации
     *
     * @return string
     */
    public function getAuthString()
    {
        return "?apiuserid={$this->userId}" .
            "&timestamp={$this->timestamp}" .
            "&hash={$this->hash}";
    }


}