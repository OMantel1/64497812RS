<template>
  <div class="box">
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

    <DashboardItems
      v-for="message in messageContent"
      v-bind:key="message.UserId"
      v-bind:firstname="message.User.firstname"
      v-bind:lastname="message.User.lastname"
      v-bind:title="message.title"
      v-bind:content="message.content"
      v-bind:image="message.url_image"
      v-bind:postId="message.id"
      v-bind:comments="message.comments"
    />
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
      messageContent: [
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
      comments: [],
      actualUser: ""
    };
  },
  computed: {
    // commentsCount(){
    //   thisCount = utilisateurs.comments.length
    // }
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
        this.messageContent = response.data;
        this.comments = response.data.Comments;
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
$background-color: rgb(235, 235, 235);
$old-background-color: #f7f7f7;
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
.box {
  background-color: $old-background-color;
}

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $main-color;
  padding: 0px 8px;
  color: white;
  font-weight: 500;
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

.dashboard-Items {
  box-sizing: border-box;
  width: 60%;
  overflow: auto;
  margin: 8px auto;
}

.post {
  color: $primary-color;
  border: solid lighten($primary-color, 40%) 1px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px;
  text-decoration: none;
  background-color: white;
  display: flex;
  &_link {
    &:hover {
      background-color: darken(white, 3%);
      .post_title {
        text-decoration: underline;
      }
    }
  }

  &_aside {
    color: $primary-color;
    width: 20%;
    font-size: 12px;
    border-right: solid 1px $background-color;
    margin-right: 8px;
  }

  &_main {
    width: 80%;
  }

  &_title {
    color: black;
    font-size: 16px;
  }
  &_content {
    font-size: 14px;
  }

  &_image {
    box-sizing: border-box;
    max-width: 300px;
    margin: auto;
    display: block;
    padding: 8px;
  }

  &_comments {
    font-size: 14px;
    li {
      list-style: none;
      padding: 8px;
      margin: 8px 0;
      background-color: $background-color;
      border: solid 1px $background-color;
      border-radius: 4px;
    }
    .fa-trash-alt {
     float: right;
    }
    ul {
      margin: 0;
      padding: 0 8px;
    }
  }

  &_comments {
    &-icon:before {
      font-family: "Font Awesome\ 5 Free";
      content: "\f4ad";
      font-size: 18px;
    }
  }
}

.post-width {
  width: 80%;
  margin: auto;
}
</style>
