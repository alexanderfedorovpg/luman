<?php

namespace App\Console\Commands\Rbac;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Auth\Rbac\Models\UserGroup;
use App\Auth\Rbac\Models\Group;

class Administarator extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'rbac:admin';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rbac:admin {action}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Управление администраторами';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {
        $action = $this->argument('action');
        switch ($action) {
            case 'create':
                $this->createAdmin();
                break;
        }
    }

    /**
     * Создает нового пользователя
     *
     * @return void
     */
    public function createAdmin()
    {
        $email = '';
        while (true) {
            $email = trim($this->ask('Email*'));
            if (User::where(['email' => $email])->first()) {
                $this->error("The email is already in use!");
                continue;
            }
            break;
        }

        $login = '';
        while (true) {
            $login = trim($this->ask('Login*'));
            if (User::where(['login' => $login])->first()) {
                $this->error("The login is already in use!");
                continue;
            }
            break;
        }


    }

}