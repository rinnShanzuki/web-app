<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $products = Product::with(['category', 'supplier', 'stock'])->get();
        return response()->json($products);
    }

    public function show() {
        $product = Product::with(['category', 'supplier', 'stock'])->findOrFail();
        return response()->json($product);
    }
}
