<?php

namespace App\Auth\Rbac\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class UserGroup
 * @package \App\Auth\Rbac\Models
 */
class UserGroup extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    public $table = 'has_groups';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'group_id', 'user_id'
    ];
}