<template>
  <div class="user-signup container">
    <!-- form-->
    <form class="user-signup_form" id="form-signup">
      <div class="user-signup_form-field">
        <label class="user-signup_label" for="firstname">Prénom</label>
        <input class="user-signup_input" type="text" name="prenom" id="firstname" v-model.lazy="firstname" placeholder="marc" />
      </div>
      <div class="user-signup_form-field">
        <label class="user-signup_label" for="lastname">Nom</label>
        <input class="user-signup_input" type="text" name="nom" id="lastname"  v-model.lazy="lastname" placeholder="dupond" />
      </div>
      <div class="user-signup_form-field">
        <label class="user-signup_label" for="mail">Mail</label>
        <input class="user-signup_input" type="email" name="mail" id="mail" v-model.lazy="mail" placeholder="mail@groupomania.com" />
      </div>
      <div class="user-signup_form-field">
        <label class="user-signup_label" for="mdp">Password</label>
        <input class="user-signup_input" type="password" name="mot de passe" id="mdp" v-model.lazy="password" placeholder="password" />
      </div>
      <!-- form submit-->
      <button
        class="user-signup_button"
        id="submitButton"
        type="submit"
        @click="signup">Inscription</button>
      <p id="alert">{{msgError}}</p>
    </form>
    <!-- login link -->
    <div class="auth">
      <router-link to="/">Login</router-link>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Signup",
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
    //Creation d'un compte utilisateur
    signup: function(e) {
      e.preventDefault();
      let nameRegex = /^[^=*'<>{}0-9]{3,}$/; //interdit chiffres et caractères  = ' * < > { } " 
      let mailRegex = /.+@.+\..+/;
      let passwordRegex = /^[^=*'<>{}]{5,}$/; //Au moins 5 caractères, caractères  suivants interdits = ' * < > { } " 
      this.msgError = "";
      let error;

      //check password
      if (this.password === "" || this.password == null) {
        error = "Mot de passe requis";
      } else if (this.password.length < 5) {
        error = "Un mot de passe de 5 caractères minimum est demandé";
      } else if (!passwordRegex.test(this.password)) {
        error =
          "Les caractères spéciaux suivants sont interdits = ' * < > { } ";
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
        error = "Un nom de 3 caractères minimum est demandé";
      } else if (!nameRegex.test(this.lastname)) {
        error =
          "Les chiffres et les caractères suivants sont interdits: = ' * < > { }";
      }

      //check firstname
      if (this.firstname === "" || this.firstname == null) {
        error = "Prénom requis";
      } else if (this.firstname.length < 3) {
        error = "Un prenom de 3 caractères minimum est demandé";
      } else if (!nameRegex.test(this.firstname)) {
        error =
          "Les chiffres et les caractères suivants sont interdits: = ' * < > { }";
      }

      if (error) {
        this.msgError = error;
      } else {
        //si validation ok, requete.
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
            window.location.href = "/login"
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

//form signup
.user-signup{
  color: $main-color;
  font-weight: lighter;
  text-align: center;
  padding-top: 32px;
  &_form {
    color: $main-color;
    font-weight: lighter;
    padding: 16px;
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

//msg alert error
#alert {
  color: red;
  text-align: center;
}
</style>
