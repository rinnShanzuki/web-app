<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    protected $fillable = [
        'description',
        'reported_at',
        'resolved_at',
        'id_intype',
        'id_instatus',
        'id_plevel',
        'id_inlocation',
        'id_client'
    ];

    protected $primaryKey = 'id_incident';
    
    public function type()
    {
        return $this->belongsTo(IncidentType::class, 'id_intype', 'id_intype');
    }

    public function status()
    {
        return $this->belongsTo(IncidentStatus::class, 'id_instatus', 'id_instatus');
    }

    public function priority()
    {
        return $this->belongsTo(PriorityLevel::class, 'id_plevel', 'id_plevel');
    }

    public function location()
    {
        return $this->belongsTo(IncidentLocation::class, 'id_inlocation', 'id_inlocation');
    }

    public function client()
    {
        return $this->belongsTo(ClientUser::class, 'id_client', 'id_client');
    }

    public function media()
    {
        return $this->hasMany(IncidentMedia::class, 'id_incident', 'id_incident');
    }

    public function responses()
    {
        return $this->hasMany(Response::class, 'id_incident', 'id_incident');
    }

    public function dispatchLogs()
    {
        return $this->hasMany(DispatchLog::class, 'id_incident', 'id_incident');
    }
}
