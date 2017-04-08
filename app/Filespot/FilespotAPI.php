<?php

namespace App\Filespot;

use App\Filespot\Api\Object;

class FilespotAPI
{
    public static function object()
    {
        $client = new Object(new Configuration());
        return $client;
    }
}