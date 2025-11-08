<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncidentType extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];

    protected $primaryKey = 'id_intype';

    public function incidents()
    {
        return $this->hasMany(Incident::class, 'id_intype');
    }
}
