<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => 'Laravel API is working!']);
});

Route::get('/test2', function () {
    return response()->json(['message' => 'API connection successful!']);
});

Route::post('/upload-voice', function(Request $req) {
    if (!$req->hasFile('file')) {
        return response()->json(['message' => 'No file provided'], 400);
    }
    $file = $req->file('file');
    $path = $file->store('voice_messages', 'public'); // configure filesystems
    // Save DB record if needed, attach department, user, etc.
    return response()->json(['message' => 'Uploaded', 'path' => $path], 200);
});
