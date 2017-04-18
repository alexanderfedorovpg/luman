<?php


	namespace App\Models;

	use Illuminate\Database\Eloquent\Model;

	class NewsModerationLog extends Model {

		/**
		 *
		 * @var array
		 */
		protected $table = 'news_moderation_log';

		/**
		 * The attributes that are mass assignable.
		 *
		 * @var array
		 */
		protected $fillable = [
			'news_id',
			'start_date',
			'end_date',
			'is_online',
			'editor_id',
		];

		public static $rules = [

			'start_date' => 'date_format:Y-m-d H:i:s',
			'end_date'   => 'date_format:Y-m-d H:i:s',
			'is_online'  => 'required|boolean',
		];


		public function user() {

			return $this->hasOne( 'User');

		}
		public function news() {

			return $this->hasOne( 'News' );

		}


	}