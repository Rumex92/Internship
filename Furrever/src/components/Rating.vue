<template>
  <div class="outer-wrapper">
    <div class="container swiper">
      <div class="slide-container">
        <div class="card-wrapper swiper-wrapper">
          <div class="card swiper-slide" v-for="review in reviews" :key="review.id">
            <div class="card-content" style="min-height: 250px; max-height: 250px;">
              <div class="header">
                <div class="name">{{ review.username }}</div>
              </div>
              <div class="stars">
                <font-awesome-icon v-for="star in review.rating" :key="star" :icon="['fas', 'star']"
                  style="color: #FFDF00;"></font-awesome-icon>
              </div>
              <p class="comment">"{{ formatComment(review.comment) }}"</p>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-button-next swiper-navBtn"></div>
      <div class="swiper-button-prev swiper-navBtn"></div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuoteLeft, faQuoteRight, faStar } from '@fortawesome/free-solid-svg-icons';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import { useClassStore } from "@/store";
library.add(faQuoteLeft, faQuoteRight, faStar);

export default {
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const classStore = useClassStore();
    classStore.fetchReviews();

    return { classStore };

  },
  computed: {
    reviews() {
      return this.classStore.reviews;
    },

  },
  methods: {
    formatComment(comment) {

      let formattedComment = comment.charAt(0).toUpperCase() + comment.slice(1);

      formattedComment = formattedComment.replace(/\. (\w)/g, (_, match) => {
        return `. ${match.toUpperCase()}`;
      });

      if (formattedComment.length > 150) {
        formattedComment = formattedComment.substring(0, 150) + "...";
      }

      return formattedComment;
    },
  },
  mounted() {

    var swiper = new Swiper(".slide-container", {
      slidesPerView: 3,
      spaceBetween: 20,
      slidesPerGroup: 3,
      loop: false,
      centerSlide: true,
      fade: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },

      },
    });
  },
};
</script>


<style scoped>
.outer-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  max-width: 800px;
  width: 100%;
  padding: 40px 0;
}

.slide-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-content {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.name {
  font-size: 18px;
  font-weight: bold;
}

.stars {
  display: flex;
  gap: 5px;
}

.comment {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}


.swiper-navBtn {
  color: #000;
  height: 40px;
  width: 40px;
  background: #fff;
  border-radius: 80%;
}

.swiper-navBtn::before,
.swiper-navBtn::after {
  font-size: 18px;
}

.swiper-pagination-bullet {
  background-color: #000;
}
</style>