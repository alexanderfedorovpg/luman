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
        'rubric_id',
        'image_preview',
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
        'rubric_id' => 'integer|exists:rubrics,id',
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
}