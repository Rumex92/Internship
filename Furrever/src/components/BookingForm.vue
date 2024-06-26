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
      <div class=" justify-content-between">
        <button type="button" @click="goBackHome" class="btn " style="margin-right:10px;background-color:#d8ac73;">Back to Home</button>
        <button type="submit" class="btn" style="background-color:#a6b7aa;">Submit Booking</button>
      </div>
    </form>
    <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
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
      userProfile: null,
      services: [],
      successMessage: '',
      errorMessage: ''
    };
  },
  mounted() {
    this.fetchUserProfile();
    this.fetchServices();
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
        this.services = response.data;
        console.log('Services:', this.services);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
    async submitBooking() {
      if (!this.userProfile) {
        console.error('User profile data is not available.');
        return;
      }

      const formattedDate = this.formatAppointmentDate(this.bookingData.appointment_date);
      this.bookingData.appointment_date = formattedDate;
      this.bookingData.user_id = this.userProfile.id;

      const authStore = useAuthStore();
      const config = {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.post('http://localhost:8000/api/bookings', this.bookingData, config);
        console.log('Booking created successfully:', response.data);
        this.successMessage = 'Booking created successfully!';
        this.errorMessage = '';
      } catch (error) {
        console.error('Error creating booking:', error);
        this.errorMessage = error.response ? error.response.data.message : 'Failed to create booking.';
        this.successMessage = '';
      }
    },
    formatAppointmentDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
      return formattedDate;
    },
    goBackHome() {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>




<style scoped>
.alert {
  margin-top: 10px;
}
.btn {
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.btn:hover {
  background-color: #879984; 
}
</style>
