<template>
  <nav class="navbar navbar-expand-lg sticky-top custom-navbar">
    <router-link to="/" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
      <img src="../image/Logo.png" style="height: 50px; width: 70px; margin-left:80px;">
    </router-link>

    <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <div class="navbar-nav main-nav mx-auto p-4 p-lg-0">
        <li class="nav-item me-3 me-lg-0">
          <router-link class="nav-item nav-link fs-5 mx-3" :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li class="nav-item me-3 me-lg-0">
          <router-link class="nav-item nav-link fs-5 mx-3" :to="{ name: 'About' }">About</router-link>
        </li>
        <li class="nav-item me-3 me-lg-0">
          <router-link class="nav-item nav-link fs-5 mx-3" :to="{ name: 'Categories' }">Services</router-link>
        </li>
        <li class="nav-item me-3 me-lg-0">
          <router-link class="nav-item nav-link fs-5 mx-3" :to="{ name: 'Contact' }">Contact</router-link>
        </li>
        <li v-if="!authStore.isAuthenticated" class="nav-item me-3 me-lg-0">
          <router-link class="nav-item nav-link fs-5 mx-3" :to="{ name: 'Login' }">Login</router-link>
        </li>
        <li v-if="!authStore.isAuthenticated" class="nav-item me-3 me-lg-0">
          <router-link class="nav-item nav-link fs-5 mx-3" :to="{ name: 'Register' }">Register</router-link>
        </li>
      </div>
      <div class="navbar-nav ms-auto p-4 p-lg-0">
        <li v-if="authStore.isAuthenticated" class="nav-item me-3 me-lg-0">
          <router-link class="nav-item nav-link fs-5 mx-3" :to="{ name: 'Profile' }">Profile</router-link>
        </li>
        <li class="nav-item me-3 me-lg-0">
          <button class="reservation-button" @click="handleReservationClick">
            Make a Reservation
          </button>
        </li>
      </div>
    </div>
  </nav>
</template>


<script>
import { useAuthStore } from '@/store'; // Adjust the path as per your actual store setup

export default {
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  methods: {
    handleReservationClick() {
      if (this.authStore.isAuthenticated) {
        // If user is authenticated, navigate to the booking form
        this.$router.push({ name: 'BookService' }); 
      } else {
        // If user is not authenticated, navigate to the login page
        this.$router.push({ name: 'Login' }); 
      }
    }
  }
};
</script>




<style scoped>
.custom-navbar {
  font-family: 'Quicksand', sans-serif;

}

.nav-item .nav-link {
  font-family: 'Quicksand', sans-serif;
  transition: color 0.3s ease; 
}

.nav-item .nav-link:hover {
  color: #FF914D; 
  
}
.custom-navbar {
    padding-top: 1rem; 
    padding-bottom: 1rem; 
    position: sticky;
    top: 0;
    z-index: 1000; 
    background: white;
    transition: background 0.5s ease; 
    height: 70px;
}
.custom-navbar .navbar-nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-navbar .navbar-nav.ms-auto {
  margin-left: auto !important;
}
.custom-navbar .navbar-nav.main-nav {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reservation-button {
  background-color: #a6b7aa;
  color: white;
  border-radius: 10px;
  border: none; 
  padding: 10px 20px; 
  font-size: 16px; 
  cursor: pointer; 
  margin-right:30px;
}

.reservation-button:hover {
  color: #d8ac73;
}


</style>
