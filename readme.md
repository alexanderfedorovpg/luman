# RTVI - CMS

## Требования
    
- PHP >= 5.6.4;
- OpenSSL PHP Extension;
- Composer;
- MySQL server;
- PDO PHP Extension;
- Mbstring PHP Extension;
- CURL PHP Extension;
- Nginx/Apache.

## Установка


##### 1. Развертывание файлов проекта, конфигурирование веб-вервера и СУБД
Создайте базу данных MySQL для проекта. Затем склонируйте репозитарий проекта [librorum](https://gitlab.ddemo.ru/a.volkov/librorum) в директорию веб сервера.

- `` git clone git@gitlab.ddemo.ru:a.volkov/librorum.git``
- `` cd ./librorum ``
- `` composer update ``

Произведите необходимые настройки в конфигурационном файле веб-сервера, путь до **document root** должен включать папку _public_ относительно проекта librorum.

Скопируйте и заполните конфигурационный файл _.env_

```cp ./env.example ./env```
 
Обязательные к заполнению константы:
- DB_*;
- PARSER_TASS_*;
- FILESPOT_*.

##### 2. Установка миграций.

Перейдите в каталог проекта и выполните команду:

```bash
./artisan migrate
```

##### 3. Создание базовых групп и учетной записи администратора.

Выполните команду:

```bash
./artisan db:seed 
```
Будет создан пользователь _admin_ c паролем _admin_, а также базовые группы:

- Администраторы;
- Редакторы;
- Выпускающий;
- Практикант.

##### 4. Настройка и запуск слушателя заданий.

В файле .env 

``` 
QUEUE_DRIVER=database
```
 

#####Пример:
 - Создать конфигурационный файл /etc/supervisor/conf.d/email.conf для listener
 - Отредактировать, указав свои пути
 
```
[program:email-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /home/ubuntu/test/artisan queue:work --queue=parser --sleep=2 --tries=1 --timeout 30 --daemon
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/var/log/creditgateway/worker.log
```

- Сохранить и перезапустить supervisor 

```bash
sudo service supervisor restart
```

#####Вручную для теста:
```bash
 ./artisan queue:work --queue=parser --sleep=2 --tries=1 --timeout 30 --daemon
 ```
## Настройка почты
 
 В файле .env 

```bash
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=25
MAIL_USERNAME=286dw1sa848e0e7
MAIL_PASSWORD=cbf625b2365238e11f
MAIL_ENCRYPTION=tls
```

в файле config/mail.php найти и прописать свои настройки
```
'from' => ['address' => "noreplay@rtvi.ru", 'name' => null],

'notification' => ['address' => "notification@rtvi.ru", 'name' => "Сообщение от Client API"],
```

##### 5. Запуск парсера фида из консоли.
```bash
./artisan parse:upload tass
```