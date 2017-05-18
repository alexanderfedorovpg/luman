<?php

namespace App\Http\Transformers\v1;

use App\Auth\Rbac\Models\Permission;
use App\Models\CdnFile;

use App\Models\Groups;
use App\Models\HasGroups;
use App\Http\Transformers\Transformer;
use App\Models\News;
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

        $hasGroup=HasGroups::where('user_id', '=',$user['id'])->get(['group_id'])->toArray();

        $transform['groups']=$hasGroup?array_pluck($hasGroup,'group_id'):[];
        $permissions=[];
        if (isset($hasGroup['group_id'])) {


            foreach ($hasGroup   as $group) {
                $group= Groups::find($group )  ;

                foreach ($group->permissions   as $permission) {

                    $permissions[ ]=$permission->toArray();
                }




            }
        }

        $transform['permissions']=$permissions;
        unset($transform['avatar_id']);
        if ($user['avatar_id']) {
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