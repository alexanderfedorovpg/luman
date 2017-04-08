<?php

namespace App\Filespot;

use Exception;
use CURLFile;

trait Request
{
    protected $baseUrl;

    protected $authParams;

    public function request(array $options = [])
    {
        $options = array_merge([
            CURLOPT_RETURNTRANSFER => true,
        ], $options);

        $ch = curl_init();
        curl_setopt_array($ch, $options);

        $result = null;
        if (!$result = curl_exec($ch)) {
            throw new Exception(curl_error($ch));
        }

        return $result;
    }

    public function uploadRequest($url, $file, $fileName = null)
    {
        $data = [
            'file' => new CURLFile($file, null, $fileName)
        ];

        if ($fileName) {
            $data['name'] = $fileName;
        }

        $options = [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_URL => $url,
        ];

        return $this->request($options);
    }
}