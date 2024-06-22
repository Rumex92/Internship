<template>
    <div class="container-fluid  text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeIn;">
        <div class="container py-5">
            <div class="row g-5">
           <div class="col-lg-3 col-md-6">
              <div class="d-flex flex-column align-items-start justify-content-center h-100">
                   <h1 class="m-0 text-uppercase text-white">Furrever</h1>
                   <p class="mt-3">Lorem diam sit erat dolor elitr et, diam lorem justo labore amet clita labore stet eos magna sit. Elitr dolor eirmod duo tempor lorem, elitr clita ipsum sea. Nonumy rebum et takimata ea takimata amet gubergren, erat rebum magna lorem stet eos. Diam amet et kasd eos duo dolore no.</p>
             </div>
         </div>

                <div class="col-lg-3 col-md-6">
                 <h4 class="text-light mb-4">Address</h4>
                 <p class="mb-2">
                 <font-awesome-icon :icon="['fas', 'map-marker-alt']" class="me-3" />123 Street, New York, USA
                 </p>
                 <p class="mb-2">
                 <font-awesome-icon :icon="['fas', 'phone-alt']" class="me-3" />+012 345 67890
                 </p>
                 <p class="mb-2">
                 <font-awesome-icon :icon="['fas', 'envelope']" class="me-3" />info@example.com
                 </p>
                </div>
                
               <div class="col-lg-3 col-md-6">
                 <h4 class="text-light mb-4">Quick Links</h4>
                 <ul class="quick-links">
                 <li><router-link :to="{ name: 'About' }">About Us</router-link></li>
                 <li><router-link :to="{ name: 'Categories' }">Services</router-link></li>
                 <li><router-link :to="{ name: 'Contact' }">Contact Us</router-link></li>
                 </ul>
               </div>

                <div class="col-lg-3 col-md-6">
                    <div class="row g-2">
                        <div class="col-4">
                            <img class="img-fluid bg-light rounded p-1" src="../image/catside.jpg" alt="Image">
                        </div>
                        <div class="col-4">
                            <img class="img-fluid bg-light rounded p-1" src="../image/catside.jpg" alt="Image">
                        </div>
                        <div class="col-4">
                            <img class="img-fluid bg-light rounded p-1" src="../image/catside.jpg" alt="Image">
                        </div>
                        <div class="col-4">
                            <img class="img-fluid bg-light rounded p-1" src="../image/catside.jpg" alt="Image">
                        </div>
                        <div class="col-4">
                            <img class="img-fluid bg-light rounded p-1" src="../image/catside.jpg" alt="Image">
                        </div>
                        <div class="col-4">
                            <img class="img-fluid bg-light rounded p-1" src="../image/catside.jpg" alt="Image">
                        </div>
                    </div>
                </div>
            </div>
        </div>
       <div class="container" style="padding-bottom: 20px;">
  <div class="copyright">
    <div class="row">
      <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
        © <a class="border-bottom" style="text-decoration:none;" href="#">Furrever</a>, All Right Reserved.
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCarSide, faUserShield, faExchangeAlt, faPhoneAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

library.add(faCarSide, faUserShield, faExchangeAlt, faPhoneAlt, faUsers);

export default {
    components: {
        FontAwesomeIcon,
    }

}
    ;
</script>



<style scoped>


.footer {
    background-color: #a1af95;
    background-size: cover;
}

.footer .btn.btn-social {
    margin-right: 5px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--light);
    border: 1px solid #FFFFFF;
    transition: .3s;
}

.footer .btn.btn-social:hover {
    color: var(--primary);
}

.footer .btn.btn-link {
    display: block;
    margin-bottom: 5px;
    padding: 0;
    text-align: left;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: normal;
    text-transform: capitalize;
    transition: .3s;
}

.footer .btn.btn-link::before {
    position: relative;
    content: "\f105";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    margin-right: 10px;
}

.footer .btn.btn-link:hover {
    color: var(--primary);
    letter-spacing: 1px;
    box-shadow: none;
}

.footer .copyright {
    padding: 25px 0;
    font-size: 15px;
    border-top: 1px solid rgba(256, 256, 256, .1);
}

.footer .copyright a {
    color: var(--light);
}

.footer .copyright a:hover {
    color: var(--primary);
}
.quick-links {
  list-style-type: none; 
  padding: 0; 
  
}

.quick-links li {
  margin-bottom: 10px; 
}

.quick-links li a {
  color: #fff; 
  text-decoration: none; 
  display: block; 
  padding: 5px 0; 
  transition: color 0.3s; 
}

.quick-links {
  list-style-type: none; 
  padding: 0; 
}

.quick-links li {
  margin-bottom: 10px; 
}

.quick-links li a {
  color: #fff; 
  text-decoration: none; 
  display: block; 
  padding: 5px 0;
  transition: color 0.3s; 
}

.quick-links li a:hover {
  color: #FF914D; 
}


</style>
