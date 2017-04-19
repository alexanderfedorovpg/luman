<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class NewsRelated
 * @package App
 */
class NewsComments extends Model
{

    /**
     * Возвращает связь с автором статьи
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function editor()
    {
        return $this->hasOne('App\User', 'id', 'editor_id');
    }

    /**
     * Фильтрация по наличию опубликованости
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param bool $published
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query, $published = true)
    {
        return $query->where('is_publish', '=', $published);
    }
}