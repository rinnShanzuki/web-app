<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class ClientUser extends Authenticatable
{
    use HasApiTokens;
    
    protected $fillable = [
        'name',
        'contact_no',
        'email',
        'password',
        'gender',
        'birthdate',
        'photo',
        'status',
        'last_login',
        'id_role',
        'street',
        'barangay',
        'municipality',
        'province',
        'age'
    ];
    
    protected $primaryKey = 'id_client';

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'birthdate' => 'date',
            'last_login' => 'datetime',
        ];
    }

    public function role() {
        return $this->belongsTo(Role::class, 'id_role', 'id_role');
    }
}
