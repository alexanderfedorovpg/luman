<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

trait LogFilter
{
    public function filter(Request $request, Builder $builder)
    {
        $this->validate($request, [
            'orderBy' => 'in:id,date,type_event',
            'orderType' => 'in:asc,desc',
            'userId' => 'integer|exists:users,id',
        ]);

        $orderBy = $request->input('orderBy');
        if ($orderBy) {
            $orderType = $request->input('orderType');
            $builder->orderBy($orderBy, $orderType ? $orderType : 'desc');
        }

        return $builder;
    }
}