<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Load API version 1 routes
Route::prefix('v1')->group(base_path('routes/api_v1.php'));

// Future versions can be added here
// Route::prefix('v2')->group(base_path('routes/api_v2.php'));

// Legacy test routes (can be removed later)
Route::get('/test', function () {
    return response()->json(['message' => 'Laravel API is working!']);
});

Route::post('/upload-voice', function(Request $req) {
    if (!$req->hasFile('file')) {
        return response()->json(['message' => 'No file provided'], 400);
    }
    $file = $req->file('file');
    $path = $file->store('voice_messages', 'public');
    return response()->json(['message' => 'Uploaded', 'path' => $path], 200);
});
