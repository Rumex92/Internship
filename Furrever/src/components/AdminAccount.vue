<template>
  <div class="admin-account">
    <h2>Admin Account Management</h2>
    
    <!-- Change Password Form -->
    <form @submit.prevent="changePassword">
      <h3>Change Password</h3>
      <div class="form-group">
        <label for="currentPassword">Current Password:</label>
        <input type="password" id="currentPassword" v-model="passwordData.currentPassword" required>
      </div>
      <div class="form-group">
        <label for="newPassword">New Password:</label>
        <input type="password" id="newPassword" v-model="passwordData.newPassword" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm New Password:</label>
        <input type="password" id="confirmPassword" v-model="passwordData.confirmPassword" required>
      </div>
      <button type="submit" class="btn btn-primary">Change Password</button>
    </form>

    <!-- Delete Account Form -->
    <form @submit.prevent="deleteAccount">
      <h3>Delete Account</h3>
      <div class="form-group">
        <label for="confirmPasswordDelete">Confirm Password to Delete:</label>
        <input type="password" id="confirmPasswordDelete" v-model="deleteData.password" required>
      </div>
      <button type="submit" class="btn btn-danger">Delete Account</button>
    </form>

    <!-- Success/Error Messages -->
    <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/store';

export default {
  data() {
    return {
      passwordData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      deleteData: {
        password: ''
      },
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async changePassword() {
      try {
        const authStore = useAuthStore();
        const config = {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.put('http://localhost:8000/api/admin/account/password', this.passwordData, config);
        this.successMessage = 'Password changed successfully!';
        this.clearPasswordFields();
      } catch (error) {
        this.errorMessage = 'Failed to change password. Please check your current password.';
        console.error('Error changing password:', error);
      }
    },
    async deleteAccount() {
      try {
        const authStore = useAuthStore();
        const config = {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          },
          data: {
            password: this.deleteData.password
          }
        };

        const response = await axios.delete('http://localhost:8000/api/admin/account', config);
        this.successMessage = 'Account deleted successfully!';
        // Optionally, perform logout or redirect to login page
      } catch (error) {
        this.errorMessage = 'Failed to delete account. Please check your password.';
        console.error('Error deleting account:', error);
      }
    },
    clearPasswordFields() {
      this.passwordData.currentPassword = '';
      this.passwordData.newPassword = '';
      this.passwordData.confirmPassword = '';
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}
</style>
