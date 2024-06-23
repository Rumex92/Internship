<template>
  <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
    <div class="card p-4">
      <div class="image d-flex flex-column justify-content-center align-items-center">
        <button class="btn btn-secondary">
          <img src="../image/img1.jpg" height="100" width="100" style="border-radius: 50%;" />
        </button>
        <span class="name mt-3">{{ user.name }}</span>
        <span class="email">{{ user.email }}</span>
        
        <div class="d-flex mt-2">
          <button class="btn btn-dark" @click="editProfile">Change Password</button>
        </div>
        <div class="d-flex mt-2">
          <button class="btn btn-dark" @click="logout">Log Out</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store'; 
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        name: '',
        email: ''
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
            Authorization: `Bearer ${localStorage.getItem('token')}` // Attach token for authentication
          }
        });

        // Update user data in the component
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error (show error message, redirect to login, etc.)
      }
    },
    editProfile() {
    this.$router.push({ name: 'ChangePassword' });
      console.log('Navigate to edit profile page or modal');
    },
   logout() {
      const authStore = useAuthStore();
      authStore.clearToken(); // Clear token from store
      // Redirect to home page
      this.$router.push({ name: 'Home' }); // Adjust the route name as per your setup
      console.log('Logged out');
    }
  }
};
</script>


<style scoped>
  body {
    background-color: #000;
  }

  .card {
    width: 350px;
    background-color: #efefef;
    border: none;
    cursor: pointer;
  }

  .btn-secondary {
    height: 140px;
    width: 140px;
    border: none;
    background-color: transparent;
  }

  .name {
    font-size: 22px;
    font-weight: bold;
  }

  .idd {
    font-size: 14px;
    font-weight: 600;
  }

  .btn1 {
    height: 40px;
    width: 150px;
    background-color: #3368c6ff;
    color: white;
    font-size: 15px;
    border-radius: 5px;
  }

  .text span {
    font-size: 13px;
    color: #545454;
    font-weight: 500;
  }
</style>
