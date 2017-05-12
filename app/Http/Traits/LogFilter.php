<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Log;
use DB;

trait LogFilter
{
    public function filter(Request $request, Builder $builder)
    {
        $this->validate($request, [
            'orderBy' => 'in:id,date,time,type_event,ip,host,session',
            'orderType' => 'in:asc,desc',
            'userId' => 'integer|exists:users,id',
            'offset' => 'integer|min:0',
            'limit' => 'integer|min:0',
        ]);

        $orderBy = $request->input('orderBy');
        if ($orderBy) {
            $orderType = $request->input('orderType');
            if ($orderBy === 'date') {
                $orderBy = "DATE(updated_at)";
            }
            if ($orderBy === 'time') {
                $orderBy = "TIME(updated_at)";
            }

            $builder->orderBy(DB::raw($orderBy), $orderType ? $orderType : 'desc');
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