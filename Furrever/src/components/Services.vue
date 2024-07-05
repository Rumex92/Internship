<template>
  <div>
    <div class="container-fluid page-header py-5 mb-5">
      <div class="container text-center py-5">
        <h1 class="display-4 text-white slideInDown mb-4 fade-in">Services</h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item">
              <router-link class="text-white" style="text-decoration:none;"to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link class="text-white" style="text-decoration:none;"to="#">Pages</router-link>
            </li>
           <li class="breadcrumb-item " aria-current="page">
              Service
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="container-xxl py-6 fade-in">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-6">
            <div class="h-100">
              <h2 class="display-8 mb-4"style="color:#a6b7aa;">Our Services</h2>
              <p>At Furrever, we offer a range of high-quality services to meet the needs of your beloved pets. Our experienced and compassionate team is dedicated to providing the best care possible, ensuring your pets are happy, healthy, and well-cared for.</p>
                 <h2 class="display-8 mb-4"style="color:#a6b7aa;">Payment Information</h2>
              <p>We currently accept payments in person only. Please note that we do not offer online payment options at this time. We accept cash, credit, and debit cards at our facility. We appreciate your understanding and cooperation as we work to provide the best service for you and your pets.</p>
              <router-link to="/book-service"  class="btn btn-primary py-3 px-5 " style="border-radius: 10px; background-color:#a6b7aa;color:#fff;">Make a Booking</router-link>
              </div>
          </div>

          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;">
            <div class="row img-twice position-relative h-100">
              <div class="color-layer-between"></div>
              <div class="col-6">
                <img class="img-fluid rounded zoom-on-hover" src="../image/4.jpg" alt="">
              </div>
              <div class="col-6 align-self-end custom-position">
                <img class="img-fluid rounded zoom-on-hover" src="../image/2.jpg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <div class="container-xl py-6" >
   <div class="container">
    <div class="row gy-5 justify-content-center" >
      <div v-for="service in services" :key="service.id" class="col-lg-3 custom-card">
        <div class="card bg-custom px-4 custom-card-spacing shadow-sm h-100 ">
          <div class="card-body d-flex flex-column" >
            <div class="mb-auto">
              <h3 class="card-title py-2">{{ service.service_name }}</h3>
              <ul class="py-3 list-unstyled">
                <li v-for="(sentence, index) in splitDescription(service.description)" :key="index" class="mb-3 ">
                  <font-awesome-icon :icon="['fas', 'paw']" class="me-2" /> {{ sentence }}
                </li>
              </ul>
            </div>
            <div class="text-end">
              <h4 class="py-3" >${{ service.price }}</h4>
            </div>
          </div>
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
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

export default {
  components: {
    FontAwesomeIcon,
  },
  props: ['categoryId'],
  data() {
    return {
      services: [],
    };
  },
  created() {
    // Initialize FontAwesome icons library
    library.add(fas);
  },
mounted() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });
 
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
  margin: 0 10px 20px;
  width: calc(33.333% - 20px);
  transition: transform 0.3s ease-in-out;
  margin-bottom:20px;
  color:#fff;
}
.custom-card:hover {
  transform: scale(1.05);
}
.bg-custom {
    background-color: #a6b7aa; 
    color:#58605A;
   
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
.fade-in {
  opacity: 0;
  transform: translateY(60px); 
  transition: opacity 1.2s ease-out, transform 1.2s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0); 
}

.btn-primary {
  background-color: #a6b7aa;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #8e9c81;
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
