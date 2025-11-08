<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $table = 'agency';

    protected $fillable = [
        'name',
        'type',
        'contact_no',
        'email',
        'address',
        'status'
    ];

    protected $primaryKey = 'id_agency';

    public function personnel()
    {
        return $this->hasMany(AgencyPersonnel::class, 'id_agency', 'id_agency');
    }

    public function responses()
    {
        return $this->hasMany(Response::class, 'id_agency', 'id_agency');
    }

    public function dispatchLogs()
    {
        return $this->hasMany(DispatchLog::class, 'id_agency', 'id_agency');
    }
}
