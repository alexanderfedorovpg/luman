<?php

namespace App\Http\Controllers\v1\Cms;

use App\Http\Controllers\ApiController;

class CmsController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth');
    }
}