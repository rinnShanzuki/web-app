<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncidentLocation extends Model
{
     protected $fillable = [
        'street',
        'barangay',
        'city',
        'province',
        'region',
        'postal_code'
    ];

    protected $primaryKey = 'id_inlocation';

    public function incidents()
    {
        return $this->hasMany(Incident::class, 'id_inlocation');
    }
}
