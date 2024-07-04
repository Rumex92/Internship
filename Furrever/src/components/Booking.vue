<template>
 <div class="container-fluid page-header py-5 mb-5">
    <div class="container text-center py-5">
      <h1 class="display-4 text-white slideInDown mb-4 fade-in">Booking Process</h1>
      <nav aria-label="breadcrumb animated slideInDown fade-in">
        <ol class="breadcrumb justify-content-center mb-0">
          <li class="breadcrumb-item">
            <a class="text-white" style="text-decoration:none;" href="#">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a class="text-white" style="text-decoration:none;" href="#">Pages</a>
          </li>
          <li class="breadcrumb-item" aria-current="page">Process</li>
        </ol>
      </nav>
    </div>
  </div>
<div class="parent-container">
 <div class="container1">
        <h2>Ready to book?</h2>
        <div class="steps">
            <div class="line"></div>
            <div class="step">
                <div class="step-number">1</div>
                <div class="step-title">Create an account</div>
                <div class="step-description">Click "Book Now" to create an account.</div>
            </div>
            <div class="step">
                <div class="step-number">2</div>
                <div class="step-title">Fill out the form</div>
                <div class="step-description">Fill out the form with your pet's needs and service dates.</div>
            </div>
            <div class="step">
                <div class="step-number">3</div>
                <div class="step-title">Confirm and Submit</div>
                <div class="step-description">Review and submit your booking request.</div>
            </div>
        </div>
    </div>
</div>
<div class="book d-flex justify-content-center mt-4">
  <router-link to="/book-service" class="btn py-3 px-5 btn-hover" style="border-radius: 10px; background-color:#a6b7aa;color:#fff;">Book Now</router-link>
</div>
<div class="container-fluid overflow-hidden my-5 px-lg-0 fade-in-2">
  <div class="container feature px-lg-0">
    <div class="row g-0 mx-lg-0">
      <div class="col-lg-6 pe-lg-0" style="min-height: 400px;">
        <div class="position-relative h-100">
          <img class="position-absolute img-fluid w-60 h-40" src="../image/cat.jpg" style="object-fit: cover;" alt="">
        </div>
      </div>
      <div class="col-lg-6 feature-text py-5">
        <div class="p-lg-5 ps-lg-0" style="margin-left:30px;">
          <div class="section-title text-start">
            <h3 class="display-82 mb-2" style="color:#a6b7aa;">Payment Information</h3>
          </div>
          <p class="mb-4 pb-2">We currently accept payments in person only. Please note that we do not offer online payment options at this time. We accept cash, credit, and debit cards at our facility. We appreciate your understanding and cooperation as we work to provide the best service for you and your pets.</p>
           <div class="section-title text-start">
            <h3 class="display-8 mb-4" style="color:#a6b7aa;">Checking Booking Status</h3>
          </div>
          <p class="mb-4 pb-2">You can easily check the status of your bookings through your user profile on our website. Simply log in to access your profile, where you can view upcoming reservations. Our user-friendly interface ensures you stay informed about your pet's schedule with us.</p>
          
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

    document.querySelectorAll('.fade-in,.fade-in-1, .fade-in-2,.fade-in-3,.fade-in-4').forEach(element => {
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
.parent-container {
    display: flex;
    justify-content: center; 
    align-items: center; 
}

.container1 {
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
    text-align: center;
}      
.steps {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            position: relative;
        }
.step {
            flex: 1;
            margin: 0 10px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
.step-number {
            background-color: #a6b7aa;
            color: white;
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 50%;
            font-size: 1.5em;
            font-weight: bold;
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
.step-title {
            font-size: 1.2em;
            margin: 10px 0;
            font-weight: bold;
        }
.step-description {
            font-size: 0.9em;
            color: #666;
        }
.line {
            position: absolute;
            top: 20px;
            left: 10%;
            right: 10%;
            height: 2px;
            background-color: black;
            z-index: 0;
        }
</style>