<template>
  <header class="header">
    <!-- logo -->
    <div class="header-image">
      <router-link to="/dashboard">
        <img src="../assets/icon-left-font-monochrome-white.svg" />
      </router-link>
    </div>

    <!-- liens -->
    <nav class="header-nav">
      <router-link to="/dashboard" v-if="isUserLogged" class="header-nav_links line">Forum</router-link>
      <a href="#/admin/" v-if="userRole == 1" class="header-nav_links line">Page admin</a>
      <a
        href="#/profile/"
        v-if="userRole == 0"
        class="header-nav_links line"
      >Gerer mon profil</a>
      <a href="#" @click="logOut()" class="header-nav_links" v-if="isUserLogged">Se deconnecter</a>
      <i class="fas fa-user profile-icon"></i>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    userInfos: {
      type: String
    }
  },
  data() {
    return {
      isUserLogged: "",
      userRole: ""
    };
  },
  mounted() {
    //récupère informations pour personnalisation header
    if (sessionStorage.user) {
      this.isUserLogged = sessionStorage.user;
    }
    if(localStorage.role) {
      this.userRole = localStorage.role;
    }
  },
  methods: {
    //Deconnexion, suppression des données stockées
    logOut() {
      sessionStorage.clear("user");
      sessionStorage.clear("key");
      localStorage.clear("role");
      window.location.href = "/login";
    }
  },
  watch: {
    isUserLogged() {
      this.isUserLogged = sessionStorage.user;
    },
    userRole(){
      if(localStorage.role) {
      this.userRole = localStorage.role;
    }
    }
  }
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";

//Header
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $main-color;
  padding: 16px 8px;
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
  .header {
    display: flex;
    flex-direction: column;
  }
  .header-nav {
    border-top: solid 1px white;
    margin-top: 16px;
    width: 100%;
    text-align: center;
  }
  .profile-icon {
    display: none;
  }
}
</style>