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
    
 // Method to search bookings by keyword
 public function search(Request $request)
 {
     $keyword = $request->input('keyword');

     if (empty($keyword)) {
         return response()->json(['message' => 'Please provide a keyword for search'], 400);
     }

     $bookings = Booking::where(function ($query) use ($keyword) {
         $query->where('name', 'like', '%' . $keyword . '%')
             ->orWhereHas('service', function ($q) use ($keyword) {
                 $q->where('service_name', 'like', '%' . $keyword . '%');
             })
             ->orWhere('appointment_date', 'like', '%' . $keyword . '%');
     })->get();

     return response()->json($bookings);
 }
}
