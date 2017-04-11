<?php

namespace App\Filespot;

use App\Filespot\Api\Objects;
use App\Filespot\Api\Streams;

class FilespotAPI
{
    /**
     * Возвращает объект api файлов
     *
     * @return \App\Filespot\Api\Objects
     */
    public static function objects()
    {
        $request = new Request(new Configuration());
        $objects = new Objects($request);
        return $objects;
    }

    /**
     * Возвращает объект api потоков
     *
     * @return \App\Filespot\Api\Streams
     */
    public static function streams()
    {
        $request = new Request(new Configuration());
        $streams = new Streams($request);
        return $streams;
    }
}