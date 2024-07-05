<template>

  <div class="container-fluid page-header py-5 mb-5">
    <div class="container text-center py-5">
      <h1 class="display-4 text-white  mb-4 fade-in">About Us</h1>
      <nav aria-label="breadcrumb fade-in">
        <ol class="breadcrumb justify-content-center mb-0">
          <li class="breadcrumb-item">
            <a class="text-white" style="text-decoration:none;" href="#">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a class="text-white" style="text-decoration:none;" href="#">Pages</a>
          </li>
          <li class="breadcrumb-item" aria-current="page">About</li>
        </ol>
      </nav>
    </div>
  </div>

  <div class="container-xxl py-6 ">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-6 Up  " >
          <div class="row img-twice position-relative h-100">
            <div class="color-layer-between fade-in-4"></div>
            <div class="col-6  fade-in-1">
              <img class="img-fluid rounded zoom-on-hover " src="../image/catside.jpg" alt="">
            </div>
            <div class="col-6 align-self-end custom-position  fade-in-3">
              <img class="img-fluid rounded zoom-on-hover " src="../image/puppy2.jpg" alt="">
            </div>
          </div>
        </div>
        <div class="col-lg-6 fade-in">
          <div class="h-100">
                  <p class="text-uppercase mb-2" style="color:#d8ac73">About Us</p>
                  <h3 class="display-9 mb-4" style="color:#a6b7aa;">Our Mission</h3>
                  <p>At Furrever, our mission is to provide a safe, nurturing, and stimulating environment for your beloved pets. Whether you need daycare, grooming, or boarding services, we are dedicated to offering the highest quality care tailored to meet the unique needs of each pet.</p>
                  <h4 class="display-9 mb-4" style="color:#a6b7aa;">What Sets Us Apart</h4>
                  <p>Our experienced and compassionate staff is trained to handle pets of all breeds and sizes with the utmost care and attention. We pride ourselves on creating a home away from home for your furry friends, ensuring they are comfortable, entertained, and well-cared for.</p>
              <div class="row g-2 mb-4">
                <div class="col-sm-6">
                  <i class="fa fa-check text-primary me-2"></i>Experienced Staff
                </div>
              <div class="col-sm-6">
                <i class="fa fa-check text-primary me-2"></i>Top-Notch Facilities
              </div>
              <div class="col-sm-6">
                <i class="fa fa-check text-primary me-2"></i>Personalized Attention
              </div>
              <div class="col-sm-6">
                <i class="fa fa-check text-primary me-2"></i>Peace of Mind
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="about-container">
    <div class="container-fluid featurs py-3">
        <div class="container py-5 offers">
        <h1 class="title" style="color:#fff;">Services We Offer</h1>
            <div class="row g-5 justify-content-center">
                <div class="col-md-6 col-lg-3 fade-in-6">
                    <div class="featurs-item text-center rounded p-4">
                        <div class="icon-container mb-5 mx-auto">
                            <img src="../image/grooming.jpg" class="icon-image" alt="Grooming Image">
                        </div>
                        <div class="featurs-content text-center">
                            <h5 style="color:#fff;">Grooming</h5>
                            <p class="mb-0" style="color:#fff;">Keep Your Pet Looking and Feeling Great</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6 col-lg-3 fade-in-7">
                    <div class="featurs-item text-center rounded p-4">
                        <div class="icon-container mb-5 mx-auto">
                            <img src="../image/sleeping.jpg" class="icon-image" alt="Boarding Image">
                        </div>
                        <div class="featurs-content text-center">
                            <h5 style="color:#fff;">Boarding</h5>
                            <p class="mb-0" style="color:#fff;">Comfortable and Secure Overnight Stays</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6 col-lg-3 fade-in-8">
                    <div class="featurs-item text-center rounded p-4">
                        <div class="icon-container mb-5 mx-auto">
                            <img src="../image/running.jpg" class="icon-image" alt="Day Care Image">
                        </div>
                        <div class="featurs-content text-center">
                            <h5 style="color:#fff;">Day Care</h5>
                            <p class="mb-0" style="color:#fff;">Fun and Engaging Daytime Activities</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  <div class="container-fluid overflow-hidden my-5 px-lg-0 fade-in">
    <div class="container feature px-lg-0">
      <div class="row g-0 mx-lg-0">
        <div class="col-lg-6 feature-text py-5" >
          <div class="p-lg-5 ps-lg-0">
            <div class="section-title text-start">
              <h1 class="display-5 mb-4" style="color:#a6b7aa;">Ready to Experience the Best in Pet Care?</h1>
            </div>
            <p class="mb-4 pb-2">We invite you to see for yourself why Furrever is the premier choice for pet daycare, grooming, and boarding. Click the button below to make a reservation and give your pet the exceptional care they deserve. We look forward to welcoming you and your furry friends to our family!</p>
            <router-link to="/booking" class="btn py-3 px-5 button" style="border-radius: 10px; background-color:#a6b7aa;color:#fff;">How to Book</router-link>
          </div>
        </div>
        <div class="col-lg-6 pe-lg-0" style="min-height: 400px;">
          <div class="position-relative h-100">
            <img class="position-absolute img-fluid w-100 h-100" src="../image/cat.jpg" style="object-fit: cover; border-radius: 15px;" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useAuthStore } from '@/store';

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      authStore: useAuthStore(),
    };
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

    document.querySelectorAll('.fade-in,.fade-in-1, .fade-in-2,.fade-in-3,.fade-in-4,.fade-in-6,.fade-in-7,.fade-in-8').forEach(element => {
      observer.observe(element);
    });
  },
  methods: {
    handleReservationClick() {
      if (this.authStore.isAuthenticated) {
        this.$router.push({ name: 'BookService' });
      } else {
        this.$router.push({ name: 'Login' });
      }
    }
  }
};
library.add(fas);
</script>

