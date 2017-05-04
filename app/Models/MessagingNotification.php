<?php

	namespace App\Models;

	use Illuminate\Database\Eloquent\Model;

	class MessagingNotification extends Model {

		protected $table = 'messaging_notification';

		protected $fillable = [
			'header',
			'body',
			'news_id',
			'for_who',
			'status'
		];

	}