<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsChatFile extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'message_id', 'file_id'
    ];
}