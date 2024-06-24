<template>
  <div>
    <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeIn;">
      <div class="container text-center py-5">
        <h1 class="display-4 text-white slideInDown mb-4">Services</h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item">
              <router-link class="text-white" style="text-decoration:none;"to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link class="text-white" style="text-decoration:none;"to="#">Pages</router-link>
            </li>
           <li class="breadcrumb-item " style="color:#d8ac73;"aria-current="page">
              Service
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="container-xxl py-6">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-6">
            <div class="h-100">
              <p class="text-uppercase mb-2" style="color:#d8ac73">About Us</p>
              <h1 class="display-6 mb-4">We Bake Every Item From The Core Of Our Hearts</h1>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
              <div class="row g-2 mb-4">
                <div class="col-sm-6">
                  <i class="fa fa-check text-primary me-2"></i>Quality Products
                </div>
                <div class="col-sm-6">
                  <i class="fa fa-check text-primary me-2"></i>Custom Products
                </div>
                <div class="col-sm-6">
                  <i class="fa fa-check text-primary me-2"></i>Online Order
                </div>
                <div class="col-sm-6">
                  <i class="fa fa-check text-primary me-2"></i>Home Delivery
                </div>
              </div>
              <a class="btn rounded-pill py-3 px-5" style="background-color:#d8ac73" href="">Read More</a>
            </div>
          </div>

          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;">
            <div class="row img-twice position-relative h-100">
              <div class="color-layer-between"></div>
              <div class="col-6">
                <img class="img-fluid rounded zoom-on-hover" src="../image/catside.jpg" alt="">
              </div>
              <div class="col-6 align-self-end custom-position">
                <img class="img-fluid rounded zoom-on-hover" src="../image/brownbunny.jpg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-xl py-6">
      <div class="container">
        <div class="row gy-4 justify-content-center" data-aos="zoom-in">
          <div v-for="service in services" :key="service.id" class="col-lg-3 custom-card">
            <div class="card bg-custom px-4 custom-card-spacing">
              <h4 class="py-2">{{ service.service_name }}</h4>
              <ul class="py-3 list-unstyled">
                <li v-for="(sentence, index) in splitDescription(service.description)" :key="index" class="mb-3">
                  <font-awesome-icon :icon="['fas', 'paw']" class="me-2" /> {{ sentence }}
                </li>
              </ul>
              <h4 class="py-3">${{ service.price }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPaw);

export default {
  props: ['categoryId'],
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      services: [],
    };
  },
  watch: {
    categoryId: 'fetchServices'
  },
  mounted() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      if (this.categoryId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/categories/${this.categoryId}/services`);
          this.services = response.data;
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      }
    },
    splitDescription(description) {
      // Split description into sentences based on periods
      return description.split('. ').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
    }
  },
};
</script>

<style scoped>
* {

  font-family: 'Quicksand', sans-serif;
}

.custom-card {
   margin: 0 15px; /* Add horizontal margin for spacing */
  width: calc(50% - 30px);  /* Adjust width to fit two cards with margin */
}

.bg-custom {
    background-color: #c4c8b2; /* Set custom background color */
}
.page-header {
    background: url('../image/header.jpg') no-repeat center center;
    background-size: cover;
    position: relative;
    z-index: 1;
}

.page-header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3); 
    z-index: -1;
}

.img-twice {
    position: relative;
}

.color-layer-between {
    position: absolute;
    top: 52%;
    
    left: 150px;
    width: 50%;
    height: 470px; 
    background-color:#d8ac73; 
    transform: translateY(-50%);
    z-index: -1; 
    border-radius:10px;
}

.color-layer-below {
    position: absolute;
    bottom:100px;
    left: 250px;
    width: 50%;
    height: 200px; 
    background-color:  #c4c8b2; 
    z-index: -1; 
     border-radius:10px;
}

.img-twice .col-6 img {
    position: relative;
    z-index: 1; 
}
.zoom-on-hover {
    transition: transform 0.3s ease; 
}

.zoom-on-hover:hover {
    transform: scale(1.05);
}
.container-xxl.py-6 {
    padding-top: 4rem; 
    padding-bottom: 4rem; 
    min-height: 800px; 
}
.custom-position {
   
    position: relative; 
    top: 60px; 
    right: 10px; 
    margin-bottom:40px;
}


.custom-position img {
    margin-top: 40px; 
}
.custom-card-spacing {
  margin-bottom: 20px;
}
</style>
