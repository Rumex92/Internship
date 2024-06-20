import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [],
    currentPage: 1,
    perPage: 10,
  }),

  getters: {
    paginatedCategories(state) {
      const start = (state.currentPage - 1) * state.perPage;
      const end = start + state.perPage;
      return state.categories.slice(start, end);
    },
    totalPages(state) {
      return Math.ceil(state.categories.length / state.perPage);
    },
  },

  actions: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },
    async createCategory(category) {
      try {
        const response = await axios.post('http://localhost:8000/api/admin/categories', category);
        this.fetchCategories();
        return response.data.message;
      } catch (error) {
        console.error("There was an error creating the category!", error);
      }
    },
    async updateCategory(category) {
      try {
        const response = await axios.put(`http://localhost:8000/api/admin/categories/${category.id}`, category);
        this.fetchCategories();
        return response.data.message;
      } catch (error) {
        console.error("There was an error updating the category!", error);
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/categories/${id}`);
        this.categories = this.categories.filter(category => category.id !== id);
        return 'Category deleted successfully.';
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    },
    setCurrentPage(page) {
      this.currentPage = page;
    }
  }
});
