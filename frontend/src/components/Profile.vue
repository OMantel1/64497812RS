<template>
  <div class="profile">
    <h2 class="profile_title">Gerer mon profile</h2>
    <ul>
      <li>profile id: {{userLogged.id}}</li>
      <li>Prenom: {{userLogged.firstname}}</li>
      <li>nom: {{userLogged.lastname}}</li>
      <li>
        <button v-on:click="isHidden = false">Supprimer mon compte</button>
      </li>
    </ul>
    <form v-if="!isHidden" class="profile_DeleteDialog form loginForm">
      <div class="form_field">
        <label for="mail">Mail</label>
        <input id="email" type="email" v-model.lazy="mail" placeholder="user@groupomania.com" />
      </div>
      <div class="form_field">
        <label for="mdp">Pass</label>
        <input id="password" type="password" v-model.lazy="password" placeholder="password" />
      </div>
      <button class="button button-login" @click="deleteUserProfile">Confirmation de suppression</button>
      <p id="alert">{{msgError}}</p>
    </form>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Profile",
  data() {
    return {
      userLogged: "",
      isHidden: true,
      msgError: ""
    };
  },
  methods: {
    deleteUserProfile() {
      let mailRegex = /.+@.+\..+/;
      this.msgError = "";
      let error;

      if (!this.mail) {
        error = "Mail requis";
      }
      if (!this.password) {
        error = "Mot de passe requis";
      }
      if (!mailRegex.test(this.mail)) {
        error = "Mail invalide";
      }

      if (error) {
        this.msgError = error;
      } else {
        axios({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("key")
          },
          method: "delete",
          url: "http://localhost:3000/user/delete/",
          data: {
            mail: this.mail,
            mdp: this.password
          }
        })
          .then(response => {
            if (response.status === 201) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .then(() => {
            // console.log(response.data);
            sessionStorage.clear("user");
            sessionStorage.clear("key");
            this.isUserLogged = "";
            this.$router.push({ name: "login" });

          })
          .catch(error => {
            console.log(error.response.data.error);
            this.msgError = error.response.data.error;
          });
      }
    }
  },
  mounted() {
    this.content = "loading...";
    let userLoggedId = sessionStorage.getItem("user");
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("key")
      }
    };
    axios
      .get("http://localhost:3000/user/" + userLoggedId, options)
      .then(response => {
        this.userLogged = response.data;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style lang="scss">
.profile {
  color: black;
}
</style>