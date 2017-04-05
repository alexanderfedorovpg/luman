<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    /**
     * @var int
     */
    protected $statusCode = 200;

    /**
     * @return int
     */
    public function getStatusCode() {
        return $this->statusCode;
    }

    /**
     * @param $statusCode
     * @return $this
     */
    public function setStatusCode($statusCode) {
        $this->statusCode=$statusCode;
        return $this;
    }

    /**
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondNotFound($message="Not found!") {
        return $this->setStatusCode('404')->respondWithError($message);
    }

    /**
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondFail500x($message="Internal Error") {
        return $this->setStatusCode('500')->respondWithError($message);
    }

    /**
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondFail403x($message="Unauthorized action!") {
        return $this->setStatusCode('403')->respondWithError($message);
    }

    /**
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondFail422x($message="Unprocessable Entity!") {
        return $this->setStatusCode('422')->respondWithError($message);
    }

    /**
     * @param $data
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    public function respond($data, $headers = []) {
       $headers=['Access-Control-Allow-Origin'=>'*'];
        return response()->json($data , $this->getStatusCode() , $headers);
    }

    /**
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondWithError($message) {
        return $this->respond([
            'error'=>[
                'message'=>$message,
                'staus_code'=>$this->getStatusCode(),
            ]
        ]);

    }
}