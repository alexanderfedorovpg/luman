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
     | FileSpot
     |--------------------------------------------------------------------------
     |
     | Конфигрирование настроек доступа к источнику данных агенства ТАСС
     |
     */
    'filespot' => [
        'api_url' => env('FILESPOT_API_URL', 'api.platformcraft.ru'),
        'api_version' => env('FILESPOT_API_VERSION', '1'),
        'user_id' => env('FILESPOT_USER_ID', ''),
        'user_key' => env('FILESPOT_USER_KEY', ''),
    ]
];