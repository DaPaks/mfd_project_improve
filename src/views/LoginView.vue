<template>
  <div class="login">
    <h1>MoonX</h1>
    <div v-if="showLogin">
      <h2>Log in to MoonX</h2>
      <section class="social">
        <div class="social__google" @click="signInWithGoogle"></div>
        <div class="social__facebook"></div>
      </section>
      <div class="form__separater">OR</div>
      <section>
        <LoginUser/>
        <p>Not a member yet? <span class="form__link" @click="toggle">Sign up now</span></p>
      </section>
    </div>
    <div v-else>
      <h2>Sign up to MoonX</h2>
      <section class="social">
        <div class="social__google" @click="signInWithGoogle"></div>
        <div class="social__facebook"></div>
      </section>
      <div class="form__separater">OR</div>
      <section>
        <RegisterUser/>
        <p>Har du allerede en bruger? <span @click="toggle"><u>Log ind</u></span></p>
      </section>
    </div>
  </div>
</template>

<script>

import RegisterUser from '@/components/RegisterUser.vue'
import LoginUser from '@/components/LoginUser.vue'

import db from '@/firebase/firebaseInit.js'
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { doc, setDoc } from '@firebase/firestore'



export default {
  name: 'LoginView',
  components: { RegisterUser, LoginUser },
  data() {
    return {
      isLoggedIn: false,
      showLogin: true
    }
  },
  computed: {
    user() {
      return { auth: this.$store.state.auth }
    },
  },
  methods: {
    handleSignOut() {
      signOut(this.user.auth);
    },
    toggle() {
      this.showLogin = !this.showLogin;
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(this.user.auth, provider).then((result) => {
        const userDoc = doc(db, 'userinfo', result.user.uid);
        setDoc(userDoc, { user_nickname: result.user.displayName }, { merge: true });
        this.$router.push('/');
      }).catch((error) => { console.log(error.code) })
    }
  } //methods end
}
</script>
