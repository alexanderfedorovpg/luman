<?php

	namespace App\Models;

	use Illuminate\Database\Eloquent\Model;

	/**
	 *
	 * @package App
	 */
	class Settings extends Model
	{

		/**
		 * The attributes that are mass assignable.
		 *
		 * @var array
		 */
		protected $table = 'settings';

		protected $fillable = [
			'id',
			'name',
			'value',
			'description',
            'type'
		];


	}
