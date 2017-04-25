<?php
/**
 * Created by PhpStorm.
 * User: Mikhail Shakin
 * Date: 25.04.2017
 * Time: 11:17
 */

return [

    /*
    |--------------------------------------------------------------------------
    | TASS
    |--------------------------------------------------------------------------
    |
    | Конфигрирование настроек доступа к источнику данных агенства ТАСС
    |
    */
    'tass' => [
        'login' => env('PARSER_TASS_LOGIN', 'rtvi'),
        'password' => env('PARSER_TASS_PASSWORD', '457BcF44'),
        'url_online_primary' => env('PARSER_TASS_URL_ONLINE_PRIMARY', 'http://newsml.itar-tass.com/newsml/newsmlgencfg.nsf/onlinenewsdoc?openagent&tape=enl1-online'),
        'url_online_secondary' => env('PARSER_TASS_URL_ONLINE_SECONDARY', 'http://newsml.itar-tass.com/newsml/newsmlgencfg.nsf/onlinenewsdoc?openagent&tape=enl1-online'),
    ]
];