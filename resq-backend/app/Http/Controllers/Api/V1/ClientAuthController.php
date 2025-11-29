<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\LoginUserRequest;
use App\Http\Requests\V1\RegisterClientRequest;
use App\Models\ClientUser;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientAuthController extends Controller
{
    use ApiResponses;

    /**
     * Register a new client user
     *
     * @param RegisterClientRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterClientRequest $request)
    {
        try {
            // Create client user - only save what's provided in signup
            // Address fields (street, barangay, municipality, province) and contact_no
            // will be NULL and filled later when user updates profile
            $client = ClientUser::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'gender' => $request->gender,
                'birthdate' => $request->birthdate,
                'status' => 'active',
                'id_role' => 3, // Client/Citizen role
            ]);

            // Create token for the client
            $token = $client->createToken('client_auth_token')->plainTextToken;

            return $this->created([
                'client' => [
                    'id' => $client->id_client,
                    'name' => $client->name,
                    'email' => $client->email,
                    'gender' => $client->gender,
                    'birthdate' => $client->birthdate,
                    'status' => $client->status,
                ],
                'token' => $token,
                'token_type' => 'Bearer'
            ], 'Client registered successfully');

        } catch (\Exception $e) {
            return $this->serverError('Registration failed: ' . $e->getMessage());
        }
    }

    /**
     * Login client user
     *
     * @param LoginUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginUserRequest $request)
    {
        try {
            // Find client by email
            $client = ClientUser::where('email', $request->email)->first();

            // Check if client exists and password is correct
            if (!$client || !Hash::check($request->password, $client->password)) {
                return $this->unauthorized('Invalid credentials');
            }

            // Check if client is active
            if ($client->status !== 'active') {
                return $this->forbidden('Your account is inactive. Please contact support.');
            }

            // Update last login
            $client->update(['last_login' => now()]);

            // Revoke all previous tokens
            $client->tokens()->delete();

            // Create new token
            $token = $client->createToken('client_auth_token')->plainTextToken;

            return $this->success([
                'client' => [
                    'id' => $client->id_client,
                    'name' => $client->name,
                    'email' => $client->email,
                    'contact_no' => $client->contact_no,
                    'address' => $client->address,
                    'gender' => $client->gender,
                    'birthdate' => $client->birthdate,
                    'status' => $client->status,
                ],
                'token' => $token,
                'token_type' => 'Bearer'
            ], 'Login successful');

        } catch (\Exception $e) {
            return $this->serverError('Login failed: ' . $e->getMessage());
        }
    }

    /**
     * Logout client user (Revoke token)
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
     * Get authenticated client
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        try {
            $client = $request->user();

            return $this->success([
                'client' => [
                    'id' => $client->id_client,
                    'name' => $client->name,
                    'email' => $client->email,
                    'contact_no' => $client->contact_no,
                    'address' => $client->address,
                    'gender' => $client->gender,
                    'birthdate' => $client->birthdate,
                    'status' => $client->status,
                ]
            ], 'Client retrieved successfully');

        } catch (\Exception $e) {
            return $this->serverError('Failed to retrieve client: ' . $e->getMessage());
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
            $client = $request->user();

            // Revoke current token
            $request->user()->currentAccessToken()->delete();

            // Create new token
            $token = $client->createToken('client_auth_token')->plainTextToken;

            return $this->success([
                'token' => $token,
                'token_type' => 'Bearer'
            ], 'Token refreshed successfully');

        } catch (\Exception $e) {
            return $this->serverError('Token refresh failed: ' . $e->getMessage());
        }
    }
}
