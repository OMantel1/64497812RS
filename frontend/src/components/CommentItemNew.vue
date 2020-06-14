<script>
const axios = require("axios");
export default {
  name: "CommentItemNew",
  props: {
    comment: {
      type: String,
      required: true
    },
    postId: {
      type: Number,
      required: true
    },
    msgError: {
      type: String,
      required: true
    }
  },
  methods: {
    sendNewComment: function(e) {
      e.preventDefault();

      this.msgError = "";
      let error;

      if (this.comment === undefined) {
        error = "Commentaire requis";
      }

      if (error) {
        this.msgError = error;
      } else {
        console.log(sessionStorage.getItem("user"));

        let comment = {
          UserId: sessionStorage.getItem("user"),
          content: this.comment,
          PostId: this.postId
        };
        // console.log(options);
        console.log(comment);
        axios({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("key")
          },
          method: "post",
          url: "http://localhost:3000/comments/new/",
          data: comment
        })
          .then(response => {
            if (response.status === 201) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .catch(error => {
            this.msgError = error;
          });

        this.$router.go();
      }
    }
  }
};
</script>

<template>
  <div>
    <form class="newComment">
      <i class="far fa-edit"></i>
      <input
        type="text"
        v-model="comment"
        class="newComment_input"
        placeholder="Votre commentaire..."
      />
      <button v-on:click="sendNewComment" class="newComment_button">Envoyer</button>
    </form>
    <p id="alert">{{msgError}}</p>
  </div>
</template>

<style lang="scss">
$primary-color: #747474;
$main-color: #264672;
$background-color: rgb(232, 230, 230);
$old-background-color: #f7f7f7;
$important-color: #ff4a4a;
$second-color: #407ac9;
$font-family: "Jost", sans-serif;

.newComment {
  padding: 8px;
  width: 100%;
  box-sizing: border-boxs;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &_input {
    flex: 1;
    padding: 8px;
    background: white;
    border: solid lighten($primary-color, 40%) 1px;
    border-radius: 4px;
    color: $primary-color;
    margin: 0 8px;
  }
  .far {
    font-size: 16px;
  }

  &_button {
    background-color: white;
    border-radius: 8px;
    color: $primary-color;
    border: solid lighten($primary-color, 40%) 1px;
    padding: 8px;
    margin: 8px;
  }
}
</style>

