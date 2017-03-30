<?php

	namespace App;

	use Illuminate\Database\Eloquent\Model;

	/**
	 * Class News
	 * @package App
	 */
	class Log extends Model
	{

		/**
		 * The attributes that are mass assignable.
		 *
		 * @var array
		 */
		protected $fillable = [
			'type_event',
			'user_id',
			'description'
		];


	}
