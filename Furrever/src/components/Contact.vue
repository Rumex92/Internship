<template>
<div class="container-fluid page-header py-5 mb-5 wow fadeIn"  style="visibility: visible; animation-delay: 0.1s; animation-name: fadeIn;">
      <div class="container text-center py-5">
        <h1 class="display-4 text-white  slideInDown mb-4">Contact Us</h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item">
              <a class="text-white" style="text-decoration:none;"href="#">Home</a>
            </li>
            <li class="breadcrumb-item">
              <a class="text-white"style="text-decoration:none;" href="#">Pages</a>
            </li>
            <li class="breadcrumb-item " aria-current="page">
              Contact
            </li>
          </ol>
        </nav>
      </div>
</div>
<div class="container-xxl py-5">
    <div class="container">
        <div class="text-center mx-auto mb-5"  style="max-width: 600px; visibility: visible; ">
            <h4 class="section-title"style="color:#d8ac73;">Contact Us</h4>
            <h1 class="display-5 mb-4" style="color:#a6b7aa;">If You Have Any Query, Please Feel Free to Contact Us</h1>
        </div>
        <div class="row g-5">
            <div class="col-lg-6"  style="visibility: visible; ">
                <div class="d-flex flex-column justify-content-between h-100">
                    <div class="bg-light d-flex align-items-center w-100 p-4 mb-4">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center " style="width: 55px; height: 55px;">
                       <font-awesome-icon :icon="['fas', 'location-dot']"class="fa-2x" />
                        </div>
                        <div class="ms-4">
                            <p class="mb-2">Address</p>
                            <h3 class="mb-0">123 Street, Yangon , Myanmar</h3>
                        </div>
                    </div>
                    <div class="bg-light d-flex align-items-center w-100 p-4 mb-4">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center " style="width: 55px; height: 55px;">
                            <font-awesome-icon :icon="['fas', 'phone']"class="fa-2x" />
                        </div>
                        <div class="ms-4">
                            <p class="mb-2">Call Us Now</p>
                            <h3 class="mb-0">+012 345 6789</h3>
                        </div>
                    </div>
                    <div class="bg-light d-flex align-items-center w-100 p-4">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center " style="width: 55px; height: 55px;">
                            <font-awesome-icon :icon="['fas', 'envelope']" class="fa-2x"/>
                        </div>
                        <div class="ms-4">
                            <p class="mb-2">Mail Us Now</p>
                            <h3 class="mb-0">info@example.com</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6"  style="visibility: visible; ">
                <iframe class="w-100 h-100" style="min-height: 450px;" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d483454.22201293496!2d95.8519097!3d16.8388795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1949e223e196b%3A0x56fbd271f8080bb4!2sYangon!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
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

body, .page-header, h1, h2, h3, h6, p, a, div {
    font-family:  'Quicksand', sans-serif;
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
.justify-content-between {
    justify-content: space-between !important;
}
.flex-column {
    flex-direction: column !important;
}
.h-100 {
    height: 100% !important;
}
.d-flex {
    display: flex !important;
}
*, *::before, *::after {
    box-sizing: border-box;
}

div {
    display: block;
    unicode-bidi: isolate;
}
.g-5, .gy-5 {
    --bs-gutter-y: 3rem;
}
.g-5, .gx-5 {
    --bs-gutter-x: 3rem;
}
.row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(var(--bs-gutter-y)* -1);
    margin-right: calc(var(--bs-gutter-x) / -2);
    margin-left: calc(var(--bs-gutter-x) / -2);
}
. {
    background-color: #252525 !important;
}
.align-items-center {
    align-items: center !important;
}
.justify-content-center {
    justify-content: center !important;
}
.flex-shrink-0 {
    flex-shrink: 0 !important;
}
.bg-light {
    background-color: #a6b7aa !important;
    color:#fff;
}
.p-4 {
    padding: 1.5rem !important;
}
.mb-4 {
    margin-bottom: 1.5rem !important;
}
.align-items-center {
    align-items: center !important;
}
.w-100 {
    width: 100% !important;
}

</style>
