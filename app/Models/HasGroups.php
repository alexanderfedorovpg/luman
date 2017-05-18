<?php

namespace App\Models;;

use Illuminate\Database\Eloquent\Model;

/**
 * Class HasGroups
 * @package App
 *
 * @property  integer user_id
 * @property  integer group_id
 */
class HasGroups extends Model
{

    /**
     * Определяем таблицу, с которой связана эта модель.
     *
     * @var array
     */
    protected $table = 'has_groups';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'group_id',
    ];
    protected $hidden = ['pivot'];
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