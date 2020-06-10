<template>
  <div class="login container">
    <div class="logo">
      <img src="../assets/icon-left-font-monochrome-white.svg" />
    </div>

    <LoginForm />

    <div class="auth">
      <router-link to="/signup">Signup</router-link>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";
export default {
  components: {
     LoginForm
  }
};
</script>

<style lang="scss">

$primary-color: #747474;
$main-color: #264672;
$background-color: rgb(206, 206, 206);
$old-background-color: #F7F7F7;
$important-color: #FF4A4A;
$second-color: #407AC9;
$font-family: 'Jost', sans-serif;

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
  input, label{
    padding: 8px;
    font-size: 16px;
  }
  input{
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


