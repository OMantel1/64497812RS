<template>
  <div class="post_container">
    <Header />
    <div class="dashboard-Items">

      <!-- Post -->
      <div id="post" class="post">
        <!-- Auteur du post -->
        <div class="post-header">
          <div class="post_name">
            <i class="fas fa-user-circle"></i>
            <p id="post_user_id">{{user.User.firstname}} {{user.User.lastname}}</p>
          </div>
          <a
            v-if="user.UserId == userLoggedId"
            href="#"
            @click="deletePost(postId)"
            class="post_delete-link"
          >Supprimer ce post</a>
        </div>

        <!-- Contenu du post -->
        <div class="post_main">
          <p id="post_title" class="post_title">"{{user.title}}"</p>
          <p id="post_content" class="post_content">{{user.content}}</p>
          <img class="post_image" :src="user.url_image" />

          <!-- Commentaires -->
          <div class="post_comments">
            <ul v-if="comments.length">
              <li v-for="comment in comments" v-bind:key="comment.UserId">
                <span class="bold"> {{comment.User.firstname}} {{comment.User.lastname}}:</span>  {{comment.content}}
                <!-- suppression commentaire -->
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

            <!-- Formulaire nouveau commentaire  -->
            <CommentItemNew :postId="user.id" />
          </div>
        </div>
      </div>
    </div>
    <!-- Retour vers dashboard  -->
    <div>
      <a href="http://localhost:8080/?#/dashboard" class="backlink">
        <i class="far fa-arrow-alt-circle-left backlink_icon"></i>
      </a>
    </div>
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
    this.getPostElements();
    
  },
  methods: {
    getPostElements(){
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
      })
      .catch(error => console.log(error));
    },

    deleteComment(element) {
      axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        },
        method: "DELETE",
        url: "http://localhost:3000/comments/" + element
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => console.log(error));
      this.$router.go();
    },

    deletePost(element) {
      if (confirm("Supprimer ce post?")) {
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
  }
};
</script>



<style lang="scss">
@import "../styles/_variables.scss";

.post_delete-link {
  color: $primary-color;
  text-decoration: none;
  font-size: 12px;
  &:hover {
    color: red;
    text-decoration: underline;
  }
}

.post-header {
  display: flex;
  justify-content: space-between;
}

.backlink {
  color: $primary-color;
  text-decoration: none;
  padding: 16px;
  width: 20px;
  display: flex;
  margin: auto;
  &_icon {
    font-size: 30px;
    font-weight: 100;
    &:hover {
      color: $main-color;
    }
  }
}
.bold{
  font-weight: bolder;
}

</style>