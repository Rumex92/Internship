<template>
<div class="container-fluid p-0 pb-4" >
  <div class="wave-header">
    <svg class="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#ffffff" fill-opacity="1" d="M0,224L48,240C96,256,192,288,288,298.7C384,309,480,299,576,266.7C672,235,768,181,864,170.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    
   <div class="p-lg-5 pe-lg-0">
        <div class="section-title text-start">
            <h3 class="display-3 mb-4"style="padding-top:60px;">Your Pet’s Favorite Place to Play and Stay</h3>
            <h1 class="display-3 mb-4">Welcome to Furrever</h1>
         </div>
            <p class="mb-2 pb-1 h5">Discover the ultimate pet daycare experience at Furrever. </p>
                <p class="mb-4 pb-1 h5">At Furrever, we provide a safe, loving, and fun environment for your furry friends.</p>
          
                <div class="row g-4 mb-4 pb-2">
                 </div>
             <router-link to="/about" class="btn btn-primary py-3 px-5" style="border-radius: 10px;">Explore More</router-link>
        </div>
  </div>
</div>

<div class="offers">
  <h1 class="title">Services We Offer</h1>
</div>


<div class="about-container">
<div class="container-fluid featurs py-3">
    <div class="container py-5">
        <div class="row g-5 justify-content-center">
            <div class="col-md-6 col-lg-3">
                <div class="featurs-item text-center rounded  p-4">
                    <div class="featurs-icon btn-square rounded-circle  mb-5 mx-auto">
                       <font-awesome-icon :icon="['fas', 'shower']" class="fa-3x icon"></font-awesome-icon>
                    </div>
                    <div class="featurs-content text-center">
                        <h5 style="color:#fff;">Grooming</h5>
                        <p class="mb-0" style="color:#fff;">Keep Your Pet Looking and Feeling Great</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6 col-lg-3">
                <div class="featurs-item text-center rounded  p-4">
                    <div class="featurs-icon btn-square rounded-circle  mb-5 mx-auto">
                       <font-awesome-icon :icon="['fas', 'dog']" class="fa-3x icon"></font-awesome-icon>
                    </div>
                    <div class="featurs-content text-center">
                        <h5 style="color:#fff;">Boarding</h5>
                        <p class="mb-0" style="color:#fff;">Comfortable and Secure Overnight Stays</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6 col-lg-3">
                <div class="featurs-item text-center rounded  p-4">
                    <div class="featurs-icon btn-square rounded-circle  mb-5 mx-auto">
                        <font-awesome-icon :icon="['fas', 'cat']" class="fa-3x icon"></font-awesome-icon>
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
    <div class="container" style="height:650px; padding-top:100px;color:#fff;">
         <div class="row g-3">
            <div class="row img-twice position-relative h-100" style="margin-left:55px;">
                  <!-- Color Layer Between Images -->
             <div class="color-layer-between">
          <h2 class="title" style="padding-top:40px; margin:20px;">About Us</h2>
          <p class="description" style=" margin:20px;">Welcome to Furrever, where your pet's happiness and well-being are our top priorities. Founded in 2020, our mission is to provide a safe, nurturing, and stimulating environment for your beloved pets. Whether you need daycare, grooming, or boarding services, we are dedicated to offering the highest quality care tailored to meet the unique needs of each pet.</p>
           <router-link to="/about" class="btn btn-primary py-3 px-5" style="border-radius: 10px; margin-left:20px; color:#fff;">Explore More</router-link>
        </div>
        
               
                <div class="col-6">
                 <img class="img-fluid rounded zoom-on-hover" src="../image/Doggos.jpg" alt="">
                </div>
           </div>
        </div>
    </div>

<div class="reasons">
    <h2>Our Commitment to Your Pets</h2>
    <p> " At Furrever, we are dedicated to providing exceptional care for your beloved pets. Our experienced staff, top-notch facilities, and personalized attention ensure that every pet feels safe, loved, and entertained. Trust us to provide a home away from home where your pets can thrive. "</p>
