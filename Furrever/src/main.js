import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import router from './router'
import { createPinia } from 'pinia'


import Nav from './components/Nav.vue';
import Home from './components/Home.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faCog, faUser } from '@fortawesome/free-solid-svg-icons';

const pinia = createPinia()

createApp(App)
    .use(bootstrap)
    .use(router)
    .use(pinia)
    .mount('#app')


const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app










