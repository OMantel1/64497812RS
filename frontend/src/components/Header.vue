<template>
  <header id="header">
    <div class="header_image">
      <img src="../assets/icon-left-font-monochrome-white.svg" />
    </div>
    <div>
      <router-link to="/login" v-if="!userInfos" class="header_links">Login |</router-link>
      <router-link to="/signup" v-if="!userInfos" class="header_links">Signup |</router-link>
      <router-link to="/dashboard" v-if="userInfos" class="header_links">Forum |</router-link>
      <a href="#" @click="logOut()" class="header_links" v-if="userInfos">Se deconnecter |</a>
      <a href="#/admin/" v-if="userInfos.admin == 1" class="header_links">Page admin</a>
      <a href="#/profile/" v-if="userInfos.admin == 0" class="header_links">Gerer mon profil</a>

      <a href="#" v-if="role == 1">
        <i class="fas fa-users-cog"></i>
      </a>
      <a href="#" v-else>
        <i class="fas fa-user"></i>
      </a>
    </div>
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