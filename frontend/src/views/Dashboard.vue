<template>
  <div>
    <header id="header">
      <section id>
        <p>Bonjour</p>
      </section>
      <div class="header_image">
        <img src="../assets/icon-left-font-monochrome-white.svg" />
      </div>
      <p href class="logout" id="profileLink">Mon profil ▾</p>
    </header>
    <DashboardItemNew />
    <div class="dashboard">
      <DashboardItems
        v-for="item in utilisateurs"
        v-bind:key="item.title"
        v-bind:firstname="item.User.firstname"
        v-bind:lastname="item.User.lastname"
        v-bind:title="item.title"
        v-bind:content="item.content"
        v-bind:image="item.url_image"
      />
    </div>
  </div>
</template>

<script>
const axios = require("axios");

import DashboardItems from "@/components/DashboardItems.vue";
import DashboardItemNew from "@/components/DashboardItemNew.vue";

export default {
  name: "Dashboard",
  components: {
    DashboardItems,
    DashboardItemNew
  },
  data() {
    return {
      utilisateurs: [
        // {
        //   user: "olivier",
        //   title: "titre de mon post",
        //   content: "mon super contenu de post"
        // },
        // {
        //   user: "liam",
        //   title: "titre de mon deuxieme post",
        //   content: "mon super contenu de troisieme post"
        // },
        // {
        //   user: "marc",
        //   title: "titre de mon post",
        //   content: "mon super contenu de post"
        // },
        // {
        //   user: "patrick",
        //   title: "titre de mon deuxieme post",
        //   content: "mon super contenu de troisieme post"
        // }
      ],
      actualUser: ""
    };
  },

  mounted() {
    this.content = "loading...";
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("key")
      }
    };
    axios
      .get("http://localhost:3000/posts/", options)
      .then(response => {
        this.utilisateurs = response.data;
        console.log(response.data);
      })
      .catch(error => console.log(error));
  },
  methods: {
    forceRerender() {
      this.title += 1;
    }
  }
};
</script>



<style lang="scss">
$primary-color: #747474;
$main-color: #264672;
$background-color: #f7f7f7;
$important-color: #ff4a4a;
$second-color: #407ac9;
$font-family: "Jost", sans-serif;

img {
  width: 100%;
}

.logo {
  max-width: 300px;
  height: auto;
  margin: auto;
  padding: 16px;
  p {
    color: white;
  }
}

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $main-color;
  padding: 0px 4px;
  color: white;
  font-weight: 700;
  border-bottom: solid 2px white;

  .header_image {
    width: 250px;
    margin: auto;
  }

  .logout {
    color: white;
    text-decoration: none;

    &:hover {
      color: $important-color;
    }
  }
}
</style>