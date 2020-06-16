<template>
  <div class="post_container">
    <Header />

    <!-- Aside du post -->
    <div id="post" class="post post-width">
      <aside class="post_aside">
        <p id="post_user_id">
          Posté par
          <br />
          {{user.User.firstname}} {{user.User.lastname}}
        </p>
        <a
          v-if="user.UserId == userLoggedId"
          href="#"
          @click="deletePost(postId)"
          class="post_delete-link"
        >Supprimer ce post</a>
      </aside>

      <!-- Contenu du post -->
      <section class="post_main" :id="user.id">
        <p id="post_title" class="post_title">{{user.title}}</p>
        <p id="post_content" class="post_content">{{user.content}}</p>
        <img class="post_image" :src="user.url_image" />

        <div class="post_comments">
          <ul v-if="comments.length">
            <li v-for="comment in comments" v-bind:key="comment.UserId">
              {{comment.User.firstname}} {{comment.User.lastname}} dit: {{comment.content}} {{comment.UserId}} {{userLoggedId}}
              <a
                class="post_delete-link"
                id="commentIdClicked"
                href="#"
                @click="deleteComment(comment.id)"
              >
                <i class="far fa-trash-alt" v-if="comment.UserId == userLoggedId"></i>
              </a>
            </li>
          </ul>
          <p v-else>Pas de commentaires</p>

          <!-- Formulaire nouveau commentaire -->
          <CommentItemNew :postId="user.id" />
        </div>
      </section>
    </div>

    <!-- AJOUTER LIEN DE RETOUR VERS DASHBOARD -->
    <a href="http://localhost:8080/?#/dashboard" class="backLink">Retour vers le forum</a>
  </div>
</template>



<script>
const axios = require("axios");
import CommentItemNew from "@/components/CommentItemNew.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Post",
  components: { CommentItemNew, Header },
  data() {
    return {
      postId: "",
      user: {},
      comments: {},
      comment: {},
      userLoggedId: ""
    };
  },
  mounted() {
    this.content = "loading...";
    this.userLoggedId = sessionStorage.getItem("user");
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
        this.postId = response.data.id;
        // console.log(response.data);
        // console.log(response.data.id);
      })
      .catch(error => console.log(error));
  },
  methods: {
    deleteComment(element) {
      console.log(element);
      axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        },
        method: "DELETE",
        url: "http://localhost:3000/comments/" + element
      })
        .then(response => {
          // this.user = response.data;
          // this.comments = response.data.Comments;
          console.log(response.data);
          // this.$router.go();
        })
        .catch(error => console.log(error));
      this.$router.go();
    },

    deletePost(element) {
      console.log(element);
      axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        },
        method: "DELETE",
        url: "http://localhost:3000/posts/" + element
      })
        .then(response => {
          this.$router.push({ name: "dashboard" });
          console.log(response.data);
        })
        .catch(error => console.log(error));
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
  width: 300px;
  height: auto;
  margin: auto;
  padding: 16px;
  p {
    color: white;
  }
}

.post_delete-link {
  color: $primary-color;
  text-decoration: none;

  &:hover {
    color: red;
    text-decoration: underline;
  }
}

//A recentrer
.backLink {
  color: $primary-color;
  text-decoration: none;
  &:hover {
    color: red;
    text-decoration: underline;
  }
}
</style>