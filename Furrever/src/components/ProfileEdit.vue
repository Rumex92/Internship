<template>
  <div class="container-xxl py-6">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-8 offset-lg-2">
          <div class="card">
            <div class="card-header">
              <h4>Edit Profile</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="updateProfile">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" id="name" v-model="name" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="profile_picture" class="form-label">Profile Picture</label>
                  <input type="file" id="profile_picture" @change="onFileChange" class="form-control">
                  <!-- Display selected image -->
              <img v-if="profilePicturePreview" :src="profilePicturePreview" alt="Profile Picture Preview" class="img-thumbnail mt-3" :style="{ maxWidth: '200px', maxHeight: '200px' }">
                </div>
                 <router-link to="/profile" class="btn" style="margin-right:10px;background-color:#d8ac73;color:#fff;">Back to Profile</router-link>
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </form>
              <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
              <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
            </div>
          </div>
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
      name: '',
      profilePicture: null,
      profilePicturePreview: '', // To display selected image preview
      successMessage: '',
      errorMessage: '',
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token'); // or wherever you store the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get('http://localhost:8000/api/user-profile', config);
      this.name = response.data.name;
    } catch (error) {
      console.error('Failed to fetch user profile:', error.response);
      this.errorMessage = error.response ? error.response.data.message : 'Failed to fetch user profile';
    }
  },
  methods: {
    onFileChange(event) {
      this.profilePicture = event.target.files[0];
      // Update image preview
      this.profilePicturePreview = URL.createObjectURL(this.profilePicture);
    },
    async updateProfile() {
      try {
        const token = localStorage.getItem('token'); // or wherever you store the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        };
        const formData = new FormData();
        formData.append('name', this.name);
        if (this.profilePicture) {
          formData.append('profile_picture', this.profilePicture);
        }
        
        const response = await axios.post('http://localhost:8000/api/update-profile', formData, config);
        console.log('Profile update successful:', response.data);
        this.successMessage = 'Profile updated successfully!';
        this.errorMessage = '';
        // Optionally, update local state or Vuex store with the new profile data
      } catch (error) {
        console.error('Error updating profile:', error.response);
        this.errorMessage = error.response ? error.response.data.message : 'Failed to update profile.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
.alert {
  margin-top: 10px;
}
.btn-primary {
  background-color: #A1AF95;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #8e9c81;
}

</style>
