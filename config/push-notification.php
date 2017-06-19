<?php
/**
 * Created by PhpStorm.
 * User: Mikhail Shakin
 * Date: 25.04.2017
 * Time: 11:51
 */

return [
    /*
     |--------------------------------------------------------------------------
     | laravel-push-notification
     |--------------------------------------------------------------------------
     |
     | see https://github.com/davibennun/laravel-push-notification
     |
     */

    'appNameIOS' => [
        'environment' => 'production',
        'certificate' => '/path/to/certificate.pem',
        'passPhrase' => 'password',
        'service' => 'apns'
    ],
    'appNameAndroid' => [
        'environment' => 'production',
        'apiKey' => 'AAAAQBfCgTM:APA91bH1eB1w_xiOXDN-tar2S_j7uNeRUItrci_JJYbhqTEflFJGVnHHrgRJgmbQvGtDcSpeX0LMZzMbugkdZFDPiZoitqLS3IG_EQPonruNJZvOZinKDR3B7Bioy0NaGzlMmp9KNXzj',
        'service' => 'gcm'
    ]

];