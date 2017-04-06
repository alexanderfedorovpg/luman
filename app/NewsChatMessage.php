<?php


namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class NewsChatMessage
 * @package App
 */
class NewsChatMessage extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'news_chat_id',
        'user_id',
        'message',
    ];

    /**
     * Правила валидации
     *
     * @var array
     */
    public static $rules = [
        'message' => 'required|min:1',
    ];
}