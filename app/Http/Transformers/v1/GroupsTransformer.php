<?php

namespace App\Http\Transformers\v1;

use App\HasGroups;
use App\User;
use App\Http\Transformers\Transformer;

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
            $transform = User::find(array_pluck($hasGroup,'user_id'))->toArray();
        }

        return $transform;
    }
}