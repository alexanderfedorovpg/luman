<?php

	namespace App;

	use Illuminate\Database\Eloquent\Model;

	/**
	 *
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
			'id',
			'type_event',
			'user_id',
			'description'
		];


	}
