<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = [
        'rating',
        'comments',
        'id_incident',
        'id_client'
    ];

    protected $primaryKey = 'id_feedback';

    public function incident()
    {
        return $this->belongsTo(Incident::class, 'id_incident', 'id_incident');
    }

    public function client()
    {
        return $this->belongsTo(ClientUser::class, 'id_client','id_client');
    }
}
