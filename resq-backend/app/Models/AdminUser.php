<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminUser extends Model
{
     protected $fillable = [
        'name',
        'email',
        'password',
        'contact_no',
        'last_login',
        'id_role'
    ];

    protected $primaryKey = 'id_admin';
    
    public function role() { 
        return $this->belongsTo(Role::class, 'id_role', 'id_role'); 
    }
}
