<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgencyPersonnel extends Model
{
    protected $fillable = [
        'name',
        'designation',
        'email',
        'contact_no',
        'on_duty',
        'id_agency'
    ];

    protected $primaryKey = 'id_ap';

    public function agency()
    {
        return $this->belongsTo(Agency::class, 'id_agency');
    }

    public function responder()
    {
        return $this->hasOne(Responder::class, 'id_ap');
    }
}
