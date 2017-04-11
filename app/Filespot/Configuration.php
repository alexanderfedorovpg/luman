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
    private $apiUrl = 'api.platformcraft.ru';

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
        $this->userId = env('FILESPOT_USER_ID');
        $this->timestamp = time();
        $this->userKey = env('FILESPOT_USER_KEY');
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