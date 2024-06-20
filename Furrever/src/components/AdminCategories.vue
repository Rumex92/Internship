<template>
  <div>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
      <a href="#">Services</a>
      <router-link to="/admin/categories">Service Category</router-link>
      <router-link to="/admin/bookings">Admin Bookings</router-link>
      <a href="javascript:void(0)" @click="logout">Logout</a>
    </div>

    <h2>Admin Dashboard - Categories</h2>

    <span style="font-size:30px;cursor:pointer" @click="openNav">&#9776; open</span>

    <div id="main">
      <button @click="addCategory" class="new-button">New</button>

      <table class="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in paginatedCategories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.category_name }}</td>
            <td>
              <button @click="editCategory(category.id)">Edit</button>
              <button @click="deleteCategory(category.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
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
      try {
        await adminAuthStore.logout();
        this.$router.push('/admin/auth/login'); // Redirect to login page
      } catch (error) {
        console.error('Logout failed:', error.message || 'Unknown error');
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
/* Add your styles here */
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

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover, .close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
