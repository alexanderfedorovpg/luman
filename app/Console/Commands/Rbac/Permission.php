<?php

namespace App\Console\Commands\Rbac;

use Illuminate\Console\Command;
use App\Auth\Rbac\Models\Permission as PermissModel;

class Permission extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'rbac:permiss';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rbac:permiss {permiss} {--upload} {--del}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Управление доступами';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {
        $method = $this->findPermissMethod($this->argument('permiss'));
        if (!$method) {
            return;
        }

        if ($this->option('upload')) {
            $this->uploadRows($method);
        } elseif ($this->option('del')) {
            $this->deleteRows($method);
        }

    }

    /**
     * Загружает массив доступов в базу данных
     *
     * @return void
     */
    public function uploadRows($method)
    {
        foreach ($this->$method() as $permission) {
            $exist = PermissModel::find(['name', $permission['name']])->first();
            if (!$exist) {
                PermissModel::create($permission);
            }
        }
    }

    /**
     * Удаляет массив доступов из базы данных
     *
     * @return void
     */
    public function deleteRows($method)
    {
        $names = [];
        foreach ($this->$method() as $permission) {
            $names[] = $permission['name'];
        }

        PermissModel::whereIn('name', $names)->delete();
    }

    /**
     * Проверяет существование permiss метода
     *
     * @return string
     */
    private function findPermissMethod($permissMethod)
    {
        $permissMethod = 'permiss' . ucfirst($permissMethod);

        $methods = get_class_methods($this);
        foreach ($methods as $method) {
            if ($method === $permissMethod) {
                return $method;
            }

        }

        $this->error("Method {$permissMethod}() not found");

        return '';
    }

    /**
     * Доступы для контроллера \App\Controllers\v1\UserController
     *
     * @return array
     */
    private function permissUser()
    {
        return [
            [
                'name' => 'v1.user-edit',
                'description' => 'Редактирование пользователя',
            ],
            [
                'name' => 'v1.user-create',
                'description' => 'Создание пользователя',
            ],
            [
                'name' => 'v1.user-delete',
                'description' => 'Удаление пользователя',
            ],
            [
                'name' => 'v1.user-show',
                'description' => 'Просмотор пользователя',
            ],
            [
                'name' => 'v1.user-profile',
                'description' => 'Профиль текущего пользователя',
            ],
            [
                'name' => 'v1.user-index',
                'description' => 'Просмотор списка пользователей',
            ],
        ];
    }
    /**
     * Доступы для контроллера \App\Controllers\v1\TagsController
     *
     * @return array
     */
//    private function permissTags()
//    {
//        return [
//            [
//                'name' => 'v1.tags-index',
//                'description' => 'Список тегов',
//            ],
//            [
//                'name' => 'v1.tags-create',
//                'description' => 'Создание тега',
//            ],
//            [
//                'name' => 'v1.tags-destroy',
//                'description' => 'Удаление тега',
//            ],
//            [
//                'name' => 'v1.tags-show',
//                'description' => 'Вывод тега',
//            ],
//        ];
//    }

    /**
     * Доступы для контроллера \App\Controllers\v1\NewsChatController
     *
     * @return array
     */
    public function permissNewsChat()
    {
        return [
            [
                'name' => 'v1.newsChat-index',
                'description' => 'Чат новости. Просмотор сообщений',
            ],
            [
                'name' => 'v1.newsChat-create',
                'description' => 'Чат новости. Сооздание сообщений',
            ]
        ];
    }

    /*
     * Доступы для контроллера \App\Controllers\v1\ReferenceController
     *
     * @return array
     */
