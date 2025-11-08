<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = [
        'name', 
        'description'
    ];

    protected $primaryKey = 'id_role';
    public $incrementing = true;

    public function admins() { 
        return $this->hasMany(AdminUser::class, 'id_role', 'id_role'); 
    }
    public function clients() { 
        return $this->hasMany(ClientUser::class, 'id_role', 'id_role'); 
    }
}
