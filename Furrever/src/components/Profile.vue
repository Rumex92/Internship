<template>
  <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
    <div class="card p-4">
      <div class="image d-flex flex-column justify-content-center align-items-center">
        <button class="btn btn-secondary">
          <img v-if="user.profile_picture" :src="imageUrl(user.profile_picture)" height="100" width="100" style="border-radius: 50%;" />
          <img v-else src="@/image/userHolder.jpg" height="100" width="100" style="border-radius: 50%;" />
        </button>
        <h3 class="profile-title mt-3">{{ user.name }}</h3>
        <span class="email">{{ user.email }}</span>
        <router-link to="/profile/edit" class="btn btn-primary mt-3">Edit Profile</router-link>
        <div class="button-group">
          <router-link to="/profile/booking" class="btn btn-outline-dark mt-2">View Bookings</router-link>
          <button class="btn btn-outline-dark mt-2" @click="editProfile">Change Password</button>
          <button class="btn btn-outline-danger mt-2" @click="logout">Log Out</button>
          <button class="btn btn-outline-danger mt-2" @click="deleteAccount">Delete Account</button> <!-- Delete Account Button -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/store';

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        profile_picture: '' 
      }
    };
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await axios.get('http://localhost:8000/api/user-profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Update user data in the component
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error (show error message, redirect to login, etc.)
      }
    },
    imageUrl(filename) {
     
      return `http://localhost:8000/images/profile_pictures/${filename}`;
    },
    editProfile() {
      this.$router.push({ name: 'ChangePassword' });
      console.log('Navigate to edit profile page or modal');
    },
    logout() {
      if (confirm("Are you sure you want to log out?")) {
        const authStore = useAuthStore();
        authStore.clearToken(); // Clear token from store
        // Redirect to home page
        this.$router.push({ name: 'Home' }); // Adjust the route name as per your setup
        console.log('Logged out');
      } else {
        // Do nothing if user cancels the logout
        console.log('Logout canceled');
      }
    },
    async deleteAccount() {
      if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        try {
          const response = await axios.delete(`http://localhost:8000/api/user/account`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('Account deleted:', response.data);

          // Clear the token and redirect to the home page or login page
          const authStore = useAuthStore();
          authStore.clearToken(); // Clear token from store
          this.$router.push({ name: 'Home' }); // Adjust the route name as per your setup
        } catch (error) {
          console.error('Delete request failed:', error);
          alert('Failed to delete account. Please try again.');
        }
      } else {
        console.log('Account deletion canceled');
      }
    }
  }
};
</script>

<style scoped>
.card {
  width: 350px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.btn-secondary {
  height: 140px;
  width: 140px;
  border: none;
  background-color: transparent;
}

.profile-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}

.email {
  font-size: 16px;
  font-weight: 500;
  color: #888;
  margin-top: 5px;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  width: 100%;
  max-width: 200px; /* Adjust as needed */
  margin-bottom: 10px;
}

.btn-primary {
  background-color: #a6b7aa;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #8e9c81;
}

.btn-outline-dark {
  background-color: transparent;
  color: #343a40;
  border: 1px solid #d8ac73;
}

.btn-outline-dark:hover {
  background-color: #d8ac73;
  color: white;
}

.btn-outline-danger {
  background-color: transparent;
  color: #dc3545;
  border: 1px solid #d8ac73;
}

.btn-outline-danger:hover {
  background-color: #d8ac73;
  color: white;
}
</style>
