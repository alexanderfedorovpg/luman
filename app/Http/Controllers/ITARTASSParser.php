<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller;

//используемые модели
use App\NewsFeed;

class ITARTASSParser extends Controller {

	public function parse() {

	//ссылка на тот сайт, откуда будем парсить
	//формат - http://login:password@site.com указывается
	//если закрытое подключение, если нет - обычный url
	$url = "http://rtvi:457BcF44@newsml.itar-tass.com/newsml/newsmlgencfg.nsf/onlinenewsdoc?openagent&tape=enl1-online";
	$xml = simplexml_load_file($url);

	//считаем коллекцию
	$count = count($xml->NewsItem);
	for ($i=0; $i < $count; $i++) { 

		//в эту переменную добавляем из форича,
		//ключевые слова
		$keywords = "";

		//определение значений в XML с точками,
		//чтоб их можно было вызвать без ошибок
		$bodyHead = "body.head";
		$bodyContent = "body.content";


		//достаём из XML документа конкретные поля
		//по цепочке
		$CopyrightLine = $xml->NewsItem[$i]->NewsComponent->NewsLines->CopyrightLine;

		$HeadLine = $xml->NewsItem[$i]->NewsComponent->NewsComponent->NewsComponent->NewsLines->HeadLine;

		$DateLine = $xml->NewsItem[$i]->NewsComponent->NewsComponent->NewsComponent->NewsLines->DateLine;

		$FirstCreated = $xml->NewsItem[$i]->NewsManagement->FirstCreated;

		$BodyContent = $xml->NewsItem[$i]->NewsComponent->NewsComponent->NewsComponent->ContentItem->DataContent->nitf->body->$bodyContent->p;

		$item_keywords = $xml->NewsItem[$i]->NewsComponent->NewsComponent->NewsComponent->item_keywords->item_keyword;


		//обходим форичем все массивы, 
		//имеющиеся в XML,
		//на каждую итерацию цикла FOR
		foreach ($item_keywords as $item_keyword) {
			//здесь мы вставляем в переменную тэги
			//запятая и пробел - в таком формате тэги
			$keywords .= "$item_keyword, ";
		}

		$body = "";

		foreach ($BodyContent as $p) {
			
			$body .= "$p ";

		}

			//ставим регулярки на "===" и "---",
			//проверяем, не пустое ли оно
			//(да, и такое бывает)
			if(!preg_match("/(===)+/", $body)) { 
			if(!preg_match("/(---)+/", $body)) {  
			if(!empty($body)) {

			//проверка на уникальность
			if(!NewsFeed::where('crc32', crc32($body))->first()) {
				$feed = new NewsFeed;
				$feed->header = $HeadLine;
				$feed->body = $body;
				$feed->period = "Единая новостная лента";
				$feed->anons_create_dt = date('Y-m-d H:i:s',strtotime($FirstCreated));
				$feed->anons_event_dt = $DateLine;
				$feed->source_feed = "ТАСС";
				$feed->tags = $keywords;
				$feed->crc32 = crc32($body);
				$feed->save();

				//при успешном сохранении в бд
				//выполнить конкретные действия
			}
			}
			}
			}

	}

}
}