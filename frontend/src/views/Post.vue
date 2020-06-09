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

    <div class="dashboard-Items">
      <div id="post" class="post">
        <!-- <p>
          (information: l'id du post est le {{this.$route.params.id
          }})
        </p> -->

        <div class="post_header">
          <p id="post_user_id" class="post_name">Posté par {{user.User.firstname}} {{user.User.lastname}}</p>
          <p id="post_title" class="post_title">{{user.title}}</p>
        </div>
        <p id="post_content" class="post_content">{{user.content}}</p>
        <img class="post_image" :src="user.url_image" />
        <div class="post_comments">
          <ul v-if="comments.length">
            <li
              v-for="comment in comments"
              v-bind:key="comment.UserId"
            >{{comment.User.firstname}} {{comment.User.lastname}} dit: {{comment.content}}</li>
          </ul>
          <p v-else>Pas de commentaires</p>
        </div>
      </div>
    </div>d
  </div>
</template>



<script>
const axios = require("axios");

export default {
  name: "Post",
  //   components: {
  //     DashboardItems,
  //     DashboardItemNew
  //   },
  data() {
    return {
      user: {},
      comments: {}
    };
  },
  
  // computed(){
  //   generate
  // },
  mounted() {
    this.content = "loading...";
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("key")
      }
    };
    axios
      .get("http://localhost:3000/posts/" + this.$route.params.id, options)
      .then(response => {
        this.user = response.data;
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