<?php

namespace App\Http\Transformers\v1;

use App\Models\HasGroups;
use App\User;
use App\Http\Transformers\Transformer;
use App\Models\CdnFile;

/**
 * Class GroupsTransformer
 * @package App\Http\Transformers\v1
 */
class GroupsTransformer extends Transformer
{
    /**
     * @param $group
     * @return mixed
     */
    public function transform($group)
    {

        $transform = $group;

        $hasGroup=HasGroups::where('group_id', '=',$group['id'])->get(['user_id'])->toArray();

        $transform['users']=$hasGroup?array_pluck($hasGroup,'user_id'):[];

        return $transform;
    }

    public function transformUsersByGroup($group){
        $transform = $group;

        $hasGroup=HasGroups::where('group_id', '=',$group['id'])->get(['user_id'])->toArray();

        if ($hasGroup) {
            $users = User::find(array_pluck($hasGroup,'user_id'))->all();
            $transform = [];
            foreach ($users as $user) {
                $transform[] = $this->transformUser($user);
            }
        }

        return $transform;
    }

    public function transformUser($user)
    {
        $transform = $user->toArray();

        unset($transform['avatar_id']);
        $avatar = CdnFile::where('id', '=', $user->avatar_id)->get(['url'])->first();
        $transform['avatar_url'] = $avatar ? $avatar->url : null;

        return $transform;
    }
}