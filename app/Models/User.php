<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use App\Auth\Authenticatable;
use App\Auth\Rbac\Rbac;
use App\Auth\Rbac\Models\Group;

class User extends Model implements AuthenticatableContract
{
    use Authenticatable, Rbac;

    public static $allow_all_function = [
        'v1.group-index',
        'v1.group-show',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'login',
        'need_change_password',
        'enabled',
        'avatar_id'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'api_token',
    ];

    public static $rules = [
        'firstname' => 'required|max:255',
        'lastname' => 'max:255',
        'login' => 'required|max:255|unique:users,login',
        'email' => 'required|email|unique:users,email',
        'need_change_password' => 'boolean',
        'enabled' => 'boolean',
        'avatar_id' => 'integer|exists:cdn_files,id'
    ];

    /**
     * Создает нового пользователя
     *
     * @return \App\User
     */
    public static function createNew(array $fields)
    {
        $user = new static($fields);
        $user->setAuthPassword($fields['password']);
        $user->save();
        return $user;
    }

    /**
     * Возвращает коллекцию групп к которым пренадлежит пользователь
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class, 'has_groups', 'user_id', 'group_id');
    }

    /**
     * Проверяет, являится ли пользователь администратором
     *
     * @return bool
     */
    public function isAdmin()
    {
        $adminGroup = $this->groups()
            ->where('group_id', Group::ID_ADMINS_GROUP)
            ->enabled()
            ->first();

        return (bool)$adminGroup;
    }

    /**
     * Проверяет, имеет ли пользователь соответствующии права
     *
     * @param string $permissionName Название разрешения
     * @return bool
     */
    public function hasPrimission($permissionName)
    {
        if ($this->isAdmin()) {
            return true;
        }

        if (in_array($permissionName, self::$allow_all_function)){
            return true;
        }
        foreach ($this->groups as $group) {
            $permission = $group->permissions()
                ->where('name', $permissionName)
                ->first();
            if ($permission) {
                return true;
            }
        }

        return false;

    }

    /**
     * Аватар пользоватля
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function avatar()
    {
        return $this->hasOne(CdnFile::class, 'avatar_id');
    }
}
