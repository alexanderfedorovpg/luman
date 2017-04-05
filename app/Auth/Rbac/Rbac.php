<?php

namespace App\Auth\Rbac;

use App\Auth\Rbac\Models\Group;

trait Rbac
{
    /**
     * Проверяет разрешение да доступ к маршруту.
     *
     * @param string $controller Контроллер
     * @param string $action Экшен
     * @return bool
     */
    public function canRoute($controller, $action)
    {
        $controller = mb_ereg_replace('\\\\', '.', mb_strtolower($controller));
        $controller = mb_ereg_replace('(^.*controllers\.)|(controller$)', '', $controller);
        $permissionName = $controller . '-' . $action;

        return $this->can($permissionName);
    }

    /**
     * Проверяет разрешение на выполнение действия
     *
     * @return bool
     */
    public function can($permissionName)
    {
        return $this->hasPrimission($permissionName);
    }

}