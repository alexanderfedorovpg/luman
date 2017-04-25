<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 *
 * @package App
 */
class Counters extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'counters';

    public $timestamps = false;

    public static $_type_counters = [
        1 => 'news',
        2 => 'video',
        3 => 'tv_program',
        4 => 'facebook',
        5 => 'twitter',
    ];

    protected $fillable = [
        'news_id',
        'count_click',
        'count_views',
    ];

    public static $rules = [
        'news_id' => 'integer',
        'count_click' => 'integer',
        'count_views' => 'integer',
    ];


}