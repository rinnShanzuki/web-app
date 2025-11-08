<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RealTimeLocation extends Model
{
    protected $fillable = [
        'latitude',
        'longitude',
        'timestamp',
        'id_client'
    ];

    protected $primaryKey = 'id_rtlocation';

    public function client()
    {
        return $this->belongsTo(ClientUser::class, 'id_client', 'id_client');
    }

}
