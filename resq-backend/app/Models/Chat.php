<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable = [
        'id_incident',
        'id_client', 
        'id_admin'
    ];
    
    protected $primaryKey = 'id_chat';
    
    public function messages()
    {
        return $this->hasMany(Message::class, 'id_chat', 'id_chat');
    }
}
