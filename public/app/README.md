# RTVI - CMS

## Требования

## Установка

Приложение находится по адресу [librorum](https://gitlab.ddemo.ru/a.volkov/librorum/tree/master/public/app/react_project/build). Для его установки необходимо скопировать файлы в корень public директорию веб сервера.


# RTVI - Public site

## Требования

- node >= 6
- npm >= 4.5.0

## Установка

##### 1. Приложение находится по адресу [librorum](https://gitlab.ddemo.ru/a.volkov/librorum/tree/master/public/app/front-react/). Для установки зависимостей необходимо выполнить находясь в корневой папке приложения:
``` npm install ```

##### 2. Сделать билд приложения
``` npm run build ```

##### 3. Запустить web-сервер:
``` npm run start ```

## Настройки сервера

Переменные окружения
``` root_dir/.env.public ```

ВНИМАНИЕ: переменные в файле .env.public включаются в билд клиентского кода. не оставляйте здесь конфденциальную информацию(например, пароли).

Используемые переменные
```
API_ENDPOINT_CMS=https://example.com    - адрес апи CMS
API_ENDPOINT_PUBLIC=https://example.com - адрес апи публичной части
PORT=8080                               - порт на котором будет запущен нод сервер 
                                          публичной части
DISABLE_SSR                             - (default: false) отключить рендеринг на сервере
```
