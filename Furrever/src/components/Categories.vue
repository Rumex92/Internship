<template>
  <div>
    <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeIn;">
      <div class="container text-center py-5">
        <h1 class="display-4 text-white slideInDown mb-4">Services</h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item">
              <router-link class="text-white" to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link class="text-white" to="#">Pages</router-link>
            </li>
            <li class="breadcrumb-item text-primary active" aria-current="page">
              Services
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <section class="services d-flex align-items-center py-5" id="services">
      <div class="container text-light">
        <div class="text-center text-black">
          <p>OUR SERVICES</p>
          <h2 class="py-2">Explore unlimited possibilities</h2>
          <p class="para-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae asperiores, quia accusantium sunt corporis optio recusandae? Nostrum libero pariatur cumque, ipsa dolores voluptatibus voluptate alias sit fuga. Itaque, ea quo.</p>
        </div>
        <div class="row gy-4 py-2 d-flex justify-content-center" data-aos="zoom-in">
          <div v-for="category in categories" :key="category.id" class="col-lg-4">
            <div class="card">
              <i class="fas fa-home fa-2x"></i>
              <h4 class="py-2">{{ category.category_name }}</h4>
              <router-link :to="{ name: 'Services', params: { categoryId: category.id } }" class="btn btn-primary">View Services</router-link>
            </div>
          </div>
        </div> <!-- end of row -->
      </div> <!-- end of container -->
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    FontAwesomeIcon,
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
:root {
    --quicksand-font: 'Quicksand', sans-serif;
    --montserrat-font: 'Montserrat', sans-serif;
    --bs-gradient: linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0));
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
    background-color: #c4c8b2; 
}

.services .card:hover {
    border: 10px solid #7d896e;
    transform: scale(1.01);
    border-image-slice: 1;
    border-width: 2px;
    box-shadow: 5px 5px 0px 0px  #c4c8b2;
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
</style>
