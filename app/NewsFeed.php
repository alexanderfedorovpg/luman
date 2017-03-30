<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NewsFeed extends Model
{

	/**
     * Определяем таблицу, с которой связана эта модель.
     *
     * @var array
     */
    protected $table = 'news_feed';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'header',
        'body',
        'type',
        'period',
        'anons_create_dt',
        'anons_event_dt',
        'source_feed',
    ];

}