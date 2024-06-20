<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class AdminBookingController extends Controller
{
    // Ensure that only authenticated users can access these methods
 
    // Method to list all bookings
    public function index()
    {
        $bookings = Booking::all(); // You might want to paginate this in a real application
        return response()->json($bookings);
    }

    // Method to mark a booking as completed
    public function markAsCompleted(Booking $booking)
    {
        $booking->completed = true; // Mark the booking as completed
        $booking->save();

        return response()->json(['message' => 'Booking marked as completed']);
    }

    // Method to delete a booking
    public function destroy(Booking $booking)
    {
        $booking->delete();

        return response()->json(['message' => 'Booking deleted']);
    }
}
