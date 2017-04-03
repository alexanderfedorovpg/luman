<?php

namespace App\Auth\Rbac\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Permission
 * @package \App\Auth\Rbac\Models
 */
class Permission extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description'];

}