</div>



  <div class="container-fluid overflow-hidden my-5 px-lg-0" >
    <div class="container feature px-lg-0">
        <div class="row g-0 mx-lg-0">
            <div class="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeIn;">
                <div class="p-lg-5 ps-lg-0">
                    <div class="section-title text-start">
                        <h1 class="display-5 mb-4"style="color:#a6b7aa;">Why Choose Us</h1>
                    </div>
                    <p class="mb-4 pb-2">At Furrever, we pride ourselves on providing exceptional care for your pets. Each pet receives personalized attention, tailored to their individual needs and preferences, ensuring they feel comfortable during their time with us. With us, you can have peace of mind knowing that your beloved pets are in caring hands, allowing you to enjoy your time away worry-free.</p>
                    <div class="row g-4">
                        <div class="col-6">
                            <div class="d-flex align-items-center">
                                <div class="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style="width: 60px; height: 60px;">
                                    <font-awesome-icon :icon="['fas', 'paw']" style="color:#a6b7aa;"/>
                                </div>
                                <div class="ms-4">
                                    
                                    <h5 class="mb-0">Experienced Staff</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex align-items-center">
                                <div class="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style="width: 60px; height: 60px;">
                                     <font-awesome-icon :icon="['fas', 'paw']" style="color:#a6b7aa;"/>
                                </div>
                                <div class="ms-4">

                                    <h5 class="mb-0">Top-Notch Facilities</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex align-items-center">
                                <div class="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style="width: 60px; height: 60px;">
                                     <font-awesome-icon :icon="['fas', 'paw']"style="color:#a6b7aa;" />
                                </div>
                                <div class="ms-4">
                                   
                                    <h5 class="mb-0">Personalized Attention</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex align-items-center">
                                <div class="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style="width: 60px; height: 60px;">
                                    <font-awesome-icon :icon="['fas', 'paw']" style="color:#a6b7aa;"/>
                                </div>
                                <div class="ms-4">
                                    
                                    <h5 class="mb-0">Peace of Mind</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 pe-lg-0" style="min-height: 400px;">
                <div class="position-relative h-100">
                    <img class="position-absolute img-fluid w-100 h-100"  src="../image/puppy.jpg" style="object-fit: cover; border-radius: 15px;" alt="">
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


*,*::before,*::after {
    box-sizing: border-box
}

@media (prefers-reduced-motion: no-preference) {
    :root {
        scroll-behavior: smooth
    }
}
.featurs .featurs-item .featurs-icon {
    position: relative;
    width: 120px;
    height: 120px;
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
}

.rounded {
    border-radius: 10px !important;
}
.color-layer-between {
    position: absolute;
    top: 52%;
    
    left: 600px;
    width: 45%;
    height: 370px; 
    background-color:#a6b7aa; 
    transform: translateY(-50%);
    z-index: 1; 
    border-radius:10px;
}

.img-twice .col-6 img {
    position: relative;
    z-index: -1; 
}
.about-container{
    min-height: 300px; 
    background:#a6b7aa;
}
.reasons {
       display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    background: #f5edd6;
    text-align: center;
    padding: 20px;
    font-size: 1.2em;
}
.reasons h2 {
    font-size: 2em;
    margin-bottom: 20px;
     color: #d8ac73;

}
.reasons p {
    max-width: 800px; 
    margin: 0;
     color:  #a6b7aa;
}


.title {
  margin-top: 20px; /* Adjust this value to move the title down further */
  /* Additional styles for the title can be added here */
}


.wave-header {
  min-height: 80%;
  width: 100%;
  background-image: url('../image/twodogs.jpg');
  background-size: cover;
  position: relative;
  display: flex;
  color: white; 

}

.wave-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.wave-header > * {
  position: relative;
  z-index: 2;
}

