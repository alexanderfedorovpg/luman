<?php

namespace App\Models;;

use Illuminate\Database\Eloquent\Model;

/**
 * Class GroupsPermissions
 * @package App
 *
 * @property  integer group_id
 * @property  integer permission_id
 */
class GroupsPermissions extends Model
{

    /**
     * Определяем таблицу, с которой связана эта модель.
     *
     * @var array
     */
    protected $table = 'groups_permissions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'group_id',
        'permission_id',
    ];
    protected $hidden = ['pivot'];
    /**
     * @param $query
     * @param array $strings
     * @return mixed
     */


}