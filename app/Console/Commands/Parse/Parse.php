<?php

namespace App\Console\Commands\Parse;

/**
 * Created by PhpStorm.
 * User: shakinm@gmail.com
 * Date: 03.05.2017
 * Time: 9:01
 */


use \Illuminate\Console\Command;
use App\Models\NewsFeed;
use Mockery\CountValidator\Exception;
use Carbon\Carbon;

class Parse extends Command
{

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'parse:upload';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parse:upload {source}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Загрузить новости из источника';

    protected $_allow_source = ['tass'];

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $source = $this->parse($this->argument('source'));
        if (!isset($_allow_source[$source])) {
            return;
        }
        $this->parse();

    }

    protected function get_http_response_code($opts, $url)
    {
        stream_context_set_default($opts);
        $headers = get_headers($url);
        return $headers;
    }

    public function parse()
    {
        try {


            echo "Запуск обработки данных из источника ТАСС \n";

            $opts = array(
                'http' => array(
                    'method' => "GET",
                    'header' => "Authorization: Basic " .
                        base64_encode(config('parser.tass.login')
                            . ':'
                            . config('parser.tass.password'))
                )
            );

            $context = stream_context_create($opts);

            if ($this->get_http_response_code($opts, config('parser.tass.url_online_primary')) != "200") {
                $file = file_get_contents(config('parser.tass.url_online_primary'), false, $context);
            } elseif ($this->get_http_response_code($opts, config('parser.tass.url_online_secondary')) != "200") {
                $file = file_get_contents(config('parser.tass.url_online_secondary'), false, $context);
            } else {
                throw new \Exception("Ошибка получения данных из источников ТАСС");
            }


            $xml = simplexml_load_string($file);
            if (!isset($xml->channel)) {
                throw new Exception("Ошибка загрузки файла источника ТАСС \n");
            }

            $chanel = $xml->channel;
            $i = 0;
            $u = 0;
            $format = "D, d M Y H:i:s e";
            foreach ($chanel->item as $item) {
                $u++;
                $crc32 = crc32($item->title . $item->pubDate);

                $tags = "";
                foreach ($item->category as $category) {
                    $tags[] = $category;
                }
                $tags = implode(",", $tags);

                $newsFeed = NewsFeed::firstOrNew(
                    ['crc32' => $crc32],
                    [
                        'header' => $item->title,
                        'body' => $item->description,
                        'period' => $chanel->title,
                        'anons_create_dt' => Carbon::createFromFormat($format, $chanel->pubDate)->toDateTimeString(),
                        'anons_event_dt' => Carbon::createFromFormat($format, $item->pubDate)->toDateTimeString(),
                        'source_feed' => 'ТАСС',
                        'crc32' => $crc32,
                        'tags' => $tags,
                        'hidden' => 0,
                    ]
                );
                $newsFeed->save();
                if (!$newsFeed->exists) {
                    $i++;
                }

            }
            echo "Получено {$u} записей из них загружено новых {$i}. \n";

        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }
}