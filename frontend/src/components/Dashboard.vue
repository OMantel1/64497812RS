<template>
  <div class="box">
    <Header />
    <!-- New post container-->
    <div class="DashboardItemNew addContent" v-if="isUserLogged">
      <!-- Form new post button-->
      <div class="addContent_linkBox">
        <img src="../assets/icon.svg" class="addContent_logo" />
        <button v-on:click="isHidden = false" class="addContent_Link">Créer un nouveau post</button>
      </div>

      <!-- Form new post-->
      <form v-if="!isHidden" class="addContent_form">
        <a href="#" class="close-button" v-on:click="isHidden = true">×</a>
        <input type="text" v-model.lazy="title" placeholder="TITRE" />
        <input type="text" v-model.lazy="content" placeholder="VOTRE MESSAGE" />
        <!-- <input type="text" v-model.lazy="url_image" placeholder="Lien vers une image ou gif" /> -->
        <input type="file" @change="onFileSelected" placeholder="upload image" />
        <button v-on:click="sendNewContent" class="button button-login">Envoyer</button>
        <p id="alert">{{msgError}}</p>
      </form>
    </div>

    <!-- posts list -->
    <DashboardItems
      v-for="message in messageContent"
      v-bind:key="message.id"
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
import Header from "@/components/Header.vue";

export default {
  name: "Dashboard",
  components: {
    Header,
    DashboardItems
    // Header
  },
  data() {
    return {
      // isUserLogged: "",
      messageContent: [],
      comments: [],
      actualUser: "",
      userInfos: {},
      userFirstname: "",
      hover: false,
      isHidden: true
    };
  },
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    url_image: {
      type: String
    },
    selectedFile: {
      type: String
    },
    msgError: {
      type: String
    }
    // imageSelected: {
    //   type: {}
    // }
  },
  methods: {
    // onSelect(){
    //   const file = this.$refs.file.file[0];
    //   this.file = file;
    // },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      // console.log(event.target.files[0]);

      console.log(this.selectedFile);
      // console.log(...imageSelected);
    },
    // checkInputText: function() {
    //   this.msgError = "";
    //   let error;
    //   if (this.title.length < 3 ||this.content.length < 3) {
    //     error = "Un minimum de 3 caracteres est requis";
    //   }
    //   this.msgError = error;
    // },

    //Envoi du formulaire
    sendNewContent: function(e) {
      let textRegex = /^[^=*<>{}]+$/;
      this.msgError = "";
      let error;

      //test input title
      if (this.title === "" || this.title == null) {
        error = "Titre requis";
      } else if (this.title.length < 3) {
        error = "Un minimum de 3 caracteres est requis";
      } else if (!textRegex.test(this.title)) {
        error = "les caractères suivants sont interdits: = * < > { }";
      }

      //test input content
      if (this.content === "" || this.content == null) {
        error = "Contenu requis";
      } else if (this.content.length < 3) {
        error = "Un minimum de 3 caracteres est requis";
      } else if (!textRegex.test(this.content)) {
        error = "les caractères suivants sont interdits: = * < > { }";
      }

      //si pas d'erreur, envoi du formulaire
      if (error) {
        this.msgError = error;
        e.preventDefault();
      } else {
        // console.log(...imageSelected);

        // let post = {
        //   UserId: sessionStorage.getItem("user"),
        //   title: this.title,
        //   content: this.content
        // };

        const postData = new FormData();
        postData.append("image", this.selectedFile);
        postData.append("title", this.title);
        postData.append("content", this.content);
        postData.append("UserId", sessionStorage.getItem("user"));

        console.log(...postData);
        // console.log(...imageSelected);
        axios({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("key")
          },
          method: "post",
          url: "http://localhost:3000/posts/new/",
          data: postData
        })
          .then(response => {
            if (response.status === 201) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .catch(error => {
            // console.log(error.response.data.error);
            this.msgError = error.response.data.error;
          });
        // this.$router.go();
      }
    },
    dashboardLoading() {
      // this.content = "loading...";
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
    }
  },
  mounted() {
    this.dashboardLoading();
  },
  created() {
    if (sessionStorage.getItem("user")) {
      this.isUserLogged = true;
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
        color: $primary-color;
      }
    }
  }

  // &_delete-link{
  //   text-decoration: none;
  // }

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

.hidden {
  display: none;
}

#profileBox {
  background-color: $background-color;
  width: 2o0px;
  padding: 8px;
  position: absolute;
  right: 12px;
  text-align: right;
  box-shadow: 0px 0px 5px $background-color;

  .profile-link {
    text-decoration: none;
    color: $primary-color;

    &:hover {
      text-decoration: underline;
      color: $primary-color;
    }
  }
}

///item new
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
</style>
