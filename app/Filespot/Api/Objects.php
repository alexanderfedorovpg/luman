<?php

namespace App\Filespot\Api;

use App\Filespot\Request;

/**
 * Класс для работы с файлами
 *
 * class Objects
 * @package App\Filespot\Api
 */
class Objects
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
     * Выгружает файл на сервер
     *
     * @param string $file Путь к файлу
     * @param string $name Название файла. Можно указывать директорию
     * @return \App\Filespot\Response
     */
    public function uploadFile($file, $name = null)
    {
        $subUrl = 'objects';
        return $this->request->uploadFile($subUrl, $file, $name);
    }

    /**
     * Получение списка всех объектов
     *
     * @param string $folder Директория, из которой нужно получить файлы. Пример: "/test".
     * Если параметр не указан, сканирование файлов будет осуществляться по всем
     * директориям аккаунта.
     * @param string $name Имя файла. Пример: "test.mp4"
     * @param string $ext Расширение имени файла. Пример: "mp4"
     * @return \App\Filespot\Response
     */
    public function getFileList($folder = '', $name = '', $ext = '')
    {
        $subUrl = "objects";
        $params = [];
        if ($folder) {
            $params['folder'] = $folder;
        }

        if ($name) {
            $params['name'] = $name;
        }

        if ($ext) {
            $params['ext'] = $ext;
        }
        return $this->request->sendGet($subUrl, $params);
    }

    /**
     * Метод для получения более детальной информации о файле
     *
     * @param string $fileId идентификатор файла
     * @return \App\Filespot\Response
     */
    public function getFileInfo($fileId)
    {
        $subUrl = "objects/{$fileId}";
        return $this->request->sendGet($subUrl);
    }

    /**
     * Удаляет файл с заданным id
     *
     * @param string $fileId идентификатор файла
     * @return \App\Filespot\Response
     */
    public function deleteFile($fileId)
    {
        $subUrl = "objects/{$fileId}";
        return $this->request->sendDelete($subUrl);
    }

    /**
     * Изменяет файл с заданным id
     *
     * @param string $fileId идентификатор файла
     * @param array $fields поля для заполнения
     * @return \App\Filespot\Response
     */
    public function updateFile($fileId, array $fields = [])
    {
        $subUrl = "objects/{$fileId}";
        return $this->request->sendPut($subUrl, $fields);
    }
}