<template>
  <div class="container my-5">
    <div class="card p-4 shadow-lg">
      <div class="card-body">
        <router-link :to="{ name: 'Profile' }" class="btn btn-outline-secondary mb-3">
          <i class="fas fa-arrow-left"></i> Back
        </router-link>
        <h4 class="card-title text-center mb-4">Change Password</h4>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label for="oldPassword">Old Password</label>
            <input type="password" class="form-control" id="oldPassword" v-model="oldPassword" required>
          </div>
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input type="password" class="form-control" id="newPassword" v-model="newPassword" required>
          </div>
          <button type="submit" class="btn btn-primary btn-block mt-4">Change Password</button>
        </form>
        <div v-if="changePasswordSuccess" class="alert alert-success mt-3" role="alert">
          Password changed successfully!
        </div>
        <div v-if="changePasswordError" class="alert alert-danger mt-3" role="alert">
          {{ changePasswordError }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      changePasswordSuccess: false,
      changePasswordError: ''
    };
  },
  methods: {
    async changePassword() {
      try {
        const response = await axios.post('http://localhost:8000/api/change-password', {
          old_password: this.oldPassword,
          password: this.newPassword
        });
        console.log('Password change successful:', response.data);
        this.changePasswordSuccess = true;
        this.changePasswordError = '';
        // Optionally, reset form fields here
        this.oldPassword = '';
        this.newPassword = '';
      } catch (error) {
        console.error('Error changing password:', error.response);
        this.changePasswordSuccess = false;
        this.changePasswordError = error.response.data.message || 'Failed to change password.';
      }
    }
  }
};
</script>



<style scoped>

  .card {
    max-width: 500px;
    margin: auto;
    border-radius: 10px;
  }
  .card-title {
    font-weight: bold;
    color: #007bff;
  }
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  .btn-outline-secondary {
    font-size: 0.9rem;
  }
  .form-group label {
    font-weight: bold;
  }
  .alert {
    text-align: center;
  }
</style>