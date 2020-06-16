<template>
  <div class="login container">
    <!-- <div class="logo">
      <img src="../assets/icon-left-font-monochrome-white.svg" />
    </div>-->
    <form id="form-login" class="form loginForm">
      <div class="form_field">
        <label for="mail">Mail</label>
        <input id="email" type="email" v-model.lazy="mail" placeholder="user@groupomania.com" />
      </div>
      <div class="form_field">
        <label for="mdp">Password</label>
        <input id="password" type="password" v-model.lazy="password" placeholder="******" />
      </div>
      <button class="button button-login" @click="login">Se connecter</button>
      <p id="alert">{{msgError}}</p>
    </form>

    <div class="auth">
      <router-link to="/signup">Signup</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import LoginForm from "@/components/LoginForm.vue";
const axios = require("axios");

export default {
  name: "Login",
  // components: {
  //    LoginForm
  // }
  props: {
    mail: {
      type: String
    },
    password: {
      type: String
    },

    msgError: {
      type: String
    },
    isUserLogged: {
      type: String
    }
  },
  methods: {
    login: function(e) {
      e.preventDefault();
      let mailRegex = /.+@.+\..+/;
      // regex mdp: au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre ou un caractere spécial suivant -+!*$@%_ , longeur entre 8 et 15 caracteres.
      // let mdpRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
      // interdit les les chiffres et les caracteres spéciaux, longeur minimum de 3.
      // let nameRegex = /^((?=.*[A-Z])|(?=.*[a-z]))([- 'éàèùêûiîàça-zA-Z]{3,})$/;
      this.msgError = "";
      let error;
      // if (!mdpRegex.test(this.password)) {
      //   error = "Mot de passe invalide";
      // }
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
            if (response.status === 200) {
              return response;
            } else {
              throw (error = response);
            }
          })
          .then(response => {
            // console.log(response);
            sessionStorage.setItem("key", response.data.token);
            sessionStorage.setItem("user", response.data.userId);
            this.$router.push({ name: "dashboard" });
            this.$emit("isUserLogged");
          })
          .catch(error => {
            console.log(error.response.data.error);
            this.msgError = error.response.data.error;
          });
      }
    }
  }
  // created() {
  //   this.isUserLogged = sessionStorage.user;
  // }
};
</script>

<style lang="scss">
$primary-color: #747474;
$main-color: #264672;
$background-color: rgb(206, 206, 206);
$old-background-color: #f7f7f7;
$important-color: #ff4a4a;
$second-color: #407ac9;
$font-family: "Jost", sans-serif;

.form {
  padding: 32px;
  border-radius: 8px;
  background-color: #f7f7f7;
  .form_field {
    width: 95%;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    color: #747474;
  }
}

.loginForm {
  display: grid;
  justify-content: center;
  font-size: 16px;
  .signupLink {
    text-decoration: none;
    color: #747474;
    text-align: center;
    &:hover {
      text-decoration: underline;
    }
  }
  input,
  label {
    padding: 8px;
    font-size: 16px;
  }
  input {
    border-radius: 8px;
    border: solid 1px;
    color: lighten($primary-color, 20%);
  }
}

#alert {
  color: red;
  text-align: center;
}

.button {
  background-color: white;
  border-radius: 8px;
  border: solid 1px;
  padding: 12px;

  &:hover {
    background-color: lighten(#407ac9, 10%);
    color: white;
  }
}

.button-login {
  padding: 12px 128px;
  margin: 8px auto;
  color: white;
  background-color: #407ac9;
  font-size: 16px;
}
</style>


