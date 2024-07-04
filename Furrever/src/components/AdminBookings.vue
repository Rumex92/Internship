<template>
  <div>
    <div id="mySidenav" class="sidenav">
      <a class="closebtn" @click="closeNav">&times;</a>
      <router-link to="/admin/home">Services</router-link>
      <router-link to="/admin/categories">Service Categories</router-link>
      <router-link to="/admin/bookings">Bookings</router-link>
      <router-link :to="{ name: 'UserList' }">User List</router-link>
      <router-link :to="{ name: 'AdminAccount' }">Change Password</router-link>
      <a class="logoutbtn" @click="logout">Logout</a>
    </div>
    <h1>Admin Dashboard-Bookings</h1>
    <span class="nav" @click="openNav">&#9776; open</span>
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
        <tr v-for="booking in paginatedBookings" :key="booking.id">
          <td>{{ booking.user_id }}</td>
          <td>{{ booking.service_name }}</td>
          <td>{{ booking.appointment_date }}</td>
          <td>{{ booking.name }}</td>
          <td>{{ booking.phone_number }}</td>
          <td>{{ booking.note }}</td>
          <td>
            <button class="btn btn-success" style="margin-right: 10px;" @click="markAsCompleted(booking.id)" :disabled="booking.completed">
              {{ booking.completed ? 'Completed' : 'Mark as Completed' }}
            </button>
            <button class="btn btn-danger" @click="deleteBooking(booking.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/store';
import { useAdminAuthStore } from '../store/adminAuth';

export default {
  data() {
    return {
      bookings: [],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    paginatedBookings() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.bookings.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.bookings.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchBookings();
  },
  methods: {
    openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    },
    async logout() {
      const adminAuthStore = useAdminAuthStore();

      // Display a confirmation dialog
      const confirmation = window.confirm("Are you sure you want to log out?");

      if (confirmation) {
        try {
          await adminAuthStore.logout();
          this.$router.push('/admin/auth/login');
        } catch (error) {
          console.error('Logout failed:', error.message || 'Unknown error');
        }
      } else {
        console.log('Logout canceled by the user');
      }
    },
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
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
};
</script>

<style scoped>
.nav {
  font-size: 30px;
  cursor: pointer;
  margin: 20px;
}
.admin-bookings {
  padding: 20px;
}
.table {
  width: calc(100% - 40px); /* Adjust the width to leave space for margins */
  border-collapse: collapse;
  margin: 0 auto; /* Center the table horizontally */
  margin-left: 20px; /* Left margin */
  margin-right: 20px; /* Right margin */
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.table th {
  background-color: #f4f4f4;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px; /* Adjust as needed */
}

.pagination-button {
  background-color: #6c757d; /* Gray background color */
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px; /* Adjust the radius as needed for rounder corners */
  transition: background-color 0.3s;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-button:not(:disabled):hover {
  background-color: #5a6268; /* Slightly darker gray for hover state */
}

.pagination-info {
  margin: 0 10px;
  font-size: 16px;
}
</style>
