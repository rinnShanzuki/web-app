<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\LoginUserRequest;
use App\Http\Requests\V1\RegisterUserRequest;
use App\Models\User;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiResponses;

    /**
     * Register a new user (Citizen)
     *
     * @param RegisterUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUserRequest $request)
    {
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'contact_number' => $request->contact_number,
                'address' => $request->address,
                'role' => 'citizen', // Default role
            ]);

            // Create token for the user
            $token = $user->createToken('auth_token')->plainTextToken;

            return $this->created([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'contact_number' => $user->contact_number,
                    'address' => $user->address,
                    'role' => $user->role,
                ],
                'token' => $token,
                'token_type' => 'Bearer'
            ], 'User registered successfully');

        } catch (\Exception $e) {
            return $this->serverError('Registration failed: ' . $e->getMessage());
        }
    }

    /**
     * Login user
     *
     * @param LoginUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginUserRequest $request)
    {
        try {
            // Attempt to authenticate
            if (!Auth::attempt($request->only('email', 'password'))) {
                return $this->unauthorized('Invalid credentials');
            }

            $user = Auth::user();

            // Revoke all previous tokens
            $user->tokens()->delete();

            // Create new token
            $token = $user->createToken('auth_token')->plainTextToken;

            return $this->success([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'contact_number' => $user->contact_number,
                    'address' => $user->address,
                    'role' => $user->role,
                ],
                'token' => $token,
                'token_type' => 'Bearer'
            ], 'Login successful');

        } catch (\Exception $e) {
            return $this->serverError('Login failed: ' . $e->getMessage());
        }
    }

    /**
     * Logout user (Revoke token)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        try {
            // Revoke current token
            $request->user()->currentAccessToken()->delete();

            return $this->success(null, 'Logged out successfully');

        } catch (\Exception $e) {
            return $this->serverError('Logout failed: ' . $e->getMessage());
        }
    }

    /**
     * Get authenticated user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        try {
            $user = $request->user();

            return $this->success([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'contact_number' => $user->contact_number,
                    'address' => $user->address,
                    'role' => $user->role,
                ]
            ], 'User retrieved successfully');

        } catch (\Exception $e) {
            return $this->serverError('Failed to retrieve user: ' . $e->getMessage());
        }
    }

    /**
     * Refresh token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        try {
            $user = $request->user();

            // Revoke current token
            $request->user()->currentAccessToken()->delete();

            // Create new token
            $token = $user->createToken('auth_token')->plainTextToken;

            return $this->success([
                'token' => $token,
                'token_type' => 'Bearer'
            ], 'Token refreshed successfully');

        } catch (\Exception $e) {
            return $this->serverError('Token refresh failed: ' . $e->getMessage());
        }
    }
}
