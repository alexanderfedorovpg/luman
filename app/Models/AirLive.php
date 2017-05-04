<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AirLive extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'news_id',
        'image_preview',
        'title',
        'comment',
        'to_homepage',
        'enabled_timer',
    ];

    /**
     * Правила
     *
     * @var array
     */
    public static $rules = [
        'news_id' => 'required|exists:news,id',
        'image_preview' => 'string',
        'title' => 'string',
        'comment' => 'string',
        'to_homepage' => 'boolean',
        'enabled_timer' => 'boolean'
    ];

    /**
     * Возвращает новость
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function news()
    {
        return $this->hasOne(News::class, 'id', 'news_id');
    }

    /**
     * Save the model to the database.
     *
     * @param  array $options
     * @return bool
     */
    public function save(array $options = [])
    {
        if (!$this->title) {
            $this->title = $this->news->title;
        }

        $this->enabled_live = true;

        return parent::save($options);
    }

    /**
     * @param array $fields
     * @return bool
     */
    public static function insertLive(array $fields)
    {
        $live = static::where('news_id', '=', $fields['news_id'])->get()->first();
        if ($live) {
            return $live->update($fields);
        }

        static::truncate();
        $live = new static($fields);
        return $live->save();
    }

    public function scopeEnabledLive($query)
    {
        return $query->where('enabled_live', '=', true);
    }
}