<template>
  <div class="box">
    <Header />
    <!-- Posts -->
    <div class="DashboardItemNew new-post" v-if="isUserLogged">
      <!-- Lien pour afficher form nouveau post-->
      <div class="new-post_linkBox">
        <img src="../assets/icon.svg" alt="groupomania-logo-small" class="new-post_logo" />
        <button v-on:click="isHidden = false" class="new-post_Link">Créer un nouveau post</button>
      </div>

      <!-- Form nouveau post -->
      <transition name="fade">
        <form v-if="!isHidden" class="new-post_form">
          <a href="#" class="new-post_close-button" v-on:click.prevent="isHidden = true">×</a>
          <label for="title" class="new-post_form-label">Titre</label>
          <input
            id="title"
            class="new-post_form-input"
            type="text"
            v-model.lazy="title"
            placeholder="Votre titre ..."
          />
          <label for="message" class="new-post_form-label">Message</label>
          <input
            id="message"
            class="new-post_form-input"
            type="text"
            v-model.lazy="content"
            placeholder="Votre message ..."
          />
          <label for="image" class="new-post_form-label">Image</label>
          <input
            id="Image"
            class="new-post_form-file"
            type="file"
            @change="onFileSelected"
            placeholder="upload image"
          />
          <!-- form submit -->
          <button class="new-post_form-button" v-on:click="sendNewContent">Envoyer</button>
          <p id="alert">{{msgError}}</p>
        </form>
      </transition>
    </div>

    <!-- Affichage de tous les derniers posts -->
    <DashboardItems
      v-for="message in messageContent"
      v-bind:key="message.id"
      v-bind:firstname="message.User.firstname"
      v-bind:lastname="message.User.lastname"
      v-bind:title="message.title"
      v-bind:content="message.content"
      v-bind:image="message.url_image"
      v-bind:postId="message.id"
      v-bind:comments="message.Comments"
    />
  </div>
</template>

<script>
const axios = require("axios");
import Header from "@/components/Header.vue";
import DashboardItems from "@/components/DashboardItems.vue";
export default {
  name: "Dashboard",
  title: "Groupomania - Aceuil",
  components: {
    DashboardItems,
    Header
  },
  data() {
    return {
      isUserLogged: "",
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
  },
  methods: {
    // Empeche l'affichage du formulaire de nouveau post si utilisateur non connecté
    userLogged() {
      if (sessionStorage.getItem("user")) {
        this.isUserLogged = true;
      }
    },
    //Selection image
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    //Envoi du formulaire
    sendNewContent(e) {
      let textRegex = /^[^=*<>{}]+$/;
      this.msgError = "";
      let error;
      e.preventDefault();

      //test input title
      if (this.title === "" || this.title == null) {
        error = "Titre requis";
      } else if (this.title.length < 3) {
        error = "Un minimum de 3 caractères est requis";
      } else if (!textRegex.test(this.title)) {
        error = "Les caractères suivants sont interdits: = * < > { }";
      }

      //test input content
      if (this.content === "" || this.content == null) {
        error = "Contenu requis";
      } else if (this.content.length < 3) {
        error = "Un minimum de 3 caractères est requis";
      } else if (!textRegex.test(this.content)) {
        error = "Les caractères suivants sont interdits: = * < > { }";
      }

      //si pas d'erreur, envoi du formulaire
      if (error) {
        this.msgError = error;
      } else {
        //test si image upload, si image, l'ajoute à postData
        const postData = new FormData();
        if (this.selectedFile !== undefined) {
          postData.append("image", this.selectedFile);
        }

        postData.append("title", this.title);
        postData.append("content", this.content);
        postData.append("UserId", sessionStorage.getItem("user"));

        //requete
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
            this.dashboardLoading();
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
    },
    //Récupération des posts
    dashboardLoading() {
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
        })
        .catch(error => console.log(error));
    }
  },
  mounted() {
    this.dashboardLoading();
    this.userLogged();
  }
};
</script>


<style lang="scss">
@import "../styles/_variables.scss";

.new-post_linkBox-image {
  width: 100%;
}

.box {
  background-color: $background-color;
}

.dashboard-Items {
  box-sizing: border-box;
  width: 60%;
  overflow: auto;
  margin: 32px auto;
  @media screen and (max-width: 525px) {
    width: 90%;
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
.new-post {
  padding: 8px;
  background: white;
  border: solid lighten($primary-color, 40%) 1px;
  border-radius: 4px;
  color: $primary-color;
  box-sizing: border-box;
  width: 60%;
  height: auto;
  margin: 16px auto;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 525px) {
    width: 90%;
  }

  &_linkBox {
    display: flex;
  }

  &_Link {
    border: solid lighten($primary-color, 40%) 1px;
    border-radius: 4px;
    color: $primary-color;
    background-color: white;
    padding: 8px;
    margin: 0 8px;
    text-decoration: none;
    font-size: 12px;
  }

  &_logo {
    width: 30px;
    border-radius: 100%;
  }

  &_form {
    display: flex;
    flex-direction: column;

    &-input {
      font-size: 12px;
      width: 100%;
      border: none;
      border-bottom: solid $main-color 1px;
      line-height: 30px;
    }

    &-label {
      padding-top: 8px;
      color: $main-color;
      font-weight: 500;
    }

    &-file {
      font-size: 12px;
      border: none;
      padding: 16px 0;
    }

    &-button {
      color: $main-color;
      border-radius: 16px;
      border: none;
      padding: 8px;
      background-color: white;
      border: $main-color solid 1px;
      width: 250px;
      margin: auto;
      &:hover {
        background-color: lighten($main-color, 10%);
        color: white;
        border: $second-color solid 1px;
      }
    }
  }
  .new-post_close-button {
    color: black;
  }
}

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
</style>