.wave-header h1{
  font-size:4em;
  color:#fff;
  font-family:'Quicksand', sans-serif;
  font-weight:700;
}
 .wave-svg {
  position: absolute;
  bottom: 0;
  left: 0;
}
hr {
    margin: 1rem 0;
    color: inherit;
    background-color: currentColor;
    border: 0;
    opacity: .25
}

hr:not([size]) {
    height: 1px
}

.zoom-in {
    transition: transform 0.3s ease-in-out;
}

.zoom-in:hover {
    transform: scale(1.1);
}

h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
    margin-top: 0;
    margin-bottom: .5rem;
    font-family: 'Quicksand', sans-serif; 
    font-weight: 700;
    line-height: 1.2;
   
}

h1,.h1 {
    font-size: calc(1.375rem + 1.5vw)
}

@media (min-width: 1200px) {
    h1,.h1 {
        font-size:2.5rem
    }
}

h2,.h2 {
    font-size: calc(1.325rem + .9vw)
}

@media (min-width: 1200px) {
    h2,.h2 {
        font-size:2rem
    }
}

h3,.h3 {
    font-size: calc(1.3rem + .6vw)
}

@media (min-width: 1200px) {
    h3,.h3 {
        font-size:1.75rem
    }
}

h4,.h4 {
    font-size: calc(1.275rem + .3vw)
}

@media (min-width: 1200px) {
    h4,.h4 {
        font-size:1.5rem
    }
}

h5,.h5 {
    font-size: 1.25rem
}

h6,.h6 {
    font-size: 1rem
}

p {
    margin-top: 0;
    margin-bottom: 1rem
}

abbr[title],abbr[data-bs-original-title] {
    text-decoration: underline dotted;
    cursor: help;
    text-decoration-skip-ink: none
}


mark,.mark {
    padding: .2em;
    background-color: #fcf8e3
}

sub,sup {
    position: relative;
    font-size: .75em;
    line-height: 0;
    vertical-align: baseline
}

sub {
    bottom: -.25em
}

sup {
    top: -.5em
}

a {
    color: #AB7442;
    text-decoration: none
}

a:hover {
    color: #895d35
}

a:not([href]):not([class]),a:not([href]):not([class]):hover {
    color: inherit;
    text-decoration: none
}

.btn-primary {
    color: #fff;
    background-color: #d8ac73;
    border-color: #d8ac73;
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


.py-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important
}

.py-1 {
    padding-top: .25rem !important;
    padding-bottom: .25rem !important
}

.py-2 {
    padding-top: .5rem !important;
    padding-bottom: .5rem !important
}

.py-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important
}

.py-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important
}

.py-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important
}

.pt-0 {
    padding-top: 0 !important
}

.pt-1 {
    padding-top: .25rem !important
}

.pt-2 {
    padding-top: .5rem !important
}

.pt-3 {
    padding-top: 1rem !important
}

.pt-4 {
    padding-top: 1.5rem !important
}

.pt-5 {
    padding-top: 3rem !important
}


.pe-5 {
    padding-right: 3rem !important
}

.pb-0 {
    padding-bottom: 0 !important
}

.pb-1 {
    padding-bottom: .25rem !important
}

.pb-2 {
    padding-bottom: .5rem !important
}

.pb-3 {
    padding-bottom: 1rem !important
}

.pb-4 {
    padding-bottom: 1.5rem !important
}

.pb-5 {
    padding-bottom: 3rem !important
}

.ps-0 {
    padding-left: 0 !important
}

.ps-1 {
    padding-left: .25rem !important
}

.ps-2 {
    padding-left: .5rem !important
}

.ps-3 {
    padding-left: 1rem !important
}

.ps-4 {
    padding-left: 1.5rem !important
}

.ps-5 {
    padding-left: 3rem !important
}

 
.text-decoration-line-through {
    text-decoration: line-through !important
}
.offers{
    text-align:center;
    color:#E48951;
    margin-bottom:20px;
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
