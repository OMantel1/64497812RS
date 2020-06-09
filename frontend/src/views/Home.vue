<template>
  <div class="home container">
    <div class="logo">
      <p>Welcome to</p>
      <img src="../assets/icon-left-font-monochrome-white.svg" />
    </div>
    <div class="auth">
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
    </div>
  </div>
</template>



<script>
export default {
  name: "home"
};
</script>



<style lang="scss">
img {
  width: 100%;
}

.logo {
  width: 300px;
  height: auto;
  margin: auto;
  padding: 16px;
  p {
    color: white;
  }
}

</style>