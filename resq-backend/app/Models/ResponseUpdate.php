<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResponseUpdate extends Model
{
    protected $fillable = [
        'latitude',
        'longitude',
        'update_message',
        'id_responder'
    ];

    protected $primaryKey = 'id_resupdate';

    public function responder()
    {
        return $this->belongsTo(Responder::class, 'id_responder', 'id_responder');
    }
}
