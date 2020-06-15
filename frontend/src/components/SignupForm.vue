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
      let nameRegex = /^[^=*'<>{}0-9]{3,}$/;
      let mailRegex = /.+@.+\..+/;
      // let textRegex = /^[^=*<>{}]+$/; //interdit certains caracteres spéciaux
      // regex mdp: au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre ou un caractere spécial suivant -+!*$@%_ , longeur entre 8 et 15 caracteres.
      // let mdpRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
      let passwordRegex = /^[^=*'<>{}]{5,}$/;
      this.msgError = "";
      let error;
      //check password
      if (this.password === "" || this.password == null) {
        error = "Password requis";
      } else if (this.password.length < 5) {
        error = "Un password de 5 caractères minimum est demandé";
      } else if (!passwordRegex.test(this.password)) {
        error =
          "les caractères spéciaux suivants sont interdits = ' * < > { } ";
      }

      //check mail
      if (this.mail === "" || this.mail == null) {
        error = "Mail requis";
      } else if (!mailRegex.test(this.mail)) {
        error = "Mail invalide";
      }

      //check lastname
      if (this.lastname === "" || this.lastname == null) {
        error = "Nom requis";
      } else if (this.firstname.length < 3) {
        error = "un nom de 3 caracteres minimum est demandé";
      } else if (!nameRegex.test(this.lastname)) {
        error =
          "Les chiffres et Les caractères suivants sont interdits: = ' * < > { }";
      }
      
      //check firstname
      if (this.firstname === "" || this.firstname == null) {
        error = "Prénom requis";
      } else if (this.firstname.length < 3) {
        error = "un prenom de 3 caracteres minimum est demandé";
      } else if (!nameRegex.test(this.firstname)) {
        error =
          "Les chiffres et les caractères suivants sont interdits: = ' * < > { }";
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
            this.$router.push({ name: "login" });
            // sessionStorage.setItem("key", response.data.token);
            // sessionStorage.setItem("user", response.data.userId);
          })
          // .then(function() {
          //   this.$router.push({ name: 'dashboard' })
          // })
          .catch(error => {
            console.log(error.response.data.error);
            this.msgError = error.response.data.error;
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