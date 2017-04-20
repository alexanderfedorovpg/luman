<?php

namespace App\Auth\Rbac\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use App\Models\User;
use App\Auth\Rbac\Models\Permission;

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
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'enabled'
    ];

    /**
     * Правила
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required|max:255',
        'enabled' => 'required|boolean'
    ];

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
        return $this->belongsToMany(User::class, 'has_groups');
    }


    /**
     * Проверят привязан ли пользователь к группе
     *
     * @param \App\User Пользователь
     * @return bool
     */
    public function isBindUser(User $user)
    {
        return (bool)$this->users()
            ->where(['user_id' => $user->id])
            ->first();
    }

    /**
     * Привязывает пользователя к группе
     *
     * @param \App\User Пользователь
     * @return bool
     */
    public function bindUser(User $user)
    {
        $userGroup = new UserGroup([
            'group_id' => $this->id,
            'user_id' => $user->id
        ]);

        return $userGroup->save();
    }

    /**
     * Отвязывает пользователя от группы
     *
     * @param \App\User Пользователь
     * @return bool
     */
    public function unbindUser(User $user)
    {
        $userGroup = UserGroup::where([
            'group_id' => $this->id,
            'user_id' => $user->id
        ])->first();

        if ($userGroup) {
            return $userGroup->delete();
        }

        return false;
    }

    /**
     * Добовляет новые доступы группе
     *
     * @param \Illuminate\Database\Eloquent\Collection $oermissions
     * @return void
     */
    public function addPermissions(Collection $oermissions)
    {
        $ids = [];
        foreach ($oermissions as $permission) {
            if ($permission instanceof Permission) {
                $ids[] = $permission->id;
            }
        }

        $this->permissions()->attach($ids);
    }

    /**
     * Удаляет доступы группе
     *
     * @param array $oermissions
     * @return bool
     */
    public function removePermissions(array $oermissions)
    {
        return $this->permissions()->whereIn('id', $oermissions)->delete();
    }


}