<style scoped>
* {

  font-family: 'Quicksand', sans-serif;
}
.button {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.button:hover {
  background-color: black; 
  color: #fff; 
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
.fade-in-1 {
  opacity: 0;
  transform: translateY(60px); 
  transition: opacity 1.2s ease-out, transform 1.2s ease-out;
}
.fade-in-1.visible {
  opacity: 1;
  transform: translateY(0); 
}
.fade-in-3 {
  opacity: 0;
  transform: translateY(60px); 
  transition: opacity 1.5s ease-out, transform 1.5s ease-out;
}
.fade-in-3.visible {
  opacity: 1;
  transform: translateY(0); 
}

.fade-in-7.visible {
  opacity: 1;
  transform: translateY(0); 
}

.fade-in-7.visible {
  opacity: 1;
  transform: translateY(0); 
}

.fade-in-4{
  opacity: 0;
  transform: translateY(60px); 
  transition: opacity 1.5s ease-out, transform 1.5s ease-out;
}

.fade-in-4.visible {
  opacity: 1;
  transform: translateY(-50%); 
}
.fade-in-6 {
  opacity: 0;
  transform: translateY(80px); 
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-6.visible {
  opacity: 1;
  transform: translateY(0); 
}
.fade-in-7 {
  opacity: 0;
  transform: translateY(80px); 
  transition: opacity 0.9s ease-out, transform 0.9s ease-out;
}

.fade-in-7.visible {
  opacity: 1;
  transform: translateY(0); 
}

.fade-in-8 {
  opacity: 0;
  transform: translateY(80px); 
  transition: opacity 1.2s ease-out, transform 1.2s ease-out;
}

.fade-in-8.visible {
  opacity: 1;
  transform: translateY(0); 
}

.img-twice {
    position: relative;
}

.featurs .featurs-item .featurs-icon {
    position: relative;
    width: 120px;
    height: 120px;
}
.about-container{
  color:#fff;
}
.icon-container {
    width: 150px;
    height: 150px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-image {
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: auto;
    vertical-align: middle;
}

.icon-image.landscape {
    width: 100%;
    height: auto;
}
.btn-primary {
    color: #000;
    background-color: #d8ac73;
    border-color: #d8ac73
}

.btn-primary:hover {
    color: #000;
    background-color: #b8895e;
    border-color: #b38255
}
.about-container{
    min-height: 300px; 
    background:#a6b7aa;
}

.btn-primary:disabled,.btn-primary.disabled {
    color: #000;
    background-color: #AB7442;
    border-color: #AB7442
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
    min-height: 600px; 
}
.custom-position {
   
    position: relative; 
    top: 60px; 
    right: 10px; 
    margin-bottom:40px;
}

body, .page-header, h1, h2, h3, h6, p, a, div {
    font-family:  'Quicksand', sans-serif;
}
.custom-position img {
    margin-top: 40px; 
}

.offers{
    text-align:center;
    color:#E48951;
}
.featurs .featurs-item .featurs-icon {
    position: relative;
    width: 120px;
    height: 120px;
    color: #E48951;
;
}

.btn-square,
.btn-sm-square,
.btn-md-square,
.btn-lg-square {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: normal;
}

.btn-square {
    width: 32px;
    height: 32px;
}

.rounded-circle {
    border-radius: 50% !important;
    background-color:#fff;
    
}
.rounded {
    border-radius: 10px !important;
}
</style>