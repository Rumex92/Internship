<template>
  <div class="container">
    <h2>Book a Pet Sitter Service</h2>
    <form @submit.prevent="submitBooking">
      <div class="mb-3">
        <label for="service" class="form-label">Select Service</label>
        <select v-model="bookingData.service_id" id="service" class="form-select" required>
          <option v-for="service in services" :key="service.id" :value="service.id">{{ service.service_name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Your Name</label>
        <input v-model="bookingData.name" type="text" id="name" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input v-model="bookingData.phone_number" type="text" id="phone" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="appointmentDate" class="form-label">Appointment Date</label>
        <input v-model="bookingData.appointment_date" type="datetime-local" id="appointmentDate" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="note" class="form-label">Note (optional)</label>
        <textarea v-model="bookingData.note" id="note" class="form-control"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit Booking</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
import { useAuthStore } from '@/store';

export default {
  data() {
    return {
      bookingData: {
        service_id: null,
        name: '',
        phone_number: '',
        appointment_date: '',
        note: ''
      },
      userProfile: null,  // Store user profile data here
      services: []  // Initialize an empty array to store services
    };
  },
  mounted() {
    this.fetchUserProfile();
    this.fetchServices(); // Call the method to fetch services
  },
  methods: {
    async fetchUserProfile() {
      try {
        const authStore = useAuthStore();
        const config = {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        };
        
        const response = await axios.get('http://localhost:8000/api/user-profile', config);
        this.userProfile = response.data;
        console.log('User Profile:', this.userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    async fetchServices() {
      try {
        const response = await axios.get('http://localhost:8000/api/services');
        this.services = response.data; // Assuming response.data is an array of services
        console.log('Services:', this.services);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
   async submitBooking() {
      // Ensure userProfile has been fetched successfully
      if (!this.userProfile) {
        console.error('User profile data is not available.');
        return;
      }

      // Format appointment_date as required by the backend
      const formattedDate = this.formatAppointmentDate(this.bookingData.appointment_date);
      this.bookingData.appointment_date = formattedDate;

      // Use this.userProfile.id as the user_id in your bookingData
      this.bookingData.user_id = this.userProfile.id;

      const authStore = useAuthStore(); // Assuming useAuthStore() is correctly defined in your setup
      const config = {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.post('http://localhost:8000/api/bookings', this.bookingData, config);
        console.log('Booking created successfully:', response.data);
        // Optionally, you can redirect or show a success message
      } catch (error) {
        console.error('Error creating booking:', error);
        // Handle error (show error message, etc.)
      }
    },
    formatAppointmentDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
      return formattedDate;
    },
  }

  
};
</script>





<style>
/* Add any custom styles here */
</style>
