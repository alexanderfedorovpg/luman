<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CdnFile extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'external_id', 'url', 'content_type'
    ];

}