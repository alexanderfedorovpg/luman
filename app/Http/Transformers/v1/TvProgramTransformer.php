<?php


namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;
use App\Models\AirRecord;

class TvProgramTransformer extends Transformer
{
    public function transform($program)
    {
        $transform = $program;

        return $transform;
    }

    public function transformWithRecords($program)
    {
        $transform = $this->transform($program);

        $records = AirRecord::where('program_id', '=', $program['id'])->get()->toArray();
        $transform['records'] = $records;

        return $transform;
    }
}