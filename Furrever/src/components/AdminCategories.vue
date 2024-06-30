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
      <h2>Admin Dashboard - Categories</h2>
    <span class="nav" @click="openNav">&#9776; open</span>
    <div id="main">
      <button @click="addCategory"  style="margin-bottom: 10px;"class="btn btn-success">Add New Category</button>
      <table class="crud-table">
        <thead>
          <tr>
         
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in paginatedCategories" :key="category.id">
        
            <td>{{ category.category_name }}</td>
            <td>
              <button class="btn btn-warning" style="margin-right: 10px;" @click="editCategory(category.id)">Edit</button>
              <button class="btn btn-danger" @click="deleteCategory(category.id)">Delete</button>
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
        <h3>{{ isEdit ? 'Edit Category' : 'Add Category' }}</h3>
        <form @submit.prevent="isEdit ? updateCategory() : createCategory()">
          <label for="category_name">Category Name:</label>
          <input type="text" v-model="form.category_name" required>
          <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoryStore } from '../store/categories';
import { useAdminAuthStore } from '../store/adminAuth';

export default {
  name: 'AdminCategories',
  data() {
    return {
      isModalOpen: false,
      isEdit: false,
      form: {
        id: null,
        category_name: '',
      }
    };
  },
  computed: {
    categories() {
      return useCategoryStore().categories;
    },
    currentPage() {
      return useCategoryStore().currentPage;
    },
    perPage() {
      return useCategoryStore().perPage;
    },
    paginatedCategories() {
      return useCategoryStore().paginatedCategories;
    },
    totalPages() {
      return useCategoryStore().totalPages;
    },
  },
  created() {
    useCategoryStore().fetchCategories();
  },
  methods: {
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
    addCategory() {
      this.isEdit = false;
      this.form = {
        id: null,
        category_name: '',
      };
      this.isModalOpen = true;
    },
    editCategory(id) {
      const category = this.categories.find(category => category.id === id);
      this.isEdit = true;
      this.form = { ...category };
      this.isModalOpen = true;
    },
    deleteCategory(id) {
      useCategoryStore().deleteCategory(id)
        .then(() => {
          // Removed alert(message);
        });
    },
    createCategory() {
      useCategoryStore().createCategory(this.form)
        .then(() => {
          this.closeModal();
          // Removed alert(message);
        });
    },
    updateCategory() {
      useCategoryStore().updateCategory(this.form)
        .then(() => {
          this.closeModal();
          // Removed alert(message);
        });
    },
    closeModal() {
      this.isModalOpen = false;
    },
    prevPage() {
      if (this.currentPage > 1) useCategoryStore().setCurrentPage(this.currentPage - 1);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) useCategoryStore().setCurrentPage(this.currentPage + 1);
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
