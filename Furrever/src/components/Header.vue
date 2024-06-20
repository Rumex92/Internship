<template>
  <div class="header" style="font-size: 14px; letter-spacing: 1.5px; z-index: 2;">
    <nav class="navbar navbar-expand-lg navbar-light bg-custom-blue position-relative">
      <a class="navbar-brand" href="#" style="transform: skew(40deg); font-size: 14px; color: white; padding-left: 40px;">19th street, Yangon</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" style="display: flex; flex-grow: 1;">
          <li class="nav-item active">
            <a class="nav-link" href="#" style="transform: skew(40deg); color: white;">learning@gmail.com</a>
          </li>
        </ul>
        <ul class="navbar-nav" style="display: flex; padding-right: 40px;">
          <li class="nav-item">
            <a class="nav-link" href="#" style="transform: skew(40deg); color: white; margin-left: auto;">Terms of Use</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" style="transform: skew(40deg); color: white;">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup>
</script>

<style scoped>
   .header {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
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