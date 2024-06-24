<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Add this line
use Validator;

class AdminAuthController extends Controller
{
    /**
     * Register a new admin.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|confirmed|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $admin = new Admin();
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->password = bcrypt($request->password);
        $admin->save();

        // You can customize the response as needed
        return response()->json($admin, 201);
    }

    /**
     * Authenticate an admin.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (! $token = auth('admin-api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated admin.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('admin-api')->user());
    }

    /**
     * Log the admin out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('admin-api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('admin-api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('admin-api')->factory()->getTTL() * 60
        ]);
    }

    /**
     * Change the admin password.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
           
            'current_password' => 'required',
            'new_password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $admin = Auth::guard('admin-api')->user();

        if (!password_verify($request->current_password, $admin->password)) {
            return response()->json(['error' => 'Current password does not match'], 401);
        }

        $admin->password = bcrypt($request->new_password);
        $admin->save();

        return response()->json(['message' => 'Password changed successfully'], 200);
    }
/**
     * Get the authenticated admin's profile.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        return response()->json(auth('admin-api')->user());
    }
    /**
     * Delete the admin account.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteAccount(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $admin = Auth::guard('admin-api')->user();

        if (!password_verify($request->password, $admin->password)) {
            return response()->json(['error' => 'Incorrect password'], 401);
        }

        $admin->delete();

        return response()->json(['message' => 'Admin account deleted successfully'], 200);
    }
    // Other methods omitted for brevity...

    /**
     * Get list of admins.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function admins()
    {
        // Fetch all admins except the authenticated admin
        $admins = Admin::where('id', '<>', Auth::guard('admin-api')->id())->get(['id', 'name', 'email']);

        return response()->json(['admins' => $admins]);
    }
    
    
}
