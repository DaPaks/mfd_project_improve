<template>
  <form id="login-form" @submit="loginUser">
    <h2>Log in to MoonX</h2>
    <label for="email">E-Mail</label>
    <input type="text" id="email" v-model="email">
    <div class="password-position">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password">
      <span class="form__link" id="forgot-password" href="#">Forgot password?</span>
    </div>
    <p class="error">{{ errMsg }}</p>
    <button class="gradient-button">Log in</button>
  </form>  
</template>
<script>

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default {
  data() {
    return {
      email: '',
      password: '',
      errMsg: '',
      auth: getAuth()
    }
  },
  methods: {
    loginUser(e) {
      e.preventDefault();
      signInWithEmailAndPassword(this.auth, this.email, this.password).then((cred) => {
        console.log(`User (${cred.user.uid}) successfully signed in!`)
        this.errMsg = ''; // Reset errMsg
        this.$router.push('/');
      })
      .catch((error) => {
        console.log(error.code)
        switch(error.code) {
          case "auth/invalid-email":
            this.errMsg = "Ugyldig email";
            break;
          case "auth/user-not-found":
            this.errMsg = "Bruger med denne mail findes ikke"
            break;
          case "auth/wrong-password":
            this.errMsg = "Forkert password";
            break;
          default:
            this.errMsg = "Forkert email eller password"
            break;
        }
      })
    }
  },
}
</script>