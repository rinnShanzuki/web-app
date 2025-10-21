<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'contact_info'
    ];

    protected $primaryKey = 'id_supplier';

    public function product() {
        return $this->hasMany(Product::class, 'id_supplier', 'id_supplier');
    }

}
