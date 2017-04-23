<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Models\AirRecord;

trait AirRecordFilter
{
    public function filter(Request $request, Builder $builder)
    {
        if ($request->input('fullVideo') === 'true') {
            $builder->fullVideo();
        } elseif ($request->input('fullVideo') === 'false') {
            $builder->fullVideo(false);
        }

        $rubricId = $request->input('rubricId');
        if ($rubricId) {
            $builder->where('rubric_id', '=', $rubricId);
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
            $limit = AirRecord::count();
            $builder->take($limit);
        }

        return $builder;
    }
}