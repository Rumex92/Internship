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
            <li class="breadcrumb-item"  aria-current="page">
              Services
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <section class="services d-flex align-items-center py-5" id="services">
      <div class="container text-light">
        <div class="text-center text-black">
          <p style="color:#d8ac73">OUR SERVICES</p>
          <h2 class="py-2">Explore unlimited possibilities</h2>
          <p class="para-light" style="margin-bottom:30px;margin-top:30px;">Welcome to our Services page! Whether you have a dog or a cat, we offer a range of specialized services to meet your pet's unique needs. Please select the type of pet to explore the services we provide.</p>
        </div>
        <div class="row gy-4 py-2 d-flex justify-content-center" data-aos="zoom-in">
          <div v-for="category in categories" :key="category.id" class="col-lg-4">
            <div class="card">
         <router-link :to="{ name: 'Services', params: { categoryId: category.id } }" class="card-link">
          <div class="card text-center">
              <h4 class="py-2">{{ category.category_name }}</h4>
          </div>
         </router-link>

            </div>
          </div>
        </div> <!-- end of row -->
      </div> <!-- end of container -->
    </section>
  </div>

      <div class="review">
          <Reviews></Reviews>
      </div>
</template>

<script>
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Reviews from './Reviews.vue';

export default {
  components: {
    FontAwesomeIcon,
     Reviews,
  },
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    library.add(fas);
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8000/api/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
  },
};
</script>


<style scoped>
* {

  font-family: 'Quicksand', sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: var(--quicksand-font);
}

.text-black p,
.text-black h2,
.text-black .para-light {
    color: black;
}

h1 {
    font-size: 60px;
    font-weight: 500;
}

p,
ul,
h4 {
    margin: 0;
    padding: 0;
}

.para {
    width: 50%;
}

.para-light {
    opacity: 0.7;
}

.services .card {
    padding: 20px;
    border-radius: 0;
    border: 2px solid white;
    background-color: #a6b7aa; 
}

.services .card:hover {
    border: 10px solid #7d896e;
    transform: scale(1.01);
    border-image-slice: 1;
    border-width: 2px;
    box-shadow: 5px 5px 0px 0px  #a6b7aa;
}

.services .row {
    display: flex;
    justify-content: center;
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
.review{
      width: 80%;
  min-height: 300px;
  margin: 40px auto; /* Centering the card horizontally */
  background: #f5edd6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
  .card-link {
    text-decoration: none;
    color: inherit;
  }

  .card h4.text-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
   .card-link .card {
    cursor: pointer;
  }
</style>
