# Change Log
Все изменения в проекте записываются в этом файле.

## 2017-05-03
### Added
- Запуск парсера из консоли 
```bash
./artisan parse:upload tass
```

### Changed
- Тип поля body с blob на text

## [1.0.1] - 2017-04-10
### Added
- Методы для работы с PUSH уведомления. 
Для работы нужно указать ключ FCM сервера с https://console.firebase.google.com и указать его в .env ( APP_FCM_SERVER_KEY )

### Changed