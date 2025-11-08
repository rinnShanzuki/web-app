<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientUser extends Model
{
    protected $fillable = [
        'name',
        'contact_no',
        'email',
        'password',
        'address',
        'gender',
        'birthdate',
        'photo',
        'status',
        'last_login',
        'id_role'
    ];
    protected $primaryKey = 'id_client';

    public function role() {
        return $this->belongsTo(Role::class, 'id_role', 'id_role');
    }
}
