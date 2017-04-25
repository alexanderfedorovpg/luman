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
     * Ключ пользователя для подписи запросов
     *
     * @var string
     */
    private $userKey;

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
        $this->userId = config('cdn.filespot.user_id');
        $this->timestamp = time();
        $this->userKey = config('cdn.filespot.user_key');
    }

    /**
     * Возвращает сформированный базовый url к api
     *
     * @return string
     */
    public function getApiUrl()
    {
        return config('cdn.filespot.api_url').'/'. config('cdn.filespot.api_version').'/';
    }

    /**
     * Возвращает часть url строки с параметрами авторизации
     *
     * @return string
     */
    public function getAuthString()
    {
        return "apiuserid={$this->userId}" .
            "&timestamp={$this->timestamp}";
    }

    /**
     * Возвращает ключ пользователя
     *
     * @var string
     */
    public function getUserKey()
    {
        return $this->userKey;
    }
}