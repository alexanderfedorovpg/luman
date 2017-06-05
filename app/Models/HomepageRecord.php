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
        'record_id', 'top',
    ];


    protected $events = [
        'saved' => CacheClearObserver::class,       
    ];
    
    /**
     * Видеозапись
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function record()
    {
        return $this->hasOne(AirRecord::class, 'id', 'record_id');
    }
}