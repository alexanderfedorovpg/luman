<?php

namespace App\Console;


use App\Console\Commands\Parse\Parse;
use App\Console\Commands\RecoverTools\RecoverTools;
use App\Console\Commands\Rbac\Administarator;
use App\Console\Commands\Rbac\Permission;
use Illuminate\Console\Scheduling\Schedule;
use Laravel\Lumen\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Administarator::class,
        Permission::class,
        Parse::class,
        RecoverTools::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        //
    }
}
