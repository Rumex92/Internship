<template>
  <nav class="navbar navbar-expand-lg sticky-top custom-navbar">
    <router-link to="/" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
      <img src="../image/Furr.png" style="height: 50px; width: 70px; margin-left:80px;">
    </router-link>

    <div class="navbar-nav ms-auto" style="margin-right:80px;">
      <router-link class="nav-item nav-link fs-5 mx-3" :to="{ name: 'Register' }">Register New Account</router-link>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.custom-navbar {
  font-family: 'Quicksand', sans-serif;
  padding-top: 1rem;
  padding-bottom: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #a1af95;
  height: 70px;
}

.nav-item .nav-link {
  font-family: 'Quicksand', sans-serif;
}

</style>