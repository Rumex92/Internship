<template>
<div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeIn;">
      <div class="container text-center py-5">
        <h1 class="display-4 text-white  slideInDown mb-4">About Us</h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item">
              <a class="text-white"style="text-decoration:none;" href="#">Home</a>
            </li>
            <li class="breadcrumb-item">
              <a class="text-white"style="text-decoration:none;" href="#">Pages</a>
            </li>
            <li class="breadcrumb-item "aria-current="page">
              About
            </li>
          </ol>
        </nav>
      </div>
</div>
<div class="container-xxl py-6">
    <div class="container">
       <div class="row g-5">
    <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;">
        <div class="row img-twice position-relative h-100">
            <!-- Color Layer Between Images -->
            <div class="color-layer-between"></div>
            <!-- Color Layer Below Images -->
           
            <div class="col-6">
                <img class="img-fluid rounded zoom-on-hover" src="../image/catside.jpg" alt="">
            </div>
            <div class="col-6 align-self-end custom-position">
                <img class="img-fluid rounded zoom-on-hover" src="../image/puppy2.jpg" alt="">
            </div>
        </div>
    </div>


            <div class="col-lg-6 ;">
                <div class="h-100">
                    <p class="text-uppercase mb-2" style="color:#d8ac73"> About Us</p>
                    <h3 class="display-9 mb-4"style="color:#a6b7aa;">Our Mission</h3>
                    <p>At Furrever, our mission is to provide a safe, nurturing, and stimulating environment for your beloved pets. Whether you need daycare, grooming, or boarding services, we are dedicated to offering the highest quality care tailored to meet the unique needs of each pet.</p>
                      <h4 class="display-9 mb-4"style="color:#a6b7aa;">What Sets Us Apart</h4>
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


  <div class="container-fluid overflow-hidden my-5 px-lg-0" >
    <div class="container feature px-lg-0">
        <div class="row g-0 mx-lg-0">
            <div class="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeIn;">
                <div class="p-lg-5 ps-lg-0">
                    <div class="section-title text-start">
                        <h1 class="display-5 mb-4"style="color:#a6b7aa;">Ready to Experience the Best in Pet Care?</h1>
                    </div>
                    <p class="mb-4 pb-2">We invite you to see for yourself why Furrever is the premier choice for pet daycare, grooming, and boarding. Click the button below to make a reservation and give your pet the exceptional care they deserve. We look forward to welcoming you and your furry friends to our family!</p>
                   <router-link to="/book-service" class="btn py-3 px-5 btn-hover" style="border-radius: 10px; background-color:#a6b7aa;color:#fff;">Make a Reservation</router-link>
                </div>
            </div>
            <div class="col-lg-6 pe-lg-0" style="min-height: 400px;">
                <div class="position-relative h-100">
                    <img class="position-absolute img-fluid w-100 h-100"  src="../image/cat.jpg" style="object-fit: cover; border-radius: 15px;" alt="">
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
library.add(fas); 

</script>

<style scoped>
* {

  font-family: 'Quicksand', sans-serif;
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
.about-container{
    min-height: 300px; 
    background:#027a76;
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