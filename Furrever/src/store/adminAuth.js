import { defineStore } from 'pinia';
import axios from 'axios';

export const useAdminAuthStore = defineStore('adminAuth', {
  state: () => ({
    token: localStorage.getItem('admin_access_token') || null,
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
        const response = await axios.post('http://localhost:8000/api/admin/login', {
          email: email,
          password: password,
        });

        const data = response.data;
        console.log("Admin login data: ", data);

        if (data.access_token) {
          this.setToken(data.access_token);
          this.email = email;
          return data;
        } else {
          console.error('Login failed:', data.message || 'Invalid credentials');
          throw new Error(data.message || 'Invalid credentials');
        }
      } catch (error) {
        console.error('Login failed:', error.message || 'Unknown error');
        throw error;
      }
    },

    
    async logout() {
      try {
        const response = await axios.post('http://localhost:8000/api/admin/logout', {}, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        
        if (response.status === 200) {
          this.clearToken();
          console.log('Logout successful');
        } else {
          console.error('Unexpected response status during logout:', response.status);
        }
      } catch (error) {
        console.error('Logout failed:', error.message || 'Unknown error');
        throw error;
      }
    },

    setToken(token) {
      this.token = token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('admin_access_token', token);
    },

    clearToken() {
      this.token = null;
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('admin_access_token');
    },

    initialize() {
      const token = localStorage.getItem('admin_access_token');
      if (token) {
        this.setToken(token);
      }
    }
  }
});
