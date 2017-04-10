<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NewsFeed extends Model
{

    /**
     * Определяем таблицу, с которой связана эта модель.
     *
     * @var array
     */
    protected $table = 'news_feed';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'header',
        'body',
        'period',
        'anons_create_dt',
        'anons_event_dt',
        'source_feed',
        'tags',
        'hidden',
    ];

    /**
     * @param $query
     * @param array $strings
     * @return mixed
     */
    public function scopeSubstring($query, array $strings)
    {
        foreach ($strings as $string) {
            $query->where(function ($query) use ($string) {
                $query->orWhere('header', 'like', "%{$string}%");
            });
        }
        return $query;
    }


    public function scopeInformAgency($query, $string)
    {

        $query->orWhere('source_feed', 'like', "%{$string}%");

        return $query;
    }

    /**
     * @param $query
     * @param array $tags
     * @return mixed
     */
    public function scopeTags($query, array $tags)
    {
        foreach ($tags as $tag) {
            $query->where('tags', 'like', "%{$tag}%");
        }
        return $query;
    }


    /**
     * @param $query
     * @param $viewMode
     * @return mixed
     */
    public function scopeViewMode($query, $viewMode = 0)
    {

        $query->where('hidden', '=', $viewMode);

        return $query;
    }

    public function scopeDateFilter($query, $fromDate, $toDate)
    {
        if ($fromDate && !$toDate) {
            $query->where('anons_create_dt', '>=', $fromDate);
        }
        if (!$fromDate && $toDate) {
            $query->where('anons_create_dt', '<=', $toDate);
        }
        if ($fromDate && $toDate) {
            $query->where('anons_create_dt', '>', $fromDate);
            $query->where('anons_create_dt', '<=', $toDate);
        }

    }

}