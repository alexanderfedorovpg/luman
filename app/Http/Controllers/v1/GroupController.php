<?php

namespace App\Http\Controllers\v1;


use App\Auth\Rbac\Models\Permission;
use App\Http\Transformers\v1\GroupsTransformer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Contracts\Validation\ValidationException;
use App\Auth\Rbac\Models\Group;
use App\User;
use Mockery\Exception;


/**
 * Контроллер управления группами
 * @package App\Http\Controllers\v1\Cms
 */
class GroupController extends CmsController
{

    /**
     * @var GroupsTransformer
     */
    protected $groupsTransformer;

    /**
     * GroupController constructor.
     * @param GroupsTransformer $groupsTransformer
     */
    public function __construct(GroupsTransformer  $groupsTransformer)
    {
        parent::__construct();
        $this->groupsTransformer = $groupsTransformer;
    }

    /**
     * Получение всех груп
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $groups = Group::all();

        return $this->respond($this->groupsTransformer->transformCollection($groups->toArray()));
    }

    /**
     * Получение группы по ID
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $group = Group::findOrFail($id);
            if ($group) {
                return $this->respond($this->groupsTransformer->transform($group->toArray()));
            }
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('Group is not found');
        } catch (\Exception $e) {
            $this->respondFail500x();
        }


    }

    /**
     * Добавление группы
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        try {
            $this->validate($request, Group::$rules);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->getMessage());
        }

        $group = new Group($request->all());
        if ($group->save()) {
            return $this->respondCreated(['success' => true]);
        }

        return $this->respondFail500x();
    }

    /**
     * Редактирование группы
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $group = Group::find($id);
        if (!$group) {
            return $this->respondNotFound('User is not found');
        }

        try {
            $this->validate($request, Group::$rules);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->getMessage());
        }

        return $this->respondCreated(['success' => $group->update($request->all())]);
    }

    /**
     * Удаление группы
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $group = Group::find($id);
        if ($group) {
            return $this->respond(['success' => $group->delete()]);
        }

        return $this->respondNotFound('Group not found');
    }

    /**
     * Привязывает пользователя к группе
     *
     * @param int $groupId ID группы
     * @return \Illuminate\Http\JsonResponse
     */
    public function bindUser($groupId, $userId)
    {
        try {
            $group = Group::find($groupId);
            if (!$group) {
                return $this->respondNotFound('Group not found');
            }

            $user = User::find($userId);
            if (!$user) {
                return $this->respondNotFound('User not found');
            }

            if ($group->isBindUser($user)) {
                return $this->respondFail403x('The user already associated with this group');
            }

            return $this->respond(['success' => $group->bindUser($user)]);
        } catch (\Exception $e) {
            $this->respondFail500x($e);
        }

    }

    /**
     * Удаляет пользователя из группы
     *
     * @param int $groupId ID группы
     * @param int $userId ID пользователя
     * @return \Illuminate\Http\JsonResponse
     */
    public function unbindUser($groupId, $userId)
    {
        try {
            $group = Group::find($groupId);
            if (!$group) {
                return $this->respondNotFound('Group not found');
            }

            $user = User::find($userId);
            if (!$user) {
                return $this->respondNotFound('User not found');
            }

            return $this->respond(['success' => $group->unbindUser($user)]);
        } catch (\Exception $e) {
            $this->respondFail500x($e);
        }
    }

    /**
     * Назначает права группе
     *
     * @param \Illuminate\Http\Request $request
     * @param int $groupId ID группы
     * @return \Illuminate\Http\JsonResponse
     */
    public function addPermiss(Request $request, $groupId)
    {

        $group = Group::find($groupId);
        if (!$group) {
            return $this->respondNotFound('Group not found');
        }

        if ($groupId === Group::ID_ADMINS_GROUP) {
            return $this->respond(['success' => true]);
        }

        $permissions = $request->input('permissions');

        try {
            $this->validate($request, [
                'permissions' => 'required|array|exists:permissions,id',
            ]);

            $group->addPermissions(Permission::findMany($permissions));
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->getMessage());

        }

        return $this->respond(['success' => true]);
    }

    /**
     * Удаляет права у группы
     *
     * @param \Illuminate\Http\Request $request
     * @param int $groupId ID группы
     * @param int $permissId ID доступа
     * @return \Illuminate\Http\JsonResponse
     */
    public function removePermiss($groupId, $permissId)
    {
        $group = Group::find($groupId);
        if (!$group) {
            return $this->respondNotFound('Group not found');
        }

        return $this->respond(['success' => $group->removePermissions($permissId)]);
    }

    public function UsersByGroup($id) {
        try {
            $group = Group::findOrFail($id);
            if ($group) {
                return $this->respond($this->groupsTransformer->transformUsersByGroup($group->toArray()));
            }
        } catch (ModelNotFoundException $e) {
            return $this->respondNotFound('Group is not found');
        } catch (\Exception $e) {
            $this->respondFail500x();
        }
    }
}