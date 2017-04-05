<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use Illuminate\Contracts\Validation\ValidationException;
use App\Auth\Rbac\Models\Permission;


/**
 * Контроллер управления правами
 * @package App\Http\Controllers\v1\Cms
 */
class PermissionController extends CmsController
{

    /**
     * Получение списка всех прав
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $permissions = Permission::all();

        return $this->respond($permissions);
    }
}