<template>
  <div class="card">
    <div class="row">
      <div class="col-6 offset-3">
        <h4>Change Password</h4>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="oldPassword">Old Password</label>
            <input type="password" class="form-control" id="oldPassword" v-model="oldPassword" required>
          </div>
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input type="password" class="form-control" id="newPassword" v-model="newPassword" required>
          </div>
          <button type="submit" class="btn btn-primary">Change Password</button>
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
      email: '',
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
          email: this.email,
          old_password: this.oldPassword,
          password: this.newPassword
        });
        console.log('Password change successful:', response.data);
        this.changePasswordSuccess = true;
        this.changePasswordError = '';
        // Optionally, reset form fields here
        this.email = '';
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
/* Add any custom styles as needed */
</style>
