<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Log;

trait LogFilter
{
    public function filter(Request $request, Builder $builder)
    {
        $this->validate($request, [
            'orderBy' => 'in:id,date,type_event',
            'orderType' => 'in:asc,desc',
            'userId' => 'integer|exists:users,id',
            'offset' => 'integer|min:0',
            'limit' => 'integer|min:0',
        ]);

        $orderBy = $request->input('orderBy');
        if ($orderBy) {
            $orderType = $request->input('orderType');
            $builder->orderBy($orderBy, $orderType ? $orderType : 'desc');
        }

        $offset = $request->input('offset');
        if ($offset !== null) {
            $builder->skip($offset);
        }

        $limit = $request->input('limit');
        if ($limit !== null) {
            $builder->take($limit);
        }

        if ($offset !== null && $limit === null) {
            $limit = Log::count();
            $builder->take($limit);
        }

        return $builder;
    }
}