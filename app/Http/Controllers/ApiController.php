<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    protected function responseOk($data)
    {
        return response()->json([
            'code' => 200,
            'data' => $data,
        ], 200);
    }

    protected function responseNotFound()
    {
        return response()->json([
            'code' => 404,
            'message' => 'Resource not found'
        ], 404);
    }
    protected function responseForbidden()
    {
        return response()->json([
            'code' => 403,
            'message' => 'Forbidden'
        ], 403);
    }

    protected function responseServerError()
    {
        return response()->json([
            'code' => 500,
            'message' => 'Server error'
        ], 500);
    }
}