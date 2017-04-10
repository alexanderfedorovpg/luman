<?php

	namespace App;

	use Illuminate\Database\Eloquent\Model;

	class Device extends Model {

		protected $table = 'client_device_push_id';

		protected $fillable = [
			'guid',
			'device',
		];
	}