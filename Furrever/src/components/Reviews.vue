<template>
  <div class="card">
    <div class="row">
      <div class="col-10">
        <div class="comment-box ml-2">
          <h4>Submit a review</h4>
          <div class="rating">
            <input type="radio" name="rating" value="5" id="5" v-model="reviewData.rating"><label for="5">☆</label>
            <input type="radio" name="rating" value="4" id="4" v-model="reviewData.rating"><label for="4">☆</label>
            <input type="radio" name="rating" value="3" id="3" v-model="reviewData.rating"><label for="3">☆</label>
            <input type="radio" name="rating" value="2" id="2" v-model="reviewData.rating"><label for="2">☆</label>
            <input type="radio" name="rating" value="1" id="1" v-model="reviewData.rating"><label for="1">☆</label>
          </div>
          <div class="comment-area">
            <textarea class="form-control" placeholder="What is your view?" rows="4" v-model="reviewData.review"></textarea>
          </div>
          <div class="comment-btns mt-2">
            <div class="row">
              <div class="col-6">
                <button class="btn cancel btn-sm" @click="cancelComment" style="margin-right: 5px;">Clear</button>
                <button class="btn  send btn-sm" @click="sendComment" style="margin-left: 5px; ">Send </button>
              </div>
            </div>
          </div>
          <div v-if="showSuccessMessage" class="alert alert-success mt-2" role="alert">
            Review sent successfully!
          </div>
          <div v-if="showBothError" class="alert alert-danger mt-2" role="alert">
            Please select a rating and write a comment!
          </div>
          <div v-if="authError" class="alert alert-danger mt-2" role="alert">
            You need to be logged in to submit a review.
          </div>
        </div>
      </div>
    </div> 

    <div class="reviews-section mt-4">
      <h4>What our clients say</h4>
      <div v-for="review in paginatedReviews" :key="review.id" class="review">
        <p><strong>{{ review.user.name }}</strong> <span class="star-rating" v-html="getStars(review.rating)"></span></p>
        <p>{{ review.review }}</p>
      </div>

      <div class="pagination mt-3">
        <button class="btn btn-primary btn-sm" @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button class="btn btn-primary btn-sm" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/store';

export default {
  data() {
    return {
      reviewData: {
        review: '',
        rating: null
      },
      userProfile: null,
      showSuccessMessage: false,
      showBothError: false,
      authError: false,
      reviews: [],
      currentPage: 1,
      perPage: 5
    };
  },
  computed: {
    paginatedReviews() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = this.currentPage * this.perPage;
      return this.reviews.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.reviews.length / this.perPage);
    }
  },
  mounted() {
    this.fetchUserProfile();
    this.fetchReviews();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const authStore = useAuthStore();
        const config = {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        };
        
        const response = await axios.get('http://localhost:8000/api/user-profile', config);
        this.userProfile = response.data;
        console.log('User Profile:', this.userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    async fetchReviews() {
      try {
        const response = await axios.get('http://localhost:8000/api/reviews');
        this.reviews = response.data;
        console.log('Reviews:', this.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    },
    async sendComment() {
      if (!this.userProfile) {
        this.authError = true;
        return;
      }

      if (!this.reviewData.rating || !this.reviewData.review.trim()) {
        this.showBothError = true;
        return;
      }

      const reviewPayload = {
        review: this.reviewData.review,
        rating: this.reviewData.rating,
        user_id: this.userProfile.id
      };

      const authStore = useAuthStore();
      const config = {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      };

      try {
        const response = await axios.post('http://localhost:8000/api/reviews', reviewPayload, config);
        console.log('Review submitted successfully:', response.data);
        this.showSuccessMessage = true;
        this.fetchReviews(); // Fetch updated reviews after successful submission
        this.cancelComment(); // Reset the form fields
      } catch (error) {
        console.error('Error submitting review:', error);
        // Handle error (show error message, etc.)
      }
    },
    cancelComment() {
      this.reviewData.review = '';
      this.reviewData.rating = null;
      this.showSuccessMessage = false;
      this.showBothError = false;
      this.authError = false;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    getStars(rating) {
      return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }
  }
};
</script>



  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200&display=swap');

html,
body {
  height: 100%
}

body {
  display: grid;
  place-items: center;
  font-family: 'Manrope', sans-serif;
}

.card {
  position: relative;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 20px;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 6px;

}

.comment-box {
  padding: 5px;
}

.comment-area textarea {
  resize: none;
  border: 1px solid #031b4e;
}

.form-control:focus {
  color: #031b4e;
  background-color: #fff;
  border-color: #ffffff;
  outline: 0;

}

.send {
  background-color: #fff;
  border-color: #a6b7aa;
  color: #a6b7aa; 
}

.send:hover {
  background-color: #a6b7aa; 
  border-color: #a6b7aa;
  color: #fff; 
}
.cancel {
 background-color: #a6b7aa;
  border-color: #a6b7aa;
  color: #fff; 
}

.cancel:hover {
 background-color: #8B9E79; 
  border-color: #8B9E79;
  color: #fff; 
}


.rating {
  display: flex;
  margin-top: -10px;
  flex-direction: row-reverse;
  margin-left: -4px;
  float: left;
}

.rating>input {
  display: none
}

.rating>label {
  position: relative;
  width: 19px;
  font-size: 25px;
  color: #FFDF00;
  cursor: pointer;
}

.rating>label::before {
  content: "\2605";
  position: absolute;
  opacity: 0
}

.rating>label:hover:before,
.rating>label:hover~label:before {
  opacity: 1 !important
}

.rating>input:checked~label:before {
  opacity: 1
}

.rating:hover>input:checked~label:before {
  opacity: 0.4
}
.rating {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.rating input[type="radio"] {
  display: none;
}

.rating label {
  font-size: 2rem;
  color: #FFD700;
  cursor: pointer;
}
.star-rating {
  color: #FFD700;
}
.review {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
  .btn-primary {
  background-color: #a6b7aa;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #8e9c81;
}
</style>
