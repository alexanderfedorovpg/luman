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

    /**
     * Файлы сообщения
     *
     * @return @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function files()
    {
        return $this->belongsToMany(CdnFile::class, 'news_chat_files', 'message_id', 'file_id');
    }
}