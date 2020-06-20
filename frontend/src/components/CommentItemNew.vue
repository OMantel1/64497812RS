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
    //Envoi nouveau commantaire
    sendNewComment: function(e) {
      e.preventDefault();

      let textRegex = /^[^=*<>{}]+$/;
      this.msgError = "";
      let error;

      //test input comment
      if (this.comment === "" || this.comment == null) {
        error = "Commentaire requis";
      } else if (!textRegex.test(this.comment)) {
        error = "les caractères suivants sont interdits: = * < > { }";
      }

      //si validation ok, requete
      if (error) {
        this.msgError = error;
      } else {
        let comment = {
          UserId: sessionStorage.getItem("user"),
          content: this.comment,
          PostId: this.postId
        };
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
            this.$router.go();
            if (response.status === 201) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .catch(error => {
            this.msgError = error.response.data.error;
          });
      }
    }
  }
};
</script>

<template>
  <div>
    <!-- form nouveau commentaire-->
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
@import "../styles/_variables.scss"; 

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
    &:hover{
      background-color: $main-color;
      color: white;
    }
  }
}
</style>

