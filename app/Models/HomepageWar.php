<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Observers\CacheClearObserver;

/**
 * Class HomepageWar
 * @package App\Models
 */
class HomepageWar extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'news_id', 'top',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    public $table = 'homepage_war';


    protected $events = [
        'saved' => CacheClearObserver::class,       
    ];
    
    /**
     * Новость
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function news()
    {
        return $this->hasOne(News::class, 'id', 'news_id');
    }

    /**
     * Категория
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function category()
    {
        return $this->hasONe(HomepageNewsCategory::class, 'id', 'category_id');
    }
}