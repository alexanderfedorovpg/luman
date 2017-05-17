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
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'news_id',
        'editor_id',
        'publish_date',
        'is_publish',
        'body',
        'image_preview',
        'video_stream',
        'video_stream_preview',
    ];

    /**
     * Правила
     *
     * @var array
     */
    public static $rules = [
        'editor_id' => 'exists:users,id',
        'news_id' => 'required|exists:news,id',
        'body' => 'required',
        'is_publish' => 'boolean',
        'publish_date' => 'date|date_format:Y-m-d H:i:s',
        'image_preview' => 'integer|exists:cdn_files,id',
        'video_stream_preview' => 'integer|exists:cdn_files,id'
    ];

    /**
     * Возвращает связь с автором статьи
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function editor()
    {
        return $this->hasOne(User::class, 'id', 'editor_id');
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