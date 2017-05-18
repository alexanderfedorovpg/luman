<?php

namespace App\Models;;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Groups
 * @package App\Models
 */
class Groups extends Model
{

    /**
     * Определяем таблицу, с которой связана эта модель.
     *
     * @var array
     */
    protected $table = 'groups';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'enable',
    ];

    public function permissions()
    {
        return $this->belongsToMany(Permissions::class, 'groups_permissions', 'group_id', 'permission_id');
    }


}