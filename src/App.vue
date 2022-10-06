<template>
  <div id="app">
    <loading
      :active="loading"
      :can-cancel="false"
      :is-full-page="true"
      :loader="'spinner'"
      :opacity="1"
      :lock-scroll="true"
      :color="'#00BDD3'"
      :height="48"
      :width="48"
      :background-color="'white'"
    />
    <main-header></main-header>
    <router-view />
  </div>
</template>
<script>
import MainHeader from "./components/general/MainHeader.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: { MainHeader, Loading },
  computed: {
    loading() {
      return this.$store.getters.LOADING;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/css/app.scss";
</style>
