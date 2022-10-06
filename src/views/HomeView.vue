<template>
  <main class="main">
    <section class="main__intro intro">
      <div class="intro__container">
        <div class="intro__wrapper">
          <div class="intro__block">
            <h1 class="intro__title">
              Test assignment for front-end developer
            </h1>
            <p class="intro__subtitle">
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they'll be building web interfaces with
              accessibility in mind. They should also be excited to learn, as
              the world of Front-End Development keeps evolving.
            </p>
            <span class="intro__button" @click="goTo('signup')">Sign Up</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    goTo(route) {
      this.$router.push(`/${route}`, () => {});
    },
  },
};
</script>
