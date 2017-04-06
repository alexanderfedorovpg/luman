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
                'name' => 'v1.user-view',
                'description' => 'Просмотор пользователя',
            ],
        ];
    }

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
            ],
        ];
    }

}