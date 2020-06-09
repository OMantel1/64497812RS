<script>
const axios = require("axios");
export default {
  name: "LoginForm",
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
    login: function(e) {
      e.preventDefault();
      let mailRegex = /.+@.+\..+/;
      // regex mdp: au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre ou un caractere spécial suivant -+!*$@%_ , longeur entre 8 et 15 caracteres.
      let mdpRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
      // interdit les les chiffres et les caracteres spéciaux, longeur minimum de 3.
      // let nameRegex = /^((?=.*[A-Z])|(?=.*[a-z]))([- 'éàèùêûiîàça-zA-Z]{3,})$/;
      this.msgError = "";
      let error;
      if (!mdpRegex.test(this.password)) {
        error = "Mot de passe invalide";
      }
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
        axios
          .post("http://localhost:3000/user/login/", {
            mail: this.mail,
            mdp: this.password
          })
          .then(response => {
            if (response.status === 200 ) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .then(response => {
            // console.log(response);
            sessionStorage.setItem("key", response.data.token);
            sessionStorage.setItem("user", response.data.userId);
            this.$router.push({ name: 'dashboard' });
          })
          .catch(error => {
            // console.log(error.response);
            try {
              if (error.response.status === 401) throw "Identifiants invalides";
              if (error.response.status !== 401) throw "Une erreur est survenue";
            } catch (err) {
              this.msgError = err;
            }
          });
      }
    }
  }
};
</script>

<template>
  <form id="form-login" class="form loginForm">
    <div class="form_field">
      <label for="mail">Mail</label>
      <input id="email" type="email" v-model.lazy="mail" placeholder="user@groupomania.com" />
    </div>
    <div class="form_field">
      <label for="mdp">Pass</label>
      <input id="password" type="password" v-model.lazy="password" placeholder="******" />
    </div>
    <button class="button button-login" @click="login">Se connecter</button>
    <p id="alert">{{msgError}}</p>
  </form>
</template>
