<template>
  <div>
    <Header />
    <!-- Profile utilisateur-->

    <!-- Si utilisateur non authorisé-->
    <div v-if="!userLogged" class="unauthorizedMessage">
      <p>Acces non authorisé</p>
    </div> 
    
    <!-- Si utilisateur authorisé-->
    <div v-else class="user-profile">
      <!-- Informations du compte utilisateur-->
      <i class="fas fa-user-edit user-profile_icon"></i>
      <h2 class="user-profile_title">Gérer mon profil</h2>
      <p>Id de profile N°{{userLogged.id}}</p>
      <p>{{userLogged.firstname}} {{userLogged.lastname}}</p>
      <button v-on:click="isHidden = false" class="user-profile_delete-link">Supprimer mon compte</button>

      <!-- Form de confirmation de suppression de compte-->
      <form v-if="!isHidden" class="user-profile_form">
        <div class="user-profile_form-field">
          <label for="mail" class="user-profile_label">Mail</label>
          <input
            id="email"
            class="user-profile_input"
            type="email"
            v-model.lazy="mail"
            placeholder="user@groupomania.com"
          />
        </div>
        <div class="user-profile_form-field">
          <label for="mdp" class="user-profile_label">Pass</label>
          <input
            id="password"
            class="user-profile_input"
            type="password"
            v-model.lazy="password"
            placeholder="password"
          />
        </div>
        <button
          class="user-profile_delete-confirm"
          @click="deleteUserProfile"
        >Confirmation de suppression</button>
        <p id="alert">{{msgError}}</p>
      </form>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import Header from "@/components/Header.vue";

export default {
  name: "Profile",
  components: {Header},
  data() {
    return {
      userLogged: "",
      isHidden: true,
      msgError: ""
    };
  },
  methods: {
    //suppression du compte utilisateur
    deleteUserProfile() {
      let mailRegex = /.+@.+\..+/;
      this.msgError = "";
      let error;

      //vérification des champs
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
        //si validation ok, requete
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
            //suppression des données stockées
            sessionStorage.clear("user");
            sessionStorage.clear("key");
            this.isUserLogged = "";
            window.location.href = "/#/";
          })
          .catch(error => {
            this.msgError = error.response.data.error;
          });
      }
    }
  },
  mounted() {
    this.content = "loading...";
    //Récupere les données de l'utilisateur connecté
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
@import "../styles/_variables.scss";


//user profile
.user-profile {
  color: $main-color;
  font-weight: lighter;
  text-align: center;
  padding-top: 32px;
  ul,
  li {
    margin: 0;
  }
  &_icon {
    font-size: 2em;
  }

  &_delete-link {
    color: $main-color;
    border-radius: 16px;
    border: none;
    padding: 16px;
    background-color: white;
    border: $main-color solid 1px;
    &:hover {
      background-color: $important-color;
      color: white;
      box-shadow: $primary-color 0px 0px 8px 4px;
    }
  }
  &_form {
    color: $main-color;
    font-weight: lighter;
    padding: 32px;
  }

  &_form-field {
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &_input {
    width: 250px;
    border: none;
    border-bottom: solid $main-color 1px;
    line-height: 30px;
  }

  &_label {
    width: 250px;
    text-align: left;
    line-height: 30px;
  }

  &_delete-confirm {
    color: white;
    border-radius: 16px;
    border: none;
    padding: 16px;
    background-color: $main-color;
    border: $main-color solid 1px;
    width: 250px;
    &:hover {
      background-color: $important-color;
      color: white;
      box-shadow: $primary-color 0px 0px 8px 4px;
    }
  }
}
</style>