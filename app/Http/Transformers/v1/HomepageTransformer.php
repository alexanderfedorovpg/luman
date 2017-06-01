<?php

namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;
use App\Models\CdnFile;
use Illuminate\Database\Eloquent\Collection;

class HomepageTransformer extends Transformer
{

    /**
     * @param array $homePage
     * @return array
     */
    public function transform($homePage)
    {
        $transform = [];
        $transform['news'] = $this->transformNews($homePage['news']);
        $transform['info_noise'] = $this->transformInfoNoise($homePage['info_noise']);
        $transform['from_air'] = $this->tranformRecords($homePage['from_air']);
        $transform['war'] = $this->transformWar($homePage['war']);
        $transform['options'] = $this->transformOptions($homePage['options']);

        return $transform;
    }

    /**
     * Новости
     *
     * @param \Illuminate\Database\Eloquent\Collection $news
     * @return array
     */
    public function transformNews(Collection $newsCollection)
    {
        $transform = [];
        foreach ($newsCollection as $news) {
            $arrNews = $news->news->toArray();

            if ($arrNews['video_stream']) {
                $preview=CdnFile::where('id', '=', $arrNews['video_stream_preview'])->first();
                $arrNews['video_stream'] = [
                    'url' => CdnFile::where('id', '=', $arrNews['video_stream'])->pluck('url')->first(),
                    'id' =>  $arrNews['video_stream'],
                    'duration' => $arrNews['video_stream_duration'],
                    'preview' => $preview['url'],
                    'preview_id' => $arrNews['video_stream_preview'],
                    'preview_source' => $preview['object_source'],
                    'preview_author' => $preview['object_source'],
                    'preview_name' => $preview['object_source'],
                ];
            } else {
                $arrNews['video_stream'] = null;
            }


            if ($arrNews['image_main']) {
                $imageMain = CdnFile::where('id', '=', $arrNews['image_main'])->select()->first();
                $arrNews['image_main'] = [
                    'url' => $imageMain->url,
                    'id' => $imageMain->id,
                    'object_source' => $imageMain->object_source,
                    'object_author' => $imageMain->object_source,
                    'object_name' => $imageMain->object_source,
                ];
            } else {
                $arrNews['image_main'] = null;
            }


            if ($arrNews['image_preview']) {
                $imagePreview = CdnFile::where('id', '=', $arrNews['image_preview'])->select()->first();
                $arrNews['image_preview'] = [
                    'url' => $imagePreview->url,
                    'id' => $imagePreview->id,
                    'object_source' => $imagePreview->object_source,
                    'object_author' => $imagePreview->object_source,
                    'object_name' => $imagePreview->object_source,
                ];
            } else {
                $arrNews['image_preview'] = null;
            }
            $transform[] = [
                'category' => $news->category,
                'data' => $arrNews,
                'top' => $news->top,
            ];
        }
        return $transform;
    }

    /**
     * Информационный шум
     *
     * @param \Illuminate\Database\Eloquent\Collection $infoNoises
     * @return array
     */
    public function transformInfoNoise(Collection $infoNoises)
    {
        $transform = [];
        foreach ($infoNoises as $infoNoise) {
            $news = $infoNoise->news->toArray();
            if ($news['video_stream']) {
                $preview=CdnFile::where('id', '=', ['video_stream_preview'])->first();
                $news['video_stream'] = [
                    'url' => CdnFile::where('id', '=', $news['video_stream'])->pluck('url')->first(),
                    'id' =>  $news['video_stream'],
                    'duration' => $news['video_stream_duration'],
                    'preview' => $preview['url'],
                    'preview_id' => $news['video_stream_preview'],
                    'preview_source' => $preview['object_source'],
                    'preview_author' => $preview['object_source'],
                    'preview_name' => $preview['object_source'],
                ];
            } else {
                $news['video_stream'] = null;
            }


            if ($news['image_main']) {
                $imageMain = CdnFile::where('id', '=', $news['image_main'])->select()->first();
                $news['image_main'] = [
                    'url' => $imageMain->url,
                    'id' => $imageMain->id,
                    'object_source' => $imageMain->object_source,
                    'object_author' => $imageMain->object_source,
                    'object_name' => $imageMain->object_source,
                ];
            } else {
                $news['image_main'] = null;
            }


            if ($news['image_preview']) {
                $imagePreview = CdnFile::where('id', '=', $news['image_preview'])->select()->first();
                $news['image_preview'] = [
                    'url' => $imagePreview->url,
                    'id' => $imagePreview->id,
                    'object_source' => $imagePreview->object_source,
                    'object_author' => $imagePreview->object_source,
                    'object_name' => $imagePreview->object_source,
                ];
            } else {
                $news['image_preview'] = null;
            }
            $transform[] = [
                'data' => $news,
                'top' => $infoNoise->top,
            ];
        }

        return $transform;
    }

