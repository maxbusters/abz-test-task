<template>
  <div class="users__container">
    <div class="users__wrapper">
      <div class="users__layout">
        <div v-for="(user, inx) in users" :key="inx" class="users__card card">
          <div class="card__avatar" v-if="!checkPhoto(user.photo)">
            <img :src="user.photo" alt="avatar" />
          </div>
          <div class="card__avatar" v-else>
            <Placeholder />
          </div>
          <span class="card__name tooltip"
            >{{ user.name }}
            <span class="tooltiptext">{{ user.name }}</span>
          </span>
          <div class="card__info">
            <div class="tooltip">
              {{ user.position }}
              <span class="tooltiptext">{{ user.position }}</span>
            </div>
            <div class="tooltip">
              {{ user.email }}
              <span class="tooltiptext">{{ user.email }}</span>
            </div>
            <div class="tooltip">
              {{ user.phone }}
              <span class="tooltiptext">{{ user.phone }}</span>
            </div>
          </div>
        </div>
      </div>
      <span v-show="!isLastPage()" @click="nextPage()" class="users__button"
        >Show more</span
      >
    </div>
  </div>
</template>

<script>
import Placeholder from "@/assets/images/photo-cover.svg";
export default {
  components: {
    Placeholder,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  beforeMount() {
    this.updateUsers();
  },
  methods: {
    nextPage() {
      window.scrollTo(0, 0);
      this.currentPage += 1;
      this.updateUsers();
    },
    updateUsers() {
      this.$store.dispatch("GET_USERS_BY_PAGE", this.currentPage);
    },
    isLastPage() {
      if (this.currentPage >= this.pages) {
        return true;
      } else {
        return false;
      }
    },
    checkPhoto(url) {
      if (RegExp("\\bplaceholder.png\\b").test(url)) {
        return true;
      }
      return false;
    },
  },
  computed: {
    users() {
      return this.$store.getters.USERS;
    },
    pages() {
      return this.$store.getters.PAGES;
    },
    userAdded() {
      return this.$store.getters.USER_ADDED;
    },
  },
  watch: {
    userAdded: function () {
      if (this.$store.getters.USER_ADDED === true) {
        this.currentPage = 1;
        this.updateUsers();
      }
    },
  },
};
</script>

<style></style>
