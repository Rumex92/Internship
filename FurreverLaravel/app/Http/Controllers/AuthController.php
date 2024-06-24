<?php
  
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Validator;
  
  
class AuthController extends Controller
{
 
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register() {
        $validator = Validator::make(request()->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8',
        ]);
  
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
  
        $user = new User;
        $user->name = request()->name;
        $user->email = request()->email;
        $user->password = bcrypt(request()->password);
        $user->save();
  
        return response()->json($user, 201);
    }
  
  
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
  
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
  
        return $this->respondWithToken($token);
    }
  
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }
  
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
  
        return response()->json(['message' => 'Successfully logged out']);
    }
  
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
    public function userProfile(Request $request)
    {
        // Retrieve authenticated user
        $user = Auth::user();

        // Return user profile data
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'profile_picture' => $user->profile_picture,
            // Add more fields as needed
        ]);
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
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
        
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'password' => 'required|min:8',
        ]);
    
        $user = Auth::user();
    
        // Verify the old password
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Old password is incorrect.'], 400);
        }
    
        // Update the user's password
        $user->password = Hash::make($request->password);
        $user->save();
    
        return response()->json(['message' => 'Password updated successfully.']);
    }

    public function updateProfile(Request $request)
    {
    $request->validate([
        'name' => 'required|string|max:255',
        'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $user = Auth::user();
    $user->name = $request->name;

    if ($request->hasFile('profile_picture')) {
        $imageName = time().'.'.$request->profile_picture->extension();  
        $request->profile_picture->move(public_path('images/profile_pictures'), $imageName);
        $user->profile_picture = $imageName;
    }

    $user->save();

    return response()->json(['message' => 'Profile updated successfully.', 'user' => $user]);
}

  // Other admin authentication methods...

    /**
     * Get all users (for admins).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsers()
    {
        $users = User::all(); // Example: Fetch all users
        return response()->json($users);
    }

    /**
     * Get a specific user by ID (for admins).
     *
     * @param  int  $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser($userId)
    {
        $user = User::findOrFail($userId); // Example: Find user by ID
        return response()->json($user);
    }
}    