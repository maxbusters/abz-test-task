<template>
  <header class="header">
    <div class="header__container">
      <div class="header__wrapper">
        <div class="header__logo" @click="goTo('')">
          <LogoSvg />
        </div>
        <div class="header__nav nav">
          <span class="nav__el nav__el-users" @click="goTo('users')"
            >Users</span
          >
          <span class="nav__el nav__el-signup" @click="goTo('signup')"
            >Sign Up</span
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LogoSvg from "@/assets/images/Logo.svg";
export default {
  components: {
    LogoSvg,
  },
  methods: {
    goTo(route) {
      this.$router.push(`/${route}`, () => {});
    },
  },
};
</script>

<style></style>
