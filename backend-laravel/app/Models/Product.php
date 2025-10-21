<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'price',
        'id_category',
        'id_supplier'
    ];

    protected $primaryKey = 'id_product';

    public function category() {
        return $this->belongsTo(Category::class, 'id_category', 'id_category');
    }

    public function supplier() {
        return $this->belongsTo(Supplier::class, 'id_supplier', 'id_supplier');
    }

    public function stock() {
        return $this->hasMany(Stock::class, 'id_product', 'id_product');
    }

}
