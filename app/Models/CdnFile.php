<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CdnFile extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'external_id',
        'url',
        'content_type',
        'object_source',
        'object_author',
        'object_name'
    ];

}