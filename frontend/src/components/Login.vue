<template>
  <div class="user-login container">
    <!-- login form -->
    <form class="user-login_form" id="form-login" >
      <div class="user-login_form-field">
        <label class="user-login_label" for="email">Mail</label>
        <input
          class="user-login_input"
          id="email"
          type="email"
          v-model.lazy="mail"
          placeholder="user@groupomania.com"
        />
      </div>
      <div class="user-login_form-field">
        <label class="user-login_label" for="password" >Mot de passe</label>
        <input
          class="user-login_input"
          id="password"
          type="password"
          v-model.lazy="password"
          placeholder="Password"
        />
      </div>
      <!-- form submit -->
      <button class="user-login_button" @click="login">Se connecter</button>
      <p id="alert">{{msgError}}</p>
    </form>
    <!-- signup link -->
    <div class="auth">
      <router-link to="/signup">Signup</router-link>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Login",
  props: {
    mail: {
      type: String
    },
    password: {
      type: String
    },

    msgError: {
      type: String
    }
  },
  methods: {
    //connexion
    login: function(e) {
      e.preventDefault();
      let mailRegex = /.+@.+\..+/;
      this.msgError = "";
      let error;
      
      //check inputs
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
        //si validation ok
        axios
          .post("http://localhost:3000/user/login/", {
            mail: this.mail,
            mdp: this.password
          })
          .then(response => {
            if (response.status === 200) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .then(response => {
            //stockage des données utilisateur dans session storage et local storage
            sessionStorage.setItem("key", response.data.token);
            sessionStorage.setItem("user", response.data.userId);
            localStorage.setItem("role", response.data.userRole);
            window.location.href = "#/dashboard"
          })
          .catch(error => {
            this.msgError = error.response.data.error;
          });
      }
    }
  }
};
</script>

<style lang="scss">
@import "../styles/_variables.scss"; 

//form login
.user-login {
  color: $main-color;
  font-weight: lighter;
  text-align: center;
  padding-top: 32px;
  &_form {
    color: $main-color;
    font-weight: lighter;
    padding: 16px;
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

  &_button{
    color: white;
    border-radius: 16px;
    border: none;
    padding: 16px;
    background-color: $main-color;
    border: $main-color solid 1px;
    width: 250px;
    &:hover {
      background-color: lighten($main-color, 10%);
      color: white;
      // box-shadow: $second-color 0px 0px 8px 4px;
      border: $second-color solid 1px;
    }
  }
}

//messages d'erreurs
#alert {
  color: red;
  text-align: center;
}

</style>


