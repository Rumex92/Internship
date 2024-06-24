<template>
  <div>
    <div class="limiter">
      <div class="container-login100 pt-5">
        <div class="wrap-login100">
          <form class="login100-form validate-form" @submit.prevent="register">
            <span class="login100-form-title p-b-26">
              Register
            </span>
            <span class="login100-form-title p-b-48">
              <i class="zmdi zmdi-font"></i>
            </span>
            
            <!-- Name Input -->
            <div class="text-danger">{{ errors.name }}</div>
            <div class="wrap-input100 validate-input" data-validate="Enter your name">
              <input class="input100" type="text" v-model="name" placeholder="Name">
              <span class="focus-input100"></span>
            </div>
            
            <!-- Email Input -->
            <div class="text-danger">{{ errors.email }}</div>
            <div class="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
              <input class="input100" type="text" v-model="email" placeholder="Email">
              <span class="focus-input100"></span>
            </div>
            
            <!-- Password Input -->
            <div class="text-danger">{{ errors.password }}</div>
            <div class="wrap-input100 validate-input" data-validate="Enter password">
              <span class="btn-show-pass">
                <i class="zmdi zmdi-eye"></i>
              </span>
              <input class="input100" type="password" v-model="password" placeholder="Password">
              <span class="focus-input100"></span>
            </div>
            
            <!-- Confirm Password Input -->
            <div class="text-danger">{{ errors.confirmPassword }}</div>
            <div class="wrap-input100 validate-input" data-validate="Confirm password">
              <span class="btn-show-pass">
                <i class="zmdi zmdi-eye"></i>
              </span>
              <input class="input100" type="password" v-model="confirmPassword" placeholder="Confirm Password">
              <span class="focus-input100"></span>
            </div>
            
            <!-- Form Submission Button -->
            <div class="container-login100-form-btn">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn"></div>
                <button class="login100-form-btn" type="submit">
                  Register
                </button>
              </div>
            </div>
            
            <!-- Login Link -->
            <div class="text-center p-t-115">
              <span class="txt1">
                Already have an account?
              </span>
              <router-link :to="{ name: 'Login' }" class="txt2" style="text-decoration:none;">
                Log in
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/store';
import router from '@/router';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();

    // Reactive variables
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errors = ref({});

    // Method to reset form and errors
    const resetForm = () => {
      name.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
      errors.value = {};
    };

    // Method to handle registration
    const register = async () => {
      try {
        errors.value = {};

        // Validation checks
        if (!name.value) {
          errors.value.name = 'Name is required';
        }

        if (!email.value) {
          errors.value.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
          errors.value.email = 'Invalid email format';
        }

        if (!password.value) {
          errors.value.password = 'Password is required';
        } else if (password.value.length < 6) {
          errors.value.password = 'Password must be at least 6 characters long';
        }

        if (password.value !== confirmPassword.value) {
          errors.value.confirmPassword = 'Passwords do not match';
        }

        // If no validation errors, proceed with registration
        if (Object.keys(errors.value).length === 0) {
          const isSuccess = await authStore.register(name.value, email.value, password.value, confirmPassword.value);

          if (isSuccess) {
            router.push({ name: 'Home' });
            resetForm();
          }
        }
      } catch (error) {
        console.error(error);
        errors.value.email = 'Email is already registered. Please use a different email.';
      }
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      errors,
      register,
    };
  },
});
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
