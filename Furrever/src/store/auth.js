import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null, // Retrieve token from localStorage if available
    email: '',
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    }
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:8000/api/auth/login', {
          email: email,
          password: password,
        });

        const data = response.data;
        if (data.access_token) {
          this.setToken(data.access_token);
          this.email = email;
          return data; // Return data if needed in your component
        } else {
          console.error('Login failed:', data.message || 'Invalid credentials');
          throw new Error(data.message || 'Invalid credentials');
        }
      } catch (error) {
        console.error('Login failed:', error.message || 'Unknown error');
        throw error;
      }
    },

    async register(name, email, password, confirmPassword) {
      try {
        const response = await axios.post('http://localhost:8000/api/auth/register', {
          name: name,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        });
    
        if (response.status === 201) {
          const data = response.data;
          console.log('Registration successful:', data);
          return true; // Return true or data as needed
        } else {
          console.error('Unexpected response status:', response.status);
          return false; // Handle unexpected status code
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('Email already exists');
        }
        throw error;

    }
    },
    
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token); // Store token in localStorage
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    clearToken() {
      this.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
      delete axios.defaults.headers.common['Authorization'];
    }
  }
});
