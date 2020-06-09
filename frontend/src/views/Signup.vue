<template>
  <div class="signup container">
    <div class="logo">
      <p>Welcome to</p>
      <img src="../assets/icon-left-font-monochrome-white.svg" />
    </div>

    <SignupForm/>
    
    <div class="auth">
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import SignupForm from "@/components/SignupForm.vue";

export default {
  components: {
     SignupForm
  }
};
</script>

<style lang="scss">
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
  font-size: 18px;
  .signupLink {
    text-decoration: none;
    color: #747474;
    text-align: center;
    &:hover {
      text-decoration: underline;
    }
  }
}

#alert {
  color: red;
  text-align: center;
}

</style>
