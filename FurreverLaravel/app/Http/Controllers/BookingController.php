<?php
namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'appointment_date' => 'required|date_format:Y-m-d H:i:s',
            'name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:255',
            'note' => 'nullable|string',
        ]);

        Booking::create([
            'user_id' => $request->user_id,
            'service_id' => $request->service_id,
            'appointment_date' => $request->appointment_date,
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'note' => $request->note,
        ]);

        return response()->json([
            'message' => 'Booking created successfully.'
        ], 201);
    }

    // Method to list all bookings for the authenticated user
    public function userBookings()
    {
        $user = Auth::user();
        $bookings = Booking::where('user_id', $user->id)->get();
        return response()->json($bookings);
    }
}
