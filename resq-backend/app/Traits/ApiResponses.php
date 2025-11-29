<?php

namespace App\Traits;

trait ApiResponses
{
    /**
     * Success response
     */
    protected function success($data = null, $message = 'Success', $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    /**
     * Error response
     */
    protected function error($message = 'Error', $code = 400, $errors = null)
    {
        $response = [
            'status' => 'error',
            'message' => $message
        ];

        if ($errors) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $code);
    }

    /**
     * Validation error response
     */
    protected function validationError($errors, $message = 'Validation failed')
    {
        return $this->error($message, 422, $errors);
    }

    /**
     * Unauthorized response
     */
    protected function unauthorized($message = 'Unauthorized')
    {
        return $this->error($message, 401);
    }

    /**
     * Forbidden response
     */
    protected function forbidden($message = 'Forbidden')
    {
        return $this->error($message, 403);
    }

    /**
     * Not found response
     */
    protected function notFound($message = 'Resource not found')
    {
        return $this->error($message, 404);
    }

    /**
     * Server error response
     */
    protected function serverError($message = 'Internal server error')
    {
        return $this->error($message, 500);
    }

    /**
     * Created response
     */
    protected function created($data = null, $message = 'Resource created successfully')
    {
        return $this->success($data, $message, 201);
    }

    /**
     * No content response
     */
    protected function noContent()
    {
        return response()->json(null, 204);
    }
}
