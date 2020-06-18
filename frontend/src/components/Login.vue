<template>
  <div class="user-login container">
    <!-- <div class="logo">
      <img src="../assets/icon-left-font-monochrome-white.svg" />
    </div>-->
    <form class="user-login_form" id="form-login" >
      <div class="user-login_form-field">
        <label class="user-login_label" for="mail">Mail</label>
        <input
          class="user-login_input"
          id="email"
          type="email"
          v-model.lazy="mail"
          placeholder="user@groupomania.com"
        />
      </div>
      <div class="user-login_form-field">
        <label class="user-login_label" for="mdp" >Mot de passe</label>
        <input
          class="user-login_input"
          id="password"
          type="password"
          v-model.lazy="password"
          placeholder="Password"
        />
      </div>
      <button class="user-login_button" @click="login">Se connecter</button>
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
            // this.$router.push({ name: "dashboard" });
            this.$emit("isUserLogged");
            window.location.href = "/#/dashboard/"
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
@import "../styles/_variables.scss"; 

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

#alert {
  color: red;
  text-align: center;
}

// .logo {
//   width: 300px;
//   height: auto;
//   margin: auto;
//   padding: 16px;
//   p {
//     color: white;
//   }
// }

</style>


