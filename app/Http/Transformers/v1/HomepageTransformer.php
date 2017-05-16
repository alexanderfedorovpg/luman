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
            $arrNews['image_main'] = $news->news->imageMain ? $news->news->imageMain->url : null;
            $arrNews['image_preview'] = $news->news->imagePreview ? $news->news->imagePreview->url : null;
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
            $news['image_main'] = $infoNoise->news->imageMain ? $infoNoise->news->imageMain->url : null;
            $news['image_preview'] = $infoNoise->news->imagePreview ? $infoNoise->news->imagePreview->url : null;
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
            $news['image_main'] = $war->news->imageMain ? $war->news->imageMain->url : null;
            $news['image_preview'] = $war->news->imagePreview ? $war->news->imagePreview->url : null;
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
            $transform[] = [
                'data' => $record->record,
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