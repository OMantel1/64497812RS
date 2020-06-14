<template>
  <header id="header">
    <div class="header_image">
      <img src="../assets/icon-left-font-monochrome-white.svg" />
    </div>
    <div>
      <router-link to="/login" v-if="!isUserLogged" class="header_links">Login |</router-link>
      <router-link to="/signup" v-if="!isUserLogged" class="header_links">Signup |</router-link>
      <router-link to="/dashboard" v-if="isUserLogged" class="header_links">Forum |</router-link>
      <a href="#" @click="logOut()" class="header_links" v-if="isUserLogged">Se deconnecter |</a>
      <a href="#" class="header_links" v-if="isUserLogged">Supprimer mon compte |</a>
      <a href="#/admin/" v-if="role == 1" class="header_links">Page admin</a>

      <a
        href="#"
        v-if="role == 1"
        class="logout"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <i class="fas fa-users-cog">▾</i>
      </a>
      <a href="#" v-else class="logout">
        <i class="fas fa-user">▾</i>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["prenom", "role"],
  data() {
    return {
      isUserLogged: ""
    };
  },
  methods: {
    logOut: function() {
      sessionStorage.clear("user");
      sessionStorage.clear("key");
      this.$router.go();
    }
  },
  mounted() {
    if (sessionStorage.user) {
      this.isUserLogged = sessionStorage.user;
    }
  },
  destroyed() {
    if (sessionStorage.user) {
      this.isUserLogged = sessionStorage.user;
    }
  },
  watch: {
    isUserLogged(newvalue) {
      sessionStorage.user = newvalue;
    }
  }
};
</script>