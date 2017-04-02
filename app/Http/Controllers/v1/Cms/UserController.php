<?php

namespace App\Http\Controllers\v1\Cms;

use Illuminate\Http\Request;
use App\Auth\Rbac\Models\Group;
use App\User;
use Auth;

/**
 * Контроллер управления пользователя
 * @package App\Http\Controllers\v1\Cms
 */
class UserController extends CmsController
{
    /**
     * Добавление пользователя
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {

    }
}