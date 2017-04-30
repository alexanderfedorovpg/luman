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
        'program_id',
        'title',
        'video_url',
        'is_full_video',
        'image_preview',
        'theses',
        'publish_date',
        'is_published',
    ];

    /**
     * Правила
     *
     * @var array
     */
    public static $rules = [
        'program_id' => 'required|integer|exists:tv_programs,id',
        'title' => 'required|max:255',
        'video_url' => 'required',
        'is_full_video' => 'boolean',
        'publish_date' => 'date|date_format:Y-m-d H:i:s',
        'theses' => 'string',
        'is_published' => 'boolean',
        'image_preview' => 'string',
    ];

    /**
     * Фильтрация по Выпуск/Из эфира
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param bool $isFullVideo
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFullVideo($query, $isFullVideo = true)
    {
        return $query->where('is_full_video', '=', $isFullVideo);
    }

    /**
     * Фильтрация по наличмю посдстраки в заголоках
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param bool $isFullVideo
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearchText($query, $text)
    {
        return $query->where('title', 'like', "%{$text}%");
    }

    /**
     * Save the model to the database.
     *
     * @param  array  $options
     * @return bool
     */
    public function save(array $options = [])
    {
        if (!$this->publish_date) {
            $this->publish_date = date('Y-m-d H:i:s');
        }

        return parent::save($options);
    }

    /**
     * Публикует эфирные записи
     *
     * @param array $recordIds
     * @return integer
     */
    public static function publish(array $recordIds = [])
    {

        if (!$recordIds) {
            return static::query()->update(['is_published' => true]);
        }

        return static::whereIn('id', $recordIds)->update(['is_published' => true]);
    }

    /**
     * Фильрация по опубликовоности
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query,$isPublished = true)
    {
        return $query->where('is_published', '=', $isPublished);
    }

}