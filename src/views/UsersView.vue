<template>
  <main class="main">
    <section class="main__users users" id="users">
      <h2 class="users__title">Working with GET request</h2>
      <UsersList />
    </section>
  </main>
</template>

<script>
import UsersList from "@/components/general/UsersList.vue";
export default {
  name: "UserView",
  components: {
    UsersList,
  },
};
</script>

<style></style>
