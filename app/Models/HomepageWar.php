<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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