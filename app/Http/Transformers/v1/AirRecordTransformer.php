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
        $transform['program'] = $this->transformProgram($record['program_id']);
        $transform['rubric'] = $this->transformRubric($record['rubric_id']);
        $transform['is_full_video'] = (bool) $record['is_full_video'];
        unset($transform['program_id'], $transform['rubric_id']);
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