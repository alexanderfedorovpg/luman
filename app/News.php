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

    /**
     * Возвращает связь с комментарими
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments()
    {
        return $this->hasMany('App\NewsComments');
    }

    /**
     * Возвращает связь связонных новостей
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function newsRelated()
    {
        return $this->belongsToMany('App\News', 'news_related', 'news_id_1', 'news_id_2');
    }

    /**
     * Фильтрация по наличию подстроки в заголовке или тегах
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @oaram array $tags
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSubstring($query, array $strings)
    {
        foreach ($strings as $string) {
            $query->orWhere('title', 'like', "%{$string}%")
                ->orWhere('tags', 'like', "%{$string}%");
        }
        return $query;
    }

    /**
     * Фильтрация по тегам
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @oaram array $tags
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeTags($query, array $tags)
    {
        foreach ($tags as $tag) {
            $query->where('tags', 'like', "%{$tag}%");
        }
        return $query;
    }

    /**
     * Фильтрация по наличию или отсутсвию видеокассета
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @oaram bool $isExxist
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeExistVideo($query, $isExist)
    {
        if ($isExist) {
            $query->where('video_stream', '!=', '');
        } else {
            $query->Where('video_stream', '=', '');
        }
        return $query;
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
