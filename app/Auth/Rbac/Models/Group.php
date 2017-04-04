<?php

namespace App\Auth\Rbac\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Group
 * @package \App\Auth\Rbac\Models
 */
class Group extends Model
{
    /**
     * ID администраторов
     */
    const ID_ADMINS_GROUP = 1;

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        static::deleting(function (Group $model) {
            //Отмена удаления
            if (static::ID_ADMINS_GROUP === $model->id) {
                return false;
            }
        });

    }

    /**
     * Возвращает группу администраторов
     *
     * @return  \App\Auth\Rbac\Models\Group
     */
    public static function getAdminGroup()
    {
        return static::find(self::ID_ADMINS_GROUP)->enabled()->first();
    }

    /**
     * Возвращает разрешения которые есть у группы
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'groups_permissions', 'group_id', 'permission_id');
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeEnabled($query)
    {
        return $query->where('enabled', '=', true);
    }

    /**
     * Пользователи группы
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(\App\User::class, 'has_groups');
    }


}