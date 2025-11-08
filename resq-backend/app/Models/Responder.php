<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Responder extends Model
{
    protected $fillable = [
        'id_ap',
        'status',
        'start_time', 
        'arrival_time',
        'end_time',
        'remarks',
        'id_incident'
    ];

    protected $primaryKey = 'id_responder';
    
    public function personnel()
    {
        return $this->belongsTo(AgencyPersonnel::class, 'id_ap', 'id_ap');
    }

    public function incident()
    {
        return $this->belongsTo(Incident::class, 'id_incident', 'id_incident');
    }

    public function updates()
    {
        return $this->hasMany(ResponseUpdate::class, 'id_responder', 'id_responder');
    }

}
