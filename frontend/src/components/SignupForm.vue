<script>
const axios = require("axios");
export default {
  name: "SignupForm",
  props: {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
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
    signup: function(e) {
      e.preventDefault();
      let mailRegex = /.+@.+\..+/;
      // regex mdp: au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre ou un caractere spécial suivant -+!*$@%_ , longeur entre 8 et 15 caracteres.
      let mdpRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
      // interdit les les chiffres et les caracteres spéciaux, longeur minimum de 3.
      let nameRegex = /^((?=.*[A-Z])|(?=.*[a-z]))([- 'éàèùêûiîàça-zA-Z]{3,})$/;

      this.msgError = "";
      let error;
      
      if (!mdpRegex.test(this.password)) {
        error = "Password invalide";
      }

      if (!mailRegex.test(this.mail)) {
        error = "Mail invalide";
      }
      if (!nameRegex.test(this.lastname)) {
        error =
          "Nom invalide";
      }
      if (!nameRegex.test(this.firstname)) {
        error =
          "Prenom invalide";
      }
      if (!this.lastname || !this.firstname || !this.password || !this.mail) {
        error = "Tous les champs sont requis";
      }
      

      if (error) {
        this.msgError = error;
      } else {
        axios
          .post("http://localhost:3000/user/signup/", {
            firstname: this.firstname,
            lastname: this.lastname,
            mail: this.mail,
            mdp: this.password
          })
          .then(response => {
            if (response.status === 201) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .then(response => {
            console.log(response);
            this.$router.push({ name: 'login' });
            // sessionStorage.setItem("key", response.data.token);
            // sessionStorage.setItem("user", response.data.userId);
          })
          // .then(function() {
          //   this.$router.push({ name: 'dashboard' })
          // })
          .catch(error => {
            // console.log(error.response);
            try {
              if (error.response.status === 401) throw "Ce mail est deja pris";
              if (error.response.status == 400) throw "Erreur de données";
              throw "Une erreur est survenue";
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
  <form id="form-signup" class="form loginForm">
    <div class="form_field">
      <label for="firstname">Prénom</label>
      <input type="text" name="prenom" v-model.lazy="firstname" placeholder="marc" />
    </div>
    <div class="form_field">
      <label for="lastname">Nom</label>
      <input type="text" name="nom" v-model.lazy="lastname" placeholder="dupond" />
    </div>
    <div class="form_field">
      <label for="mail">Mail</label>
      <input type="email" name="mail" v-model.lazy="mail" placeholder="mail@groupomania.com" />
    </div>
    <div class="form_field">
      <label for="mdp">Pass</label>
      <input type="password" name="mot de passe" v-model.lazy="password" />
    </div>
    <button class="button button-login" id="submitButton" type="submit" @click="signup">Inscription</button>
    <p id="alert">{{msgError}}</p>
  </form>
</template>