<template>
  <div class="container my-5">
    <div class="card p-4 shadow-lg">
      <div class="card-body">
        <h4 class="card-title text-center mb-4" style="color:#A1AF95;">Change Password</h4>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label for="oldPassword">Old Password</label>
            <input type="password" class="form-control" id="oldPassword" v-model="oldPassword" required>
          </div>
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input type="password" class="form-control" id="newPassword" v-model="newPassword" required>
          </div>
           <router-link to="/profile" class="btn btn-block mt-4" style="margin-right:10px;background-color:#d8ac73;color:#fff;">Back to Profile</router-link>
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
import { useAuthStore } from '@/store'; // Adjust the path based on your store location

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
        const authStore = useAuthStore(); // Assuming this returns your Vuex store
        const config = {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        };

        const response = await axios.post('http://localhost:8000/api/change-password', {
          old_password: this.oldPassword,
          password: this.newPassword
        }, config);

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
  .btn-primary {
  background-color: #a6b7aa;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #8e9c81;
}
</style>