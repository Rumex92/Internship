<template>
  <div class="admin-account">
   
    <div class="card">
      <div class="card-header">
        <h2>Change Password</h2>
        
      </div>
      <div class="card-body">
        <h4>Profile Information</h4>
        <p><strong>Name:</strong> {{ adminProfile.name }}</p>
        <p><strong>Email:</strong> {{ adminProfile.email }}</p>
        
        <!-- Change Password Form -->
        <form @submit.prevent="changePassword">
         
          
          <div class="form-group">
            <label for="currentPassword">Current Password:</label>
            <input type="password" id="currentPassword" v-model="passwordData.current_password" required>
          </div>
          <div class="form-group">
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" v-model="passwordData.new_password" required>
          </div>
          <router-link to="/admin/home" class="btn btn-primary" style="margin-right:10px;">Back</router-link>
          <button type="submit" class="btn btn-primary">Change Password</button>
        </form>

        <!-- Success and Error Messages -->
        <div v-if="successMessage" class="alert alert-success mt-2">{{ successMessage }}</div>
        <div v-if="errorMessage" class="alert alert-danger mt-2">{{ errorMessage }}</div>
        <div v-if="validationErrors.length" class="alert alert-danger mt-2">
          <ul>
            <li v-for="error in validationErrors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAdminAuthStore } from '@/store';

export default {
  data() {
    return {
      adminProfile: {},
      passwordData: {
        current_password: '',
        new_password: ''
      },
      successMessage: '',
      errorMessage: '',
      validationErrors: []
    };
  },
  methods: {
    async fetchAdminProfile() {
      try {
        const authStore = useAdminAuthStore();
        const config = {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        };

        const response = await axios.get('http://localhost:8000/api/admin/account/profile', config);
        this.adminProfile = response.data;
      } catch (error) {
        this.errorMessage = 'Failed to fetch admin profile.';
        console.error('Error fetching admin profile:', error);
      }
    },
    async changePassword() {
      try {
        const authStore = useAdminAuthStore();
        const config = {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.put('http://localhost:8000/api/admin/account/password', this.passwordData, config);
        this.successMessage = 'Password changed successfully!';
        this.errorMessage = '';
        this.validationErrors = [];
        this.clearPasswordFields();
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.validationErrors = error.response.data.errors
            ? Object.values(error.response.data.errors).flat()
            : ['Failed to change password. Please check your input.'];
        } else if (error.response && error.response.status === 401) {
          this.errorMessage = error.response.data.error;
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
          console.error('Error changing password:', error);
        }
        this.successMessage = '';
      }
    },
    clearPasswordFields() {
      this.passwordData.current_password = '';
      this.passwordData.new_password = '';
    }
  },
  mounted() {
    this.fetchAdminProfile();
  }
};
</script>

<style scoped>
.admin-account {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust to center vertically within the viewport */
}

.card {
  width: auto; /* Adjust width dynamically based on content */
  margin: 20px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add box shadow for better visibility */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
}

.alert {
  margin-top: 15px;
}
</style>
