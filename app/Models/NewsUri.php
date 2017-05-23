<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class NewsUri
 * @package App\Models
 */
class NewsUri extends Model
{

    protected $table = 'news_uri';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'news_id',
        'uri'
    ];

    /**
     * Правила
     *
     * @var array
     */
    public static $rules = [

        'news_id' => 'required|exists:news,id',
        'uri' => 'required|max:255',

    ];

    /**
     * Возвращает связь с автором статьи
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function news()
    {
        return $this->hasOne(News::class, 'id', 'news_id');
    }


}