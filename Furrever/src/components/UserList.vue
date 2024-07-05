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
    <h1>Admin Dashboard-User List</h1>
    <span class="nav" @click="openNav">&#9776; open</span>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Profile Picture</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>
            <img :src="getProfilePictureUrl(user.profile_picture)" alt="Profile Picture" class="profile-picture"/>
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
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
import { useAdminAuthStore } from '@/store'; 

export default {
  data() {
    return {
      users: [],
      currentPage: 1,
      itemsPerPage: 10 
    };
  },
  computed: {
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.users.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.users.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchUsers();
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
    async fetchUsers() {
      try {
        const adminAuthStore = useAdminAuthStore();
        const token = adminAuthStore.token;

        if (!token) {
          throw new Error('Token not available');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:8000/api/admin/users', config);
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    getProfilePictureUrl(picture) {
      return picture ? `http://localhost:8000/images/profile_pictures/${picture}` : 'http://localhost:8000/images/default_profile_picture.png';
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
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
  width: calc(100% - 40px); 
  border-collapse: collapse;
  margin: 0 auto; 
  margin-left: 20px; 
  margin-right: 20px; 
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
  margin-top: 20px; 
}

.pagination-button {
  background-color: #6c757d; 
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px; 
  transition: background-color 0.3s;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-button:not(:disabled):hover {
  background-color: #5a6268; 
}

.pagination-info {
  margin: 0 10px;
  font-size: 16px;
}
.profile-picture {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
