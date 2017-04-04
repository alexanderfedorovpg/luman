<?php

namespace App\Auth\Rbac\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class UserGroup
 * @package \App\Auth\Rbac\Models
 */
class UserGroup extends Model
{
    public $table = 'has_groups';
}