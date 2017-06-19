<?php

namespace App\Console\Commands\RecoverTools;

/**
 * Created by PhpStorm.
 * User: shakinm@gmail.com
 * Date: 19.06.2017
 * Time: 9:01
 */


use \Illuminate\Console\Command;
use App\Models\News;

class RecoverTools extends Command
{

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'rtools:function';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rtools:function {source}  ';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Вспомогательные скрипты';

    protected $_allow_source = ['replace_in_news_body'];

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {


        if (!in_array($this->argument('source'),$this->_allow_source)) {
            return;
        }



        call_user_func([__CLASS__,$this->argument('source')]);

    }

    public function replace_in_news_body( )
    {
        $find = $this->ask('Найти?');
        $replace = $this->ask('Заменить на?');
        $news = News::chunk(100, function ($news) use ($find, $replace) {

            foreach ($news as $n) {
                $n->body = str_replace($find, $replace,$n->body,$count);
                dump($count);
             //   $n->save();
            }
        });
    }


}