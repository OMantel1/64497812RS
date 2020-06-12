<template>
  <div id="app" class>
    <Home />
  </div>
</template>

<style lang="scss">
$primary-color: #747474;
$main-color: #264672;
$background-color: rgb(206, 206, 206);
$old-background-color: #f7f7f7;
$important-color: #ff4a4a;
$second-color: #407ac9;
$font-family: "Jost", sans-serif;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: white;
}

.container {
  min-height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
  background-color: #264672;
}
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $main-color;
  padding: 8px 8px;
  color: white;
  font-weight: 200;
  border-bottom: solid 2px white;

  .header_image {
    width: 190px;
  }
  .header_links {
    color: white;
    font-size: 0.8em;
    text-decoration: none;
    padding-right: 4px;
    &:hover {
      text-decoration: underline;
    }
  }

  .logout {
    color: white;
    text-decoration: none;
    .fa-user,
    .fa-users-cog {
      font-size: 1.2em;
    }

    &:hover {
      color: $important-color;
    }
  }
}

.auth {
  padding: 8px;
  letter-spacing: 0.9px;
  text-align: center;
  a {
    font-weight: bold;
    color: rgb(212, 211, 211);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: white;
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