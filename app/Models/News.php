<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class News
 * @package App
 */
class News extends Model
{

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
        'moderation',
        'theses',
    ];

    public static $rules = [
        'id' => 'integer|exists:news,id',

    ];

    /**
     * Возвращает связь с комментарими
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments()
    {
        return $this->hasMany(NewsComments::class);
    }

    /**
     * Возвращает связь связонных новостей
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function newsRelated()
    {
        return $this->belongsToMany(NewsRelated::class, 'news_related', 'news_id_1', 'news_id_2');
    }

    /**
     * Возвращает редактора статьи
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function editor()
    {
        return $this->hasOne(User::class, 'id', 'editor_id');
    }

    /**
     * Главное изображение
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function imageMain()
    {
        return $this->hasOne(CdnFile::class, 'id', 'image_main');
    }

    /**
     * Превью
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function imagePreview()
    {
        return $this->hasOne(CdnFile::class, 'id', 'image_preview');
    }

    /**
     * Фильтрация по наличию подстроки в заголовке или тегах
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array $tags
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSubstring($query, array $strings)
    {
        foreach ($strings as $string) {
            $query->where(function ($query) use ($string) {
                $query->orWhere('title', 'like', "%{$string}%")
                    ->orWhere('tags', 'like', "%{$string}%");
            });
        }
        return $query;
    }

    /**
     * Фильтрация по тегам
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array $tags
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
     * @param bool $isExist
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

    /**
     * Чат
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function chat()
    {
        return $this->hasOne(NewsChat::class);
    }

    /**
     * Фильтрация по наличию опубликованости
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param bool $published
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeModerationThisEditor($query, $editor_id, $moderation = true, $delete = 0, $is_publish = 0)
    {
        return $query->where(['editor_id' =>$editor_id,'moderation' =>$moderation,'delete' =>$delete,'is_publish' =>$is_publish]);

    }

    /**
     * @param $query
     * @return mixed
     */
    public function scopeModerationMode($query)
    {
        $query->where('moderation', '=', 1);

        return $query;
    }

    /**
     * Инфошум
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeInfoNoise($query, $infoNoise = true)
    {
        if ($infoNoise) {
            return $query->where('top', '<=', 3);
        } else {
            return $query->where('top', '>', 3);
        }
    }

}
