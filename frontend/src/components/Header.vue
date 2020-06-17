<template>
  <header class="header">
    <div class="header-image">
      <img src="../assets/icon-left-font-monochrome-white.svg" />
    </div>
    <!-- <i class="fas fa-bars" @click="displaymenu = true"></i> -->
    <nav class="header-nav">
      <!-- <router-link to="/login" v-if="!userInfos" class="header_links">Login |</router-link>
      <router-link to="/signup" v-if="!userInfos" class="header_links">Signup |</router-link>-->
      <router-link to="/dashboard" v-if="userInfos" class="header-nav_links line">Forum</router-link>
      <a href="#/admin/" v-if="userInfos.admin == 1" class="header-nav_links line">Page admin</a>
      <a href="#" @click="logOut()" class="header-nav_links" v-if="userInfos">Se deconnecter</a>
      <a href="#/profile/" v-if="userInfos.admin == 0" class="header-nav_links">Gerer mon profil</a>

      <i class="fas fa-users-cog profile-icon" v-if="role == 1"></i>
      <i class="fas fa-user profile-icon" v-else></i>
    </nav>
  </header>
</template>

<script>
const axios = require("axios");

export default {
  name: "Header",
  props: {
    userInfos: {
      type: String
    }
  },
  data() {
    return {
      isUserLogged: ""
    };
  },
  methods: {
    logOut: function() {
      sessionStorage.clear("user");
      sessionStorage.clear("key");
      // this.isUserLogged = "";
      this.$router.push({ name: "login" });
    },
    logIn: function() {
      this.isUserLogged = sessionStorage.user;
      console.log(this.isUserLogged);
    }
  },
  // mounted() {
  // if (sessionStorage.user) {
  //   this.isUserLogged = sessionStorage.user;
  // }
  // this.login();
  // this.logOut();
  created: function() {
    this.$nextTick(function getmessage() {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        }
      };
      axios
        .get(
          "http://localhost:3000/user/" + sessionStorage.getItem("user"),
          options
        )
        .then(userInfos => {
          this.userInfos = userInfos.data;
          console.log(userInfos.data);
        })
        .catch(error => console.log(error));
    });
  }

  // destroyed() {
  //   if (sessionStorage.user) {
  //     this.isUserLogged = sessionStorage.user;
  //   }
  // },
  // watch: {
  //   isUserLogged() {
  //     this.isUserLogged = sessionStorage.user;
  //   }
  // }
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $main-color;
  padding: 16px 8px;
  margin-bottom: 32px;
  color: white;
  font-weight: 200;
  border-bottom: solid 2px white;

  &-image {
    width: 190px;
  }

  &-nav_links {
    color: white;
    font-size: 0.8em;
    text-decoration: none;
    padding-right: 4px;

    &:hover {
      text-decoration: underline;
    }
  }

  .line:after {
    content: " |";
  }

  .fa-user,
  .fa-users-cog {
    font-size: 1.2em;
    color: white;
  }
}

@media screen and (max-width: 525px) {
  .header{
    display: flex;
    flex-direction: column;
  }
  .header-nav {
    border-top: solid 1px white;
    margin-top: 16px;
    width: 100%;
    text-align: center;
  }
  .profile-icon{
    display: none;
  }
}

// @media screen and (max-width: 525px) {
// .header-nav {
//   display: flex;
//   flex-direction: column;
//   position: absolute;
//   top: 68px;
//   left: 0;
//   background-color: $main-color;
//   padding-left: 4px;
//   border-bottom: white solid 1Px;
//   &_links{
//     border-bottom: white solid 1Px;
//   }
// }
// .profile-icon{
//   display: none;
// }
// }
</style>