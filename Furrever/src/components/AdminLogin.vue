<template>

  <div>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <form class="login100-form validate-form" @submit.prevent="login">
            <span class="login100-form-title p-b-26">
              Admin Login
            </span>
            <span class="login100-form-title p-b-48">
              <i class="zmdi zmdi-font"></i>
            </span>
            <div class="text-danger">{{ errorMessage }}</div>
            <div class="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
              <input class="input100" type="text" v-model="email" placeholder="Email">
              <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100 validate-input" data-validate="Enter password">
              <span class="btn-show-pass">
                <i class="zmdi zmdi-eye"></i>
              </span>
              <input class="input100" type="password" v-model="password" placeholder="Password">
              <span class="focus-input100"></span>
            </div>
            <div class="container-login100-form-btn">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn"></div>
                <button class="login100-form-btn" type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAdminAuthStore } from '@/store/adminAuth';
import router from '@/router';

export default {
  setup() {
    const adminAuthStore = useAdminAuthStore();
    return { adminAuthStore };
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },

  methods: {
    async login() {
      try {
        this.errorMessage = ''; 
        const response = await this.adminAuthStore.login(this.email, this.password);

        if (response) {
          const { access_token } = response;

          // Store the access token in local storage or Vuex store
          localStorage.setItem('admin_access_token', access_token);

          // Redirect to Home page
          router.push({ name: 'AdminHome' });
        }
      } catch (error) {
        if (error.message === 'Invalid credentials') {
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    }
  }
};
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

body, html {
  height: 100%;
}

a:focus {
  outline: none!important;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

p {
  font-size: 14px;
  line-height: 1.7;
  color: #666;
  margin: 0;
}

ul, li {
  margin: 0;
  list-style-type: none;
}

input, textarea {
  outline: none;
  border: none;
}

textarea:focus, input:focus {
  border-color: transparent!important;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

input:focus:-moz-placeholder {
  color: transparent;
}

input:focus::-moz-placeholder {
  color: transparent;
}

input:focus:-ms-input-placeholder {
  color: transparent;
}

textarea:focus::-webkit-input-placeholder {
  color: transparent;
}

textarea:focus:-moz-placeholder {
  color: transparent;
}

textarea:focus::-moz-placeholder {
  color: transparent;
}

textarea:focus:-ms-input-placeholder {
  color: transparent;
}

input::-webkit-input-placeholder {
  color: #adadad;
}

input:-moz-placeholder {
  color: #adadad;
}

input::-moz-placeholder {
  color: #adadad;
}

input:-ms-input-placeholder {
  color: #adadad;
}

textarea::-webkit-input-placeholder {
  color: #adadad;
}

textarea:-moz-placeholder {
  color: #adadad;
}

textarea::-moz-placeholder {
  color: #adadad;
}

textarea:-ms-input-placeholder {
  color: #adadad;
}

button {
  outline: none!important;
  border: none;
  background: 0 0;
}

button:hover {
  cursor: pointer;
}

iframe {
  border: none!important;
}

.txt1, .txt2 {
  font-size: 13px;
  line-height: 1.5;
}

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #f2f2f2;
}

.wrap-login100 {
  width: 390px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 77px 55px 33px;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,.1);
}

.login100-form {
  width: 100%;
}

.login100-form-title {
  font-family: 'Quicksand', sans-serif;
  font-size: 30px;
  color: #333;
  line-height: 1.2;
  text-align: center;
  display: block;
}

.login100-form-title i {
  font-size: 60px;
}

.wrap-input100 {
  width: 100%;
  position: relative;
  border-bottom: 2px solid #adadad;
  margin-bottom: 37px;
}

.input100 {
  font-size: 15px;
  color: #555;
  line-height: 1.2;
  display: block;
  width: 100%;
  height: 45px;
  background: 0 0;
  padding: 0 5px;
}

.focus-input100 {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.input100:focus + .focus-input100::after {
  top: -15px;
}

.input100:focus + .focus-input100::before {
  width: 100%;
}

.has-val.input100 + .focus-input100::after {
  top: -15px;
}

.has-val.input100 + .focus-input100::before {
  width: 100%;
}

.container-login100-form-btn {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 13px;
}

.wrap-login100-form-btn {
  width: 100%;
  display: block;
  position: relative;
  z-index: 1;
  border-radius: 25px;
  overflow: hidden;
  margin: 0 auto;
}

.login100-form-bgbtn {
  position: absolute;
  z-index: -1;
  width: 300%;
  height: 100%;
  background: #a1af95;
  top: 0;
  left: -100%;
  transition: all .4s;
}

.login100-form-btn {
  font-family: 'Quicksand', sans-serif;
  font-size: 15px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 50px;
}

.wrap-login100-form-btn:hover .login100-form-bgbtn {
  left: 0;
}

@media (max-width: 576px) {
  .wrap-login100 {
    padding: 77px 15px 33px;
  }
}

.validate-input {
  position: relative;
}
</style>
