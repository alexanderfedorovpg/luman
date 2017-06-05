<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Observers\CacheClearObserver;

/**
 * Class HomepageOption
 * @package \App\Models
 */
class HomepageOption extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'value'
    ];


    protected $events = [
        'saved' => CacheClearObserver::class,       
    ];
    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'name';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}