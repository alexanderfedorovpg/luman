<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rubrics extends Model
{
    protected $hidden = ['pivot'];

    /**
     * Возвращает связь с новостью
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function news()
    {
        return $this->belongsToMany('App\Models\News');
    }
}
