<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

/**
 * Class News
 * @package App
 */
class News extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'publish_date',
        'is_publish',
        'top',
        'title',
        'sub_title',
        'note',
        'video_stream',
        'body',
        'keywords',
        'tags',
        'editor_id',
        'image_main',
        'image_preview',
        'is_online',
    ];


}
