<template>
  <div>
     <div id="mySidenav" class="sidenav">
      <a class="closebtn" @click="closeNav">&times;</a>
      <router-link to="/admin/home">Services</router-link>
      <router-link to="/admin/categories">Service Categories</router-link>
      <router-link to="/admin/bookings">Bookings</router-link>
      <router-link :to="{ name: 'AdminList' }">Admin List</router-link>
      <router-link :to="{ name: 'UserList' }">User List</router-link>
      <router-link :to="{ name: 'AdminAccount' }">Change Password</router-link>
      <a class="logoutbtn" @click="logout">Logout</a>
    </div>
    <h2>Admin Dashboard - Services</h2>
 <span class="nav" @click="openNav">&#9776; open</span>

    <div id="main">
      <button @click="addService" style="margin-bottom: 10px;" class="btn btn-success">Add New Service</button>

      <table class="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in paginatedServices" :key="service.id">
            <td>{{ service.id }}</td>
            <td>{{ service.service_name }}</td>
            <td>{{ service.description }}</td>
            <td>{{ getCategoryName(service.category_id) }}</td>
            <td>{{ service.price }}</td>
            <td>
              <button class="btn btn-warning" style="margin-bottom: 10px;"  @click="editService(service.id)">Edit</button>
              <button class="btn btn-danger" @click="deleteService(service.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

    <div class="pagination">
     <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1">Previous</button>
     <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    </div>

    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>{{ isEdit ? 'Edit Service' : 'Add Service' }}</h3>
        <form @submit.prevent="isEdit ? updateService() : createService()">
          <label for="service_name">Service Name:</label>
          <input type="text" v-model="form.service_name" required>

          <label for="description">Description:</label>
          <textarea v-model="form.description" required></textarea>

          <label for="category">Category:</label>
          <select v-model="form.category_id" required>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.category_name }}
            </option>
          </select>

          <label for="price">Price:</label>
          <input type="number" v-model="form.price" required>

          <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useServiceStore } from '../store/services';
import { useAdminAuthStore } from '../store/adminAuth';
import { useCategoryStore } from '../store/categories'; // Import useCategoryStore
import axios from 'axios';

export default {
  name: 'AdminServices',
  data() {
    return {
      isModalOpen: false,
      isEdit: false,
      form: {
        id: null,
        service_name: '',
        description: '',
        category_id: '',
        price: ''
      }
    };
  },

  computed: {
    services() {
      return useServiceStore().services;
    },
    currentPage() {
      return useServiceStore().currentPage;
    },
    perPage() {
      return useServiceStore().perPage;
    },
    paginatedServices() {
      return useServiceStore().paginatedServices;
    },
    totalPages() {
      return useServiceStore().totalPages;
    },
    categories() {
      return useCategoryStore().categories; // Retrieve categories from Vuex store
    }
  },

  created() {
    useServiceStore().fetchServices();
    useCategoryStore().fetchCategories(); // Fetch categories when the component is created
  },
  
  methods: {
    getCategoryName(category_id) {
      const category = this.categories.find(cat => cat.id === category_id);
      return category ? category.category_name : 'Unknown';
    },
    openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    },
   async logout() {
  const adminAuthStore = useAdminAuthStore();
  
  // Display a confirmation dialog
  const confirmation = window.confirm("Are you sure you want to log out?");
  
  if (confirmation) {
    try {
      await adminAuthStore.logout();
      this.$router.push('/admin/auth/login'); 
    } catch (error) {
      console.error('Logout failed:', error.message || 'Unknown error');
    }
  } else {
    console.log('Logout canceled by the user');
  }
},
    addService() {
      this.isEdit = false;
      this.form = {
        id: null,
        service_name: '',
        description: '',
        category_id: '',
        price: ''
      };
      this.isModalOpen = true;
    },
    editService(id) {
      const service = this.services.find(service => service.id === id);
      this.isEdit = true;
      this.form = { ...service };
      this.isModalOpen = true;
    },
    async deleteService(id) {
      try {
        await useServiceStore().deleteService(id);
       
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    },
    async createService() {
      try {
        await useServiceStore().createService(this.form);
        this.closeModal();
        
      } catch (error) {
        console.error('Error creating service:', error);
      }
    },
    async updateService() {
      try {
        await useServiceStore().updateService(this.form);
        this.closeModal();
        
      } catch (error) {
        console.error('Error updating service:', error);
      }
    },
    closeModal() {
      this.isModalOpen = false;
    },
    prevPage() {
      if (this.currentPage > 1) useServiceStore().setCurrentPage(this.currentPage - 1);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) useServiceStore().setCurrentPage(this.currentPage + 1);
    }
  }
};
</script>




<style scoped>
.nav
{
  font-size:30px;
  cursor:pointer;
  margin:20px;
}
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left .5s;
  padding: 16px;
}

.new-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  cursor: pointer;
}

.new-button:hover {
  background-color: #45a049;
}

.crud-table {
  width: 100%;
  border-collapse: collapse;
}

.crud-table th, .crud-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.crud-table th {
  background-color: #f2f2f2;
}

.pagination {
  margin: 20px 0;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  padding-top: 60px;
}

  .modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .modal-content label {
    display: block; /* Make labels display as block to stack them */
    margin-bottom: 8px;
  }

  .modal-content input,
  .modal-content textarea,
  .modal-content select {
    width: calc(100% - 20px); /* Adjust width and include padding */
    padding: 8px;
    margin-bottom: 12px;
    box-sizing: border-box;
  }

  .modal-content button {
    width: 100%;
    padding: 10px 0;
    margin-top: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }

.close {
  color: #aaa;
  float: right;
  font-size: 48px;
  font-weight: bold;
}

.close:hover, .close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px; /* Adjust as needed */
}

.pagination-button {
  background-color: #6c757d; /* Gray background color */
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px; /* Adjust the radius as needed for rounder corners */
  transition: background-color 0.3s;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-button:not(:disabled):hover {
  background-color: #5a6268; /* Slightly darker gray for hover state */
}

.pagination-info {
  margin: 0 10px;
  font-size: 16px;
}


</style>