//    public function permissReference()
//    {
//        return [
//            [
//                'name' => 'v1.tags-search',
//                'description' => 'Поиск справки',
//            ],
//            [
//                'name' => 'v1.tags-getPage',
//                'description' => 'Получение страницы спрвки',
//            ],
//        ];
//    }


    /**
     * Доступы для контроллера \App\Controllers\v1\FileController
     *
     * @return array
     */
    public function permissFile()
    {
        return [
            [
                'name' => 'v1.file-upload',
                'description' => 'Загрузка файлов',
            ],
            [
                'name' => 'v1.file-destroy',
                'description' => 'Удаление файлов',
            ],
        ];
    }

    public function permissNewsListOnline()
    {
        return [
            [
                'name' => 'v1.newslistonline-getListOnline',
                'description' => 'Получить список текущих онлайнов',
            ],
            [
                'name' => 'v1.newslistonline-updateStatusNewsOnline',
                'description' => 'Изменить статус новости на текстовый онлайн ',
            ],
            [
                'name' => 'v1.newslistonline-addCommentNewsOnline',
                'description' => 'Добавить комментарий к новостному онлайну',
            ],
            [
                'name' => 'v1.newslistonline-updateCommentNewsOnline',
                'description' => 'Обновить комментарий  новостного онлайна',
            ],
            [
                'name' => 'v1.newslistonline-deleteCommentNewsOnline',
                'description' => 'Удалить комментарий новостного онлайна',
            ],
            [
                'name' => 'v1.newslistonline-getListCommentsNewsOnline',
                'description' => 'Получить список комментариев новостного онлайн  ',
            ],
        ];
    }


    public function permissNewslisteditor()
    {
        return [
            [
                'name' => 'v1.newslisteditor-get',
                'description' => 'Список новостей',
            ],
            [
                'name' => 'v1.newslisteditor-getOne',
                'description' => 'Просмотр новости',
            ],

            [
                'name'=>'v1.newslisteditor-getModerated',
                'description'=>'Модерирование'
             ]
            ,
            [
                'name' => 'v1.newslisteditor-edit',
                'description' => 'Редактирование новости',
            ]
            ,
            [
                'name' => 'v1.newslisteditor-create',
                'description' => 'Создание новости',
            ]
            ,
            [
                'name' => 'v1.newslisteditor-delete',
                'description' => 'Удаление новости',
            ]
            ,
            [
                'name' => 'v1.newslisteditor-delegate',
                'description' => 'Делегирование новости',
            ]
            ,
            [
                'name' => 'v1.newslisteditor-rejection',
                'description' => 'Отказаться от новости',
            ]
            ,
            [
                'name' => 'v1.newslisteditor-in_work',
                'description' => 'В работу',
            ]
            ,
            [
                'name' => 'v1.newslisteditor-publish',
                'description' => 'Опубликовать',
            ]
            ,
            [
                'name' => 'v1.newslisteditor-toFix',
                'description' => 'На доработку',
            ]
            ,
            [
                'name' => 'v1.newslisteditor-updateCover',
                'description' => 'Редактировать обложку новости',
            ]
            ,
            [
                'name' => 'v1.newslisteditor-updateTitle',
                'description' => 'Обновить заголовк новости',
            ]
            ,
            [
                'name' => 'v1.newslisteditor-triggerVisibleConstructor',
                'description' => 'Показать/скрыть в конструторе',
            ]
            ];
    }

    /**
     * Доступы для контроллера \App\Controllers\v1\RubricsController
     *
     * @return array
     */
    public function permissRubrics()
    {
        return [
            [
                'name' => 'v1.rubrics-create',
                'description' => 'Создание рубрики',
            ],
            [
                'name' => 'v1.rubrics-index',
                'description' => 'Просмотор всех рубрик',
            ],
            [
                'name' => 'v1.rubrics-show',
                'description' => 'Просмотр рубрики',
            ],
            [
                'name' => 'v1.rubrics-update',
                'description' => 'Редактирование рубрики',
            ],
            [
                'name' => 'v1.rubrics-destroy',
                'description' => 'Удаление рубрики',
            ],
        ];
    }

    public function permissStatistics()
    {
        return [
            [
                'name' => 'v1.statistics-get',
                'description' => 'Список новостей',
            ],
            [
                'name' => 'v1.statistics-CountersAll',
                'description' => 'Список счетчиков',
            ],
        ];
    }

    public function permissHomepage()
    {
        return [
            [
                'name' => 'v1.homepage-index',
                'description' => 'Данные для формирование домашней страницы'
            ],
            [
                'name' => 'v1.homepage-update',
                'description' => 'Редактирование домашней страницы'
            ],
            [
                'name' => 'v1.homepage-getNewsCategories',
                'description' => 'Список категория новостей домашней страницы '
            ],
        ];
    }

    public function permissAirLive()
    {
        return [
            [
                'name' => 'v1.airLive-index',
                'description' => 'Просмотор списка прямых эфиров'
            ],
            [
                'name' => 'v1.airLive-onAir',
                'description' => 'Отправка в прямой эфир'
            ],
            [
                'name' => 'v1.airLive-disableAir',
                'description' => 'Отключает прямой эфир'
            ],
        ];
    }

    public function permissAirRecord()
    {
        return [
            [
                'name' => 'v1.airRecord-index',
                'description' => 'Просмотор списка записей эфиров'
            ],
            [
                'name' => 'v1.airRecord-show',
                'description' => 'Просмотор записи эфироа'
            ],
            [
                'name' => 'v1.airRecord-create',
                'description' => 'Создание записи эфира'
            ],
            [
                'name' => 'v1.airRecord-update',
                'description' => 'Редактирование записи эфира'
            ],
            [
                'name' => 'v1.airRecord-destroy',
                'description' => 'Удаление записи эфира'
            ],
            [
                'name' => 'v1.airRecord-publish',
                'description' => 'Публикация на главной странице записей эфиров'
            ],
            [
                'name' => 'v1.airRecord-upload',
                'description' => 'Загрузка записи эфира'
            ],
            [
                'name' => 'v1.airRecord-triggerVisibleConstructor',
                'description' => 'Скрыть/показать в конструкторе'
            ],
        ];
    }

    public function permissTvProgram()
    {
        return [
            [
                'name' => 'v1.tvProgram-index',
                'description' => 'Просмотр списка программ'
            ],
            [
                'name' => 'v1.tvProgram-show',
                'description' => 'Просмотр прогрммы'
            ],
            [
                'name' => 'v1.tvProgram-create',
                'description' => 'Создание прораммы'
            ],
            [
                'name' => 'v1.tvProgram-update',
                'description' => 'Редактирование программы'
            ],
            [
                'name' => 'v1.tvProgram-destroy',
                'description' => 'Удаление программы'
            ],
        ];
    }

    public function permissLog()
    {
        return [
            [
                'name' => 'v1.log-getAll',
                'description' => 'Просмотор логов'
            ],
            [
                'name' => 'v1.log-getCurrentUser',
                'description' => 'Просмотор логов текущего(авторизированого) пользователя'
            ],
        ];
    }

    public function permissUserProfile()
    {
        return [
            [
                'name' => 'v1.user-editProfile',
                'description' => 'Редактирование профиля'
            ],
        ];
    }

    public function permissUserStatistic()
    {
        return [
            [
                'name' => 'v1.user-getStatistic',
                'description' => 'Просмотор статистики пользователей'
            ],
            [
                'name' => 'v1.user-getStatisticCurrentUser',
                'description' => 'Просмотор статистики текущего(авторизированого) пользователя'
            ],
        ];
    }
}