<script>
const axios = require("axios");
export default {
  name: "DashboardItemNew",
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    url_image: {
      type: String
    }
  },
  data() {
    return {
      isHidden: true
    };
  },

  methods: {
    sendNewContent: function(e) {
      e.preventDefault();

      this.msgError = "";
      let error;

      if (error) {
        this.msgError = error;
      } else {
        console.log(sessionStorage.getItem("user"));

        // const options = {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: "Bearer " + sessionStorage.getItem("key")
        //   }
        // };
        let user = {
          UserId: sessionStorage.getItem("user"),
          title: this.title,
          content: this.content,
          url_image: this.url_image
        };
        // console.log(options);
        console.log(user);
        axios({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("key")
          },
          method: "post",
          url: "http://localhost:3000/posts/new/",
          data: user
        })
          .then(response => {
            if (response.status === 201) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .then(function() {
            this.$router.push({ name: "dashboard" });
          });

        // axios
        //   .post("http://localhost:3000/posts/new/", options, data)

        //   .then(response => {
        //     console.log(response);
        //     // this.$router.push({ name: 'login' });
        //     // sessionStorage.setItem("key", response.data.token);
        //     // sessionStorage.setItem("user", response.data.userId);
        //   })
        //
        //   .catch(error => {
        //     // console.log(error.response);
        //     try {
        //       if (error.response.status === 401) throw "Ce mail est deja pris";
        //       if (error.response.status == 400) throw "Erreur de données";
        //       throw "Une erreur est survenue";
        //     } catch (err) {
        //       this.msgError = err;
        //     }
        //   });
      }
    }
  }
};
</script>

// UserId: req.body.UserId,
// title: req.body.title,
// content: req.body.content,
// url_image: req.body.url_image

<template>
  <div class="DashboardItemNew addContent">
    <div class="addContent_linkBox">
      <img src="../assets/icon.svg" class="addContent_logo" />
      <button v-on:click="isHidden = false" class="addContent_Link">Créer un nouveau post</button>
    </div>

    <form v-if="!isHidden" class="addContent_form">
      <a href="#" class="close-button" v-on:click="isHidden = true">×</a>
      <input type="text" v-model.lazy="title" placeholder="TITRE" />
      <input type="text" v-model.lazy="content" placeholder="VOTRE MESSAGE" />
      <input type="text" v-model.lazy="url_image" placeholder="Lien vers une image ou gif" />
      <button v-on:click="sendNewContent" class="button button-login">Envoyer</button>
      <!-- ajouter croix pour fermer boit de dialog -->
      <!-- <p>{{title}} + {{content}} +{{url_image}}</p> -->
    </form>
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

.addContent {
  padding: 16px;
  background: white;
  border: solid lighten($primary-color, 40%) 1px;
  border-radius: 4px;
  color: $primary-color;
  box-sizing: border-box;
  width: 60%;
  margin: 8px auto;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  position: relative;

  &_linkBox {
    display: flex;
  }

  &_Link {
    border: solid lighten($primary-color, 40%) 1px;
    border-radius: 4px;
    color: $primary-color;
    background-color: $background-color;
    padding: 8px 64px 8px 8px;
    margin: 0 8px;
    text-decoration: none;
    font-size: 16px;
  }
  &_logo {
    width: 40px;
    border-radius: 100%;
  }

  &_form {
    display: flex;
    flex-direction: column;
    input {
      border: solid lighten($primary-color, 40%) 1px;
      border-radius: 4px;
      color: $primary-color;
      background-color: white;
      margin: 8px 0;
      padding: 8px;
    }
  }
}

.close-button {
  text-decoration: none;
  color: black;
  width: 20px;
  height: 20px;
  text-align: center;
  position: absolute;
  right: 8px;
  top: 20px;
  &:hover {
    color: red;
  }
}
</style>

