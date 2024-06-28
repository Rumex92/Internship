<template>
  <div>
    <div class="container">
      <h2>Delete Admin Account</h2>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <form @submit.prevent="deleteAccount">
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-danger">Delete Account</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import { useAdminAuthStore } from '@/store';

export default {
  data() {
    return {
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async deleteAccount() {
      try {
        this.errorMessage = '';

        // Make sure you have stored the admin's token in Vuex or localStorage
        const token = localStorage.getItem('admin_access_token');

        const response = await axios.delete('http://localhost:8000/api/admin/account', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          data: {
            password: this.password
          }
        });

        if (response.status === 200) {
          // Clear admin access token from localStorage
          localStorage.removeItem('admin_access_token');

          alert('Admin account deleted successfully');
          router.push({ name: 'AdminLogin' }); // Redirect to login page after deletion
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Incorrect password';
        } else {
          this.errorMessage = 'Failed to delete admin account';
          console.error('Delete account error:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding-top: 50px;
}
</style>
