<?php

namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;
use App\Models\TvProgram;
use App\Models\Rubrics;

class AirRecordTransformer extends Transformer
{
    public function transform($record)
    {
        $transform = $record;
        $transform['is_full_video'] = (bool) $record['is_full_video'];
        return $transform;
    }

    public function transformProgram($programId)
    {
        $program = TvProgram::where('id', '=', $programId)->first();
        return [
            'id' => $program->id,
            'name' => $program->name
        ];
    }

    public function transformRubric($rubricId)
    {
        $rubric = Rubrics::where('id', '=', $rubricId)->first();
        return [
            'id' => $rubric->id,
            'name' => $rubric->name
        ];
    }
}