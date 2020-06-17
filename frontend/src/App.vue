<template>
  <div id="app" class>
    <Home />
  </div>
</template>

<style lang="scss">
@import "/styles/_variables.scss"; 


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: white;
}


body {
  margin: 0;
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
}

img{
  width: 100%;
}

.container {
  min-height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
  // background-color: #264672;
}

.auth {
  padding: 8px;
  letter-spacing: 0.9px;
  text-align: center;
  a {
    font-weight: bold;
    color: $main-color;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: $important-color;
    }

    &.router-link-exact-active {
      color: #ffffff;
      text-decoration: underline;
      font-size: 18px;
    }
  }
}
.underline-disable {
  text-decoration: none;
}
</style>

<script>
import Home from "@/views/Home.vue";
export default {
  components: {
    Home
  }
};
</script>