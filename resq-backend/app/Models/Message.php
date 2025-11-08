<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
     protected $fillable = [
        'content',
        'type',
        'timestamp',
        'is_read',
        'id_chat', 
        'id_client'
    ];

    protected $primaryKey = 'id_message';

    public function chat()
    {
        return $this->belongsTo(Chat::class, 'id_chat', 'id_chat');
    }

    public function client()
    {
        return $this->belongsTo(ClientUser::class, 'id_client', 'id_client');
    }
}
