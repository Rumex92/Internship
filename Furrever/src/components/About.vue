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
            <li class="breadcrumb-item text-primary active" aria-current="page">
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
                <img class="img-fluid rounded zoom-on-hover" src="../image/brownbunny.jpg" alt="">
            </div>
        </div>
    </div>


            <div class="col-lg-6 ;">
                <div class="h-100">
                    <p class="text-uppercase mb-2" style="color:#d8ac73"> About Us</p>
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
        </div>
    </div>
</div>
<div class="offers">
<h1>The Purr-fect Care Plan!</h1>
</div>


<div class="about-container">
<div class="container-fluid featurs py-3">
    <div class="container py-5">
        <div class="row g-5 justify-content-center">
            <div class="col-md-6 col-lg-3">
                <div class="featurs-item text-center rounded bg-light p-4">
                    <div class="featurs-icon btn-square rounded-circle  mb-5 mx-auto">
                       <font-awesome-icon :icon="['fas', 'bone']" class="fa-3x text-white"></font-awesome-icon>
                    </div>
                    <div class="featurs-content text-center">
                        <h5 style="color:#A1AF95;">No transportation</h5>
                        <p class="mb-0" style="color:#A1AF95;">save time</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6 col-lg-3">
                <div class="featurs-item text-center rounded bg-light p-4">
                    <div class="featurs-icon btn-square rounded-circle  mb-5 mx-auto">
                       <font-awesome-icon :icon="['fas', 'dog']" class="fa-3x text-white"></font-awesome-icon>
                    </div>
                    <div class="featurs-content text-center">
                        <h5 style="color:#A1AF95;">One_one_one</h5>
                        <p class="mb-0" style="color:#A1AF95;">You can study alone</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6 col-lg-3">
                <div class="featurs-item text-center rounded bg-light p-4">
                    <div class="featurs-icon btn-square rounded-circle  mb-5 mx-auto">
                        <font-awesome-icon :icon="['fas', 'cat']" class="fa-3x text-white"></font-awesome-icon>
                    </div>
                    <div class="featurs-content text-center">
                        <h5 style="color:#A1AF95;">24/7 Support</h5>
                        <p class="mb-0" style="color:#A1AF95;">Support every time fast</p>
                    </div>
                </div>
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

export default {
    components: {
        FontAwesomeIcon,
    },
    
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
    margin:40px;
    background:#f5edd6;
}
.offers{
    text-align:center;
    color:#E48951;
}
.featurs .featurs-item .featurs-icon {
    position: relative;
    width: 120px;
    height: 120px;
    color:white;
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
    background-color:#E48951;
    
}

.rounded {
    border-radius: 10px !important;
}
</style>