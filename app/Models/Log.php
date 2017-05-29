<?php

	namespace App\Models;;

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
		protected $table = 'logs';

		protected $fillable = [
			'id',
			'type_event',
			'user_id',
			'description'
		];

        public function user()
        {
            return $this->hasOne(User::class,'id','user_id');
        }
	}
