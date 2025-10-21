<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

     protected $fillable = [
        'description'
    ];

    protected $primaryKey = 'id_category';

    public function products() {
        return $this->hasMany(Product::class, 'id_category', 'id_category');
    }
}
