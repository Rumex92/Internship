
<template>
  <header>
    <div class="header fixed-top bg-white shadow-sm" style="font-size: 14px; letter-spacing: 1.5px;">
      <nav class="navbar navbar-expand-lg navbar-light bg-custom-blue position-relative">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          style="transform: skew(40deg); font-size: 20px; color: white; padding-left: 40px;">Creative</router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav" style="display: flex; flex-grow: 1;">
            <!-- Add your navigation links here if needed -->
          </ul>

          <div style="transform: skew(40deg); color: white; padding-right: 20px;">
            creative@gmail.com
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script setup>
</script>
<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 0px;
}

.navbar {
  overflow: hidden;
  border-radius: 55px;
  position: relative;
  transform: skew(-40deg);
  width: 1200px;
}

.navbar::before,
.navbar::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #3368C6ff;
  z-index: -1;
  transform: skew(-40deg);
}

.navbar::before {
  left: -15px;
  border-bottom-right-radius: 15px;
}

.navbar::after {
  right: -15px;
  border-bottom-left-radius: 15px;
}

.navbar-brand,
.nav-link {
  transform: skew(40deg);
  display: block;
}

.navbar-brand {
  z-index: 1;
}

.bg-custom-blue {
  background-color: #3368C6ff;
}
</style>
