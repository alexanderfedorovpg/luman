<?php

namespace App\Http\Transformers\v1;

use App\HasGroups;
use App\User;
use App\Http\Transformers\Transformer;

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

        return $transform;
    }


}