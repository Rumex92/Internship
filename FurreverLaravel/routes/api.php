<?php
 
 use Illuminate\Support\Facades\Route;
 use App\Http\Controllers\AuthController;
 use App\Http\Controllers\AdminAuthController;
 use App\Http\Controllers\CategoryController;
 use App\Http\Controllers\ServiceController;
 use App\Http\Controllers\BookingController;
 use App\Http\Controllers\AdminBookingController;
 use App\Http\Controllers\ReviewController;
 
 Route::group([
     'middleware' => 'api',
     'prefix' => 'auth'
 ], function ($router) {
     Route::post('/register', [AuthController::class, 'register'])->name('register');
     Route::post('/login', [AuthController::class, 'login'])->name('login');
     Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
     Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api')->name('refresh');
     Route::post('/me', [AuthController::class, 'me'])->middleware('auth:api')->name('me');
 });
 
 // Routes for admins (AdminAuthController)
 Route::group([
     'middleware' => 'api',
     'prefix' => 'admin'
 ], function ($router) {
     Route::post('/register', [AdminAuthController::class, 'register'])->name('admin.register');
     Route::post('/login', [AdminAuthController::class, 'login'])->name('admin.login');
     Route::post('/logout', [AdminAuthController::class, 'logout'])->middleware('auth:admin-api')->name('admin.logout');
     Route::post('/refresh', [AdminAuthController::class, 'refresh'])->middleware('auth:admin-api')->name('admin.refresh');
     Route::post('/me', [AdminAuthController::class, 'me'])->middleware('auth:admin-api')->name('admin.me');
 
     // Category routes accessible to authenticated admin users
     Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
     Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
     Route::get('/categories/{category}', [CategoryController::class, 'show'])->name('categories.show');
     Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
     Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
     Route::get('/categories/all', [CategoryController::class, 'all'])->name('categories.all');
 
     // Admin Service Routes
     Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
     Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
     Route::get('/services/{service}', [ServiceController::class, 'show'])->name('services.show');
     Route::put('/services/{service}', [ServiceController::class, 'update'])->name('services.update');
     Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');
 
     // Admin booking routes
     Route::get('/bookings', [AdminBookingController::class, 'index'])->name('admin.bookings.index');
     Route::put('/bookings/{booking}/complete', [AdminBookingController::class, 'markAsCompleted'])->name('admin.bookings.complete');
     Route::delete('/bookings/{booking}', [AdminBookingController::class, 'destroy'])->name('admin.bookings.destroy');
 });
 
 // Public routes for categories
 Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
 Route::get('/categories/{category}', [CategoryController::class, 'show'])->name('categories.show');
 
 // Public routes for services
 Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
 Route::get('/services/{service}', [ServiceController::class, 'show'])->name('services.show');
 
 // Route for fetching services by category
 Route::get('/categories/{category_id}/services', [ServiceController::class, 'servicesByCategory'])->name('services.by_category');
 
 // Booking routes
 Route::middleware('auth:api')->group(function () {
     Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
     Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
 });
 
 // User Profile
 Route::middleware('auth:api')->get('/user-profile', [AuthController::class, 'userProfile'])->name('user.profile');
 
 // Review routes
 Route::middleware('auth:api')->group(function () {
     Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
 });
 
 Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
 
 Route::middleware('auth:api')->post('/change-password', [AuthController::class, 'changePassword'])->name('change-password');


// Admin account management routes
Route::group(['prefix' => 'admin/account', 'middleware' => 'auth:admin-api'], function () {
    Route::put('password', [AdminAuthController::class, 'changePassword']);
    Route::delete('/', [AdminAuthController::class, 'deleteAccount']);
    Route::get('/profile', [AdminAuthController::class, 'profile'])->name('admin.profile');
});