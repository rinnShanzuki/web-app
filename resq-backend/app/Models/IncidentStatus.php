<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncidentStatus extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];

    protected $primaryKey = 'id_instatus';


    public function incidents()
    {
        return $this->hasMany(Incident::class, 'id_instatus');
    }
}
