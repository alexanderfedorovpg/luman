<?php

namespace App\Http\Traits;

use App\Models\NewsComments;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Models\AirRecord;

trait AirRecordFilter
{
    public function filter(Request $request, Builder $builder)
    {
        if ($request->input('fullVideo') === 'true') {
            $builder->whereHas('rubrics', function ($subQuery)   {
                $subQuery->where('rubrics.name', 'like', "%передача%");
            });
        } elseif ($request->input('fullVideo') === 'false') {
            $builder->whereHas('rubrics', function ($subQuery)   {
                $subQuery->where('rubrics.name', 'like', "%из эфира%");
            });;
        }

        $constructor = $request->input('constructor');
        if ($constructor === 'true') {
            $builder->constructor(1)->NotInHomePage();

        } elseif ($constructor === 'false') {
            $builder->constructor(0);
        }

        $programId = $request->input('programId');
        if ($programId) {
            $builder->where('program_id', '=', $programId);
        }

        $searchString = $request->input('search');
        if ($searchString) {
            $builder->searchText($searchString);
        }

        $offset = $request->input('offset');
        if ($offset !== null) {
            $builder->skip(abs((int) $offset));
        }

        $limit = $request->input('limit');
        if ($limit !== null) {
            $builder->take(abs((int) $limit));
        }

        if ($offset !== null && $limit === null) {
            $limit = NewsComments::count();
            $builder->take($limit);
        }

        $builder->orderBy('id', 'DESC');

        return $builder;
    }
}