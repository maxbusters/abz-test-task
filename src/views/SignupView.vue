<template>
  <main class="main">
    <section class="main__signup signup" id="signup">
      <h2 v-if="!userAdded" class="signup__title">Working with POST request</h2>
      <h2 v-else class="signup__title">User successfully registered</h2>
      <UserAddForm />
    </section>
  </main>
</template>

<script>
import UserAddForm from "@/components/general/UserAddForm.vue";

export default {
  components: {
    UserAddForm,
  },
  computed: {
    userAdded() {
      return this.$store.getters.USER_ADDED;
    },
  },
};
</script>

<style></style>
