<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Observers\CacheClearObserver;

/**
 * Class HomepageRecord
 * @package App\Models
 */
class HomepageRecord extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'news_id', 'category_id', 'top',
    ];


    protected $events = [
        'created' => CacheClearObserver::class,
    ];

    /**
     * Категория
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function category()
    {
        return $this->hasONe(HomepageNewsCategory::class, 'id', 'category_id');
    }

    /**
     * Новость
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function news()
    {
        return $this->hasOne(News::class, 'id', 'news_id');
    }
}