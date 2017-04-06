<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class NewsChat
 * @package App
 */
class NewsChat extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'news_id'
    ];


    /**
     * The table associated with the model.
     *
     * @var string
     */
    public $table = 'news_chat';

    /**
     * Сообщения чата
     *
     * @return @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function messages()
    {
        return $this->hasMany(NewsChatMessage::class);
    }

    /**
     * Новость чата
     *
     * @return @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function news()
    {
        return $this->belongsTo(News::class);
    }

    /**
     * Создает новое сообщение чата
     *
     * @param string $message Сообщение
     * @param \App\User $user Пользователь
     * @return @return bool
     */
    public function newMessage($message, User $user)
    {
        $chatMessage = new NewsChatMessage([
            'news_chat_id' => $this->id,
            'message' => $message,
            'user_id' => $user->id
        ]);

        return $chatMessage->save();
    }
}