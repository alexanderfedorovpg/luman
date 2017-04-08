<?php

namespace App\Filespot;

class Object
{
    use Request;

    public function __construct(Configuration $config)
    {
        $this->baseUrl = $config->getApiUrl();
        $this->authParams = $config->getAuthString();
    }

    /**
     * Выгружает файл на сервер
     *
     * @param string $file Путь к файлу
     * @param string $name Название файла. Можно указывать директорию
     * @return void
     */
    public function uploadFile($file, $name = null)
    {
        $url = '';
        $result = $this->uploadRequest($url, $file, $name);
    }


    public function getFileList($folder = '', $name = '', $ext = '')
    {

    }


}