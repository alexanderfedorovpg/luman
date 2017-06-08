<?php

namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;
use App\Models\CdnFile;
use App\Models\News;
use App\Models\TvProgram;
use App\Models\Rubrics;

class AirRecordTransformer extends Transformer
{
    public function transform($record)
    {
        $transform = $record;
        if ($record['video_stream']) {
            $transform['video'] = [
                'url' => CdnFile::where('id', '=', $record['video_stream'])->pluck('url')->first(),
                'id' => $record['video_stream'],
                'duration' => $record['video_stream_duration'],
                'preview' => CdnFile::where('id', '=', $record['video_stream_preview'])->pluck('url')->first(),
                'preview_id' => $record['video_stream_preview'],
            ];
        } else {
            $transform['video'] = null;
        }
        unset($transform["video_stream_preview"]);
        $transform['rubrics'] = News::find($record['id'])->rubrics()->orderBy('name')->get(['rubrics.id','rubrics.name'])->toArray();
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