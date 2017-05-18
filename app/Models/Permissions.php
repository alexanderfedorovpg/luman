<?php

namespace App\Models;;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Peremissions
 * @package App\Models
 */
class Permissions extends Model
{

    /**
     * Определяем таблицу, с которой связана эта модель.
     *
     * @var array
     */
    protected $table = 'permissions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
    ];

    protected $hidden = ['pivot'];

}