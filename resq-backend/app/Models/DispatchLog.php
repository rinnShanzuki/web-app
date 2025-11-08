<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DispatchLog extends Model
{
    protected $fillable = [
        'dispatch_time',
        'status',
        'id_incident',
        'id_admin',
        'id_agency'
    ];

    protected $primaryKey = 'id_dislog';

    public function incident()
    {
        return $this->belongsTo(Incident::class, 'id_incident', 'id_incident');
    }

    public function admin()
    {
        return $this->belongsTo(AdminUser::class, 'id_admin', 'id_admin');
    }

    public function agency()
    {
        return $this->belongsTo(Agency::class, 'id_agency', 'id_agency');
    }
}
