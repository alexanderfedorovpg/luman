<?php

namespace App\Filespot;

use App\Filespot\Configuration;
use App\Filespot\Object;

class Filespot
{
    public static function object()
    {
        $client = new Object(new Configuration());
        return $client;
    }
}