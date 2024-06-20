<template>
  <div class="admin-bookings">
    <h1>Bookings</h1>
    <table class="table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Service Name</th>
          <th>Appointment Date</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking.id">
          <td>{{ booking.user_id }}</td>
          <td>{{ booking.service_name }}</td>
          <td>{{ booking.appointment_date }}</td>
          <td>{{ booking.name }}</td>
          <td>{{ booking.phone_number }}</td>
          <td>{{ booking.note }}</td>
          <td>
            <button class="btn btn-success" @click="markAsCompleted(booking.id)" :disabled="booking.completed">
              {{ booking.completed ? 'Completed' : 'Mark as Completed' }}
            </button>
            <button class="btn btn-danger" @click="deleteBooking(booking.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/store';

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
        const authStore = useAuthStore();
        const config = {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        };

        const response = await axios.get('http://localhost:8000/api/admin/bookings', config);
        this.bookings = await this.mapServiceNames(response.data); // Map service names
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    },
    async mapServiceNames(bookings) {
      // Fetch service details for each booking and map service_name to booking object
      const serviceIds = bookings.map(booking => booking.service_id);
      const servicesResponse = await axios.get('http://localhost:8000/api/services'); // Assuming this endpoint returns all services

      const servicesMap = servicesResponse.data.reduce((map, service) => {
        map[service.id] = service.service_name;
        return map;
      }, {});

      return bookings.map(booking => ({
        ...booking,
        service_name: servicesMap[booking.service_id] || 'Unknown Service'
      }));
    },
    async markAsCompleted(bookingId) {
      try {
        const authStore = useAuthStore();
        const config = {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        };

        const response = await axios.put(`http://localhost:8000/api/admin/bookings/${bookingId}/complete`, {}, config);
        console.log('Booking marked as completed:', response.data);
        this.fetchBookings(); // Refresh the list of bookings
      } catch (error) {
        console.error('Error marking booking as completed:', error);
      }
    },
    async deleteBooking(bookingId) {
      try {
        const authStore = useAuthStore();
        const config = {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        };

        const response = await axios.delete(`http://localhost:8000/api/admin/bookings/${bookingId}`, config);
        console.log('Booking deleted:', response.data);
        this.fetchBookings(); // Refresh the list of bookings
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  }
};
</script>



<style scoped>
.admin-bookings {
  padding: 20px;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.table th {
  background-color: #f4f4f4;
}
</style>
