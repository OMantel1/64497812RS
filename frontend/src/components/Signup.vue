<template>
  <div class="user-signup container">
    <!-- <div class="logo">
      <p>Welcome to</p>
      <img src="../assets/icon-left-font-monochrome-white.svg" />
    </div>-->

    <form class="user-signup_form" id="form-signup">
      <div class="user-signup_form-field">
        <label class="user-signup_label" for="firstname">Prénom</label>
        <input class="user-signup_input" type="text" name="prenom" v-model.lazy="firstname" placeholder="marc" />
      </div>
      <div class="user-signup_form-field">
        <label class="user-signup_label" for="lastname">Nom</label>
        <input class="user-signup_input" type="text" name="nom" v-model.lazy="lastname" placeholder="dupond" />
      </div>
      <div class="user-signup_form-field">
        <label class="user-signup_label" for="mail">Mail</label>
        <input class="user-signup_input" type="email" name="mail" v-model.lazy="mail" placeholder="mail@groupomania.com" />
      </div>
      <div class="user-signup_form-field">
        <label class="user-signup_label" for="mdp">Password</label>
        <input class="user-signup_input" type="password" name="mot de passe" v-model.lazy="password" placeholder="password" />
      </div>
      <button
        class="user-signup_button"
        id="submitButton"
        type="submit"
        @click="signup">Inscription</button>
      <p id="alert">{{msgError}}</p>
    </form>

    <div class="auth">
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import SignupForm from "@/components/SignupForm.vue";
const axios = require("axios");

export default {
  name: "signup",
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
            window.location.href = "/#/"
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

<style lang="scss">
@import "../styles/_variables.scss"; 

.user-signup{
  color: $main-color;
  font-weight: lighter;
  text-align: center;
  padding-top: 32px;
  &_form {
    color: $main-color;
    font-weight: lighter;
    padding: 16px;
    border: solid red 2px;
    width: 300px;
    margin: auto;
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

#alert {
  color: red;
  text-align: center;
}
</style>
