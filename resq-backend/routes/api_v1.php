<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ClientAuthController;

/*
|--------------------------------------------------------------------------
| API V1 Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for version 1 of your application.
| These routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group.
|
*/

// Public routes (No authentication required)

// General Auth routes (for User model - if needed)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Client Auth routes (for ClientUser model)
Route::prefix('client/auth')->group(function () {
    Route::post('/register', [ClientAuthController::class, 'register']);
    Route::post('/login', [ClientAuthController::class, 'login']);
});

// Protected routes (Require authentication)
Route::middleware('auth:sanctum')->group(function () {
    
    // General Auth routes
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
    });

    // Client Auth routes
    Route::prefix('client/auth')->group(function () {
        Route::post('/logout', [ClientAuthController::class, 'logout']);
        Route::get('/me', [ClientAuthController::class, 'me']);
        Route::post('/refresh', [ClientAuthController::class, 'refresh']);
    });

    // User profile routes
    Route::prefix('user')->group(function () {
        Route::get('/profile', function (Request $request) {
            return response()->json([
                'status' => 'success',
                'data' => $request->user()
            ]);
        });
    });

    // Placeholder for future routes
    // Incidents, Responders, Admin, etc.
});

// Test route
Route::get('/test', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'API V1 is working!',
        'version' => '1.0.0'
    ]);
});
