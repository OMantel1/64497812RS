<template>
  <div>
    <div id="post" class="post post-width">
      <p id="post_user_id" class="post_aside">
        Posté par
        <br />
        {{user.User.firstname}} {{user.User.lastname}}
      </p>
      <div class="post_main" :id="user.id">
        <p id="post_title" class="post_title">{{user.title}}</p>
        <p id="post_content" class="post_content">{{user.content}}</p>
        <img class="post_image" :src="user.url_image" />
        <div class="post_comments">
          <ul v-if="comments.length">
            <li v-for="comment in comments" v-bind:key="comment.UserId">
              {{comment.User.firstname}} {{comment.User.lastname}} dit: {{comment.content}} {{comment.UserId}} {{userLoggedId}}
              <a
                id="commentIdClicked"
                href="#"
                @click="deleteComment(comment.id)"
              >
                <i class="far fa-trash-alt" v-if="comment.UserId == userLoggedId"></i>
              </a>
            </li>
          </ul>
          <p v-else>Pas de commentaires</p>

          <CommentItemNew :postId="user.id" />
        </div>
      </div>
    </div>
  </div>
</template>



<script>
const axios = require("axios");
import CommentItemNew from "@/components/CommentItemNew.vue";

export default {
  name: "Post",
  components: { CommentItemNew },
  data() {
    return {
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
        console.log(response.data);
      })
      .catch(error => console.log(error));
  },
  methods: {
    forceRerender() {
      this.title += 1;
    },
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
        })
        .catch(error => console.log(error));
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