<template>
  <div>
    <div id="mySidenav" class="sidenav">
      <a class="closebtn" @click="closeNav">&times;</a>
      <router-link to="/admin/home">Services</router-link>
      <router-link to="/admin/categories">Service Categories</router-link>
      <router-link to="/admin/bookings">Bookings</router-link>
      <router-link :to="{ name: 'AdminList' }">Admin List</router-link>
      <router-link :to="{ name: 'UserList' }">User List</router-link>
      <router-link :to="{ name: 'AdminAccount' }">Change Password</router-link>
      <a class="logoutbtn" @click="logout">Logout</a>
    </div>
    <h2>Admin Dashboard - Admin List</h2>
    <span class="nav" @click="openNav">&#9776; open</span>
    <div id="main">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th> <!-- Add a new column for delete action -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in paginatedAdmins" :key="admin.id">
            <td>{{ admin.name }}</td>
            <td>{{ admin.email }}</td>
            <td>
              <button @click="deleteAdmin(admin.email)" class="btn btn-danger">Delete</button>
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
  </div>
</template>

<script>
import axios from 'axios';
import { useAdminAuthStore } from '@/store'; // Ensure this is correctly imported

export default {
  data() {
    return {
      admins: [],
      currentPage: 1,
      itemsPerPage: 10, // Define itemsPerPage
    };
  },
  computed: {
    paginatedAdmins() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.admins.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.admins.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchAdmins();
  },
  methods: {
    openNav() {
      document.getElementById('mySidenav').style.width = '250px';
    },
    closeNav() {
      document.getElementById('mySidenav').style.width = '0';
    },
    async logout() {
      const adminAuthStore = useAdminAuthStore();

      // Display a confirmation dialog
      const confirmation = window.confirm('Are you sure you want to log out?');

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
    async fetchAdmins() {
      try {
        const adminAuthStore = useAdminAuthStore();
        const token = adminAuthStore.token;

        if (!token) {
          throw new Error('Token not available');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:8000/api/admins', config);
        this.admins = response.data.admins;
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    },
    async deleteAdmin(email) {
      try {
        const adminAuthStore = useAdminAuthStore();
        const token = adminAuthStore.token;

        if (!token) {
          throw new Error('Token not available');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.delete(`http://localhost:8000/api/admin/account/${email}`, config);
        console.log('Admin deleted:', response.data.message);

        // Optionally, update the list of admins after deletion
        this.fetchAdmins();
      } catch (error) {
        console.error('Delete request failed:', error.message);
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script>


<style scoped>
.nav
{
  font-size:30px;
 cursor:pointer;
 margin:20px;
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

#main {
  transition: margin-left .5s;
  padding: 16px;
}

.new-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  cursor: pointer;
}

.new-button:hover {
  background-color: #45a049;
}

.crud-table {
  width: 100%;
  border-collapse: collapse;
}

.crud-table th, .crud-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.crud-table th {
  background-color: #f2f2f2;
}

.pagination {
  margin: 20px 0;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  padding-top: 60px;
}

  .modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .modal-content label {
    display: block; /* Make labels display as block to stack them */
    margin-bottom: 8px;
  }

  .modal-content input,
  .modal-content textarea,
  .modal-content select {
    width: calc(100% - 20px); /* Adjust width and include padding */
    padding: 8px;
    margin-bottom: 12px;
    box-sizing: border-box;
  }

  .modal-content button {
    width: 100%;
    padding: 10px 0;
    margin-top: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }

.close {
  color: #aaa;
  float: right;
  font-size: 48px;
  font-weight: bold;
}

.close:hover, .close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
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
