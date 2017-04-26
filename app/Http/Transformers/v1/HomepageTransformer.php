<?php

namespace App\Http\Transformers\v1;

use App\Http\Transformers\Transformer;
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
            $arrNews['image_main'] = $news->news->imageMain ? $news->news->imageMain->url : null;
            $arrNews['image_preview'] = $news->news->imagePreview ? $news->news->imagePreview->url : null;
            $transform[] = [
                'category' => $news->category,
                'news' => $arrNews,
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
            $transform[] = [
                'news' => $infoNoise->news,
                'top' => $infoNoise->top,
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
            $transform[] = [
                'record' => $record->record,
                'top' => $record->top,
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
    public function transformOptions(Collection $options)
    {
        $transform = [];
        foreach ($options as $option) {
            $transform[$option->name] = $option->value;
        }

        return $transform;
    }
}