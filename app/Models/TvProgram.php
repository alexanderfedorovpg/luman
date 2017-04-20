<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TvProgram extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'enabled'
    ];

    /**
     * Правила
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required|max:255',
    ];

}