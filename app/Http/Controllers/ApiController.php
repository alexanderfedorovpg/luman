<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    protected $statusCode = 200;

    public function getStatusCode() {
        return $this->statusCode;
    }

    public function setStatusCode($statusCode) {
        $this->statusCode=$statusCode;
        return $this;
    }

    public function respondNotFound($message="Not found!") {
        return $this->setStatusCode('404')->respondWithError($message);
    }

    public function respondFail500x($message="Internal Error") {
        return $this->setStatusCode('500')->respondWithError($message);
    }

    public function respondFail403x($message="Unauthorized action!") {
        return $this->setStatusCode('403')->respondWithError($message);
    }

    public function respond($data, $headers = []) {
        return response()->json($data , $this->getStatusCode() , $headers);
    }

    public function respondWithError($message) {
        return $this->respond([
            'error'=>[
                'message'=>$message,
                'staus_code'=>$this->getStatusCode(),
            ]
        ]);

    }
}