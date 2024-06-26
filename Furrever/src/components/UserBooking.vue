<template>
  <div class="booking">
    <h1>Here are your Booking Status!</h1>
    <div v-if="bookings.length === 0">
      <p>No bookings found.</p>
    </div>
    <div class="d-flex flex-column align-items-center">
      <div v-for="booking in bookings" :key="booking.id" class="mb-3 card-container">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ booking.service_name }}</h5>
            <p class="card-text">Appointment Date: {{ formatAppointmentDate(booking.appointment_date) }}</p>
            <p class="card-text">Status:
              <span v-if="booking.completed === 1" class="text-success">Approved</span>
              <span v-else class="text-warning">Pending</span>
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Booking ID: {{ booking.id }}</small>
          </div>
        </div>
      </div>
          <router-link to="/profile" class="btn" style="margin-right:10px;background-color:#d8ac73;color:#fff;">Back to Profile</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      bookings: []
    };
  },
  mounted() {
    this.fetchBookings();
  },
  methods: {
    async fetchBookings() {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

        if (!token) {
          throw new Error('Token not available');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Fetch user bookings
        const response = await axios.get('http://localhost:8000/api/user/bookings', config);
        const bookings = response.data;

        // Fetch all services
        const servicesResponse = await axios.get('http://localhost:8000/api/services');
        const services = servicesResponse.data;

        // Map service details to each booking
        const servicesMap = services.reduce((map, service) => {
          map[service.id] = service.service_name;
          return map;
        }, {});

        // Map service_name and format appointment_date to each booking
        const bookingsWithServiceDetails = bookings.map(booking => ({
          ...booking,
          service_name: servicesMap[booking.service_id] || 'Unknown Service',
          appointment_date: new Date(booking.appointment_date) // Assuming appointment_date is a string in ISO format
        }));

        this.bookings = bookingsWithServiceDetails;
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    },
    formatAppointmentDate(date) {
      return new Date(date).toLocaleDateString(); // Adjust formatting as needed
    }
  }
};
</script>

<style>
.card-container {
  width: 100%;
  max-width: 500px; 
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  margin-bottom: 0.5rem;
}

.card-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
  padding: 0.75rem 1.25rem;
}

.booking{
  text-align:center;
   font-family: 'Quicksand', sans-serif;
}

.booking h1{
  margin-top:30px;
}
</style>
