<template>
  <div id="app" class="">
    <!-- <div id="nav">
      <router-link to="/home">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">

$primary-color: #747474;
$main-color: #264672;
$background-color: rgb(206, 206, 206);
$old-background-color: #F7F7F7;
$important-color: #FF4A4A;
$second-color: #407AC9;
$font-family: 'Jost', sans-serif;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  font-size: 16px;
}

.container {
  min-height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
  background-color: #264672;
}


.auth {
  padding: 8px;
  letter-spacing:0.9px;
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
.underline-disable{
  text-decoration: none;
}

</style>
