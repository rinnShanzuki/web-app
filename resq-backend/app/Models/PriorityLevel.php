<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PriorityLevel extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];
    
    protected $primaryKey = 'id_plevel';

    public function incidents()
    {
        return $this->hasMany(Incident::class, 'id_plevel');
    }
}
