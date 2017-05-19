<?php

namespace App\Http\Transformers\v1;

use App\Auth\Rbac\Models\Permission;
use App\Models\CdnFile;

use App\Models\Groups;
use App\Models\HasGroups;
use App\Http\Transformers\Transformer;
use App\Models\News;
use App\Models\Permissions;
use Illuminate\Support\Facades\Auth;

/**
 * Class UsersTransformer
 * @package App\Http\Transformers\v1
 */
class UsersTransformer extends Transformer
{
    /**
     * @param $user
     * @return array
     */
    public function transform($user)
    {

        $transform = $user;

        $hasGroup = HasGroups::where('user_id', '=', $user['id'])->get(['group_id'])->toArray();

        $transform['groups'] = $hasGroup ? array_pluck($hasGroup, 'group_id') : [];

        $permissions = [];

        if ( !Auth::user()->isAdmin() ) {
            if ( is_array($hasGroup) ) {
                foreach ($hasGroup as $group) {
                    $group = Groups::find($group['group_id']);
                    foreach ($group->permissions as $permission) {

                        array_push($permissions, $permission->toArray());
                    }


                }
            }
        }
        elseif (Auth::user()->isAdmin()) {
            $permissions  = Permissions::all()->toArray();
        }



        $transform['permissions'] = $permissions;
        unset($transform['avatar_id']);
        if (isset($user['avatar_id'])) {
            $avatar = CdnFile::where('id', '=', $user['avatar_id'])->get(['url'])->first();
            $transform['avatar'] = [
                'id' => $user['avatar_id'],
                'url' => $avatar->url
            ];
        }

        $written = News::where('is_publish', '=', true)->where('editor_id', '=', $user['id'])->count();
        $edited = News::where('editor_id', '=', $user['id'])->count();
        $transform['statistic'] = [
            'written' => $written,
            'edited' => $edited
        ];

        $transform['name'] = $user['firstname'] . ' ' . $user['lastname'];


        return $transform;
    }


}