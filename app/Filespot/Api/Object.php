<?php

namespace App\Filespot\Api;

use App\Filespot\Configuration;
use App\Filespot\Request;


class Object
{
    use Request;

    public function __construct(Configuration $config)
    {
        $this->baseUrl = $config->getApiUrl();
        $this->authParams = $config->getAuthString();
        $this->signatureKey = $config->getUserKey();
    }

    /**
     * Выгружает файл на сервер
     *
     * @param string $file Путь к файлу
     * @param string $name Название файла. Можно указывать директорию
     *
     */
    public function uploadFile($file, $name = null)
    {
        $subUrl = 'objects';
        return $this->requestUpload($subUrl, $file, $name);
    }


    public function getFileList($folder = '', $name = '', $ext = '')
    {

    }


}