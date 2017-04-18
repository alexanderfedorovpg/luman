<?php

	namespace App\Models;

	use Illuminate\Database\Eloquent\Model;

	/**
	 *
	 * @package App
	 */
	class NewsCounters extends Model {

		/**
		 * The attributes that are mass assignable.
		 *
		 * @var array
		 */
		protected $table = 'news_counters';

		protected $fillable = [
			'news_id',
			'count_click',
			'count_views',
		];

		public static $rules = [
			'news_id'     => 'integer',
			'count_click' => 'integer',
			'count_views' => 'integer',
		];



	}