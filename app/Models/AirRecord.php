<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AirRecord extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'program_id', 'title', 'video_url'
    ];

    /**
     * Правила
     *
     * @var array
     */
    public static $rules = [
        'program_id' => 'required|integer|exists:tv_programs,id',
        'title' => 'required|max:255',
        'video_url' => 'required'
    ];
}