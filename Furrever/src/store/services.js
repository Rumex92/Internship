import { defineStore } from 'pinia';
import axios from 'axios';

export const useServiceStore = defineStore('service', {
  state: () => ({
    services: [],
    currentPage: 1,
    perPage: 10,
  }),
  getters: {
    paginatedServices(state) {
      const start = (state.currentPage - 1) * state.perPage;
      const end = start + state.perPage;
      return state.services.slice(start, end);
    },
    totalPages(state) {
      return Math.ceil(state.services.length / state.perPage);
    },
  },
  actions: {
    async fetchServices() {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/services');
        this.services = response.data;
      } catch (error) {
        console.error("There was an error fetching the services!", error);
      }
    },
    async createService(service) {
      try {
        const response = await axios.post('http://localhost:8000/api/admin/services', service);
        this.fetchServices();
        return response.data.message;
      } catch (error) {
        console.error("There was an error creating the service!", error);
      }
    },
    async updateService(service) {
      try {
        const response = await axios.put(`http://localhost:8000/api/admin/services/${service.id}`, service);
        this.fetchServices();
        return response.data.message;
      } catch (error) {
        console.error("There was an error updating the service!", error);
      }
    },
    async deleteService(id) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/admin/services/${id}`);
        this.fetchServices();
        return response.data.message;
      } catch (error) {
        console.error("There was an error deleting the service!", error);
      }
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
  },
});