    public function transformWar(Collection $wars)
    {
        $transform = [];
        foreach ($wars as $war) {
            $news = $war->news->toArray();
            if ($news['video_stream']) {
                $preview=CdnFile::where('id', '=',  ['video_stream_preview'])->first();
                $news['video_stream'] = [
                    'url' => CdnFile::where('id', '=', $news['video_stream'])->pluck('url')->first(),
                    'id' =>  $news['video_stream'],
                    'duration' => $news['video_stream_duration'],
                    'preview' => $preview['url'],
                    'preview_id' => $news['video_stream_preview'],
                    'preview_source' => $preview['object_source'],
                    'preview_author' => $preview['object_source'],
                    'preview_name' => $preview['object_source'],
                ];
            } else {
                $news['video_stream'] = null;
            }


            if ($news['image_main']) {
                $imageMain = CdnFile::where('id', '=', $news['image_main'])->select()->first();
                $news['image_main'] = [
                    'url' => $imageMain->url,
                    'id' => $imageMain->id,
                    'object_source' => $imageMain->object_source,
                    'object_author' => $imageMain->object_source,
                    'object_name' => $imageMain->object_source,
                ];
            } else {
                $news['image_main'] = null;
            }


            if ($news['image_preview']) {
                $imagePreview = CdnFile::where('id', '=', $news['image_preview'])->select()->first();
                $news['image_preview'] = [
                    'url' => $imagePreview->url,
                    'id' => $imagePreview->id,
                    'object_source' => $imagePreview->object_source,
                    'object_author' => $imagePreview->object_source,
                    'object_name' => $imagePreview->object_source,
                ];
            } else {
                $news['image_preview'] = null;
            }
            $transform[] = [
                'category' => $war->category,
                'data' => $news,
                'top' => $war->top,
            ];
        }

        return $transform;
    }

    /**
     * Записи эфиров
     *
     * @param \Illuminate\Database\Eloquent\Collection $records
     * @return array
     */
    public function tranformRecords(Collection $records)
    {
        $transform = [];


        foreach ($records as $record) {

            $air = $record->record->toArray();

            if ($air['video']) {
                $imagePreview = CdnFile::where('id', '=', $air['video_preview'])->select()->first();
                $air['video'] = [
                    'url' => CdnFile::where('id', '=', $air['video'])->pluck('url')->first(),
                    'id' =>  $air['video'],
                    'duration' => $air['video_duration'],
                    'preview' => CdnFile::where('id', '=', $air['video_preview'])->pluck('url')->first(),
                    'preview_id' => $air['video_preview'],
                    'preview_source' => $imagePreview['object_source'],
                    'preview_author' => $imagePreview['object_source'],
                    'preview_name' => $imagePreview['object_source'],
                ];
            } else {
                $air['video'] = null;
            }
            unset($air["video_preview"]);
            $transform[] = [
                'data' => $air,
                'top' => $record->top,
            ];
        }

        return $transform;
    }

    /**
     * @param Collection $options
     * @return array
     *
     */
    public function transformOptions(Collection $options)
    {
        $transform = [];
        foreach ($options as $option) {
            $transform[$option->name] = $option->value;
        }

        return $transform;
    }
}