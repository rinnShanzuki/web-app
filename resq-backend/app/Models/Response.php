<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    protected $fillable = [
        'start_time',
        'arrival_time', 
        'end_time',
        'remarks', 
        'status',
        'id_incident',
        'id_agency',
        'id_responder'
    ];

    protected $primaryKey = 'id_response';

    public function incident()
    {
        return $this->belongsTo(Incident::class, 'id_incident', 'id_incident');
    }

    public function agency()
    {
        return $this->belongsTo(Agency::class, 'id_agency', 'id_agency');
    }

    public function responder()
    {
        return $this->belongsTo(Responder::class, 'id_responder', 'id_responder');
    }
}
