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

Настройки сервера хранятся по адресу
``` root_dir/config/values.js ```

После изменений настроек сервера, либо исходных файлов необходимо сделать ребилд приложения и перезапустить сервер