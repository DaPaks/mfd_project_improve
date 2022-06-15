<template>
  <form id="signup-form" @submit.prevent="signupUser">
    <label for="displayName">Display Name</label>
    <input type="text" id="displayName" v-model="displayName" @blur="validateDisplayName">
    <p class="error">{{ displayNameErr }}</p>

    <label for="email">E-mail</label>
    <input type="email" id="email" v-model="email" @blur="validateEmail" class="test">
    <p class="error">{{ emailErr }}</p>
    
    <label for="password">Password</label>
    <input type="password" id="password" v-model="password" @blur="validatePassword">
    <p class="error">{{ passwordErr }}</p>

    <label for="repeat-password">Repeat password</label>
    <input type="password" id="repeat-password" v-model="repeatPassword" @blur="validateRepeatPassword">
    <p class="error">{{ repeatPasswordErr }}</p>

    <p>{{ errMsg }}</p>

    <input type="checkbox" id="terms-and-conditions" class="form__terms">
    <label for="terms-and-conditions" class="form__terms">Accept terms and conditions</label>
    <p class="error">{{ termsErr }}</p>

    <button class="gradient-button">Register now</button>
  </form>
</template>
<script>

import db from '@/firebase/firebaseInit.js'
import { setDoc, doc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from "firebase/auth"

export default {
  setup() {
    
  },
  data() {
    return {
      //Regular expression for email check
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      auth: this.$store.state.auth,
      displayName: '',
      email: '',
      password: '',
      repeatPassword: '',

      displayNameErr: '',
      emailErr: '',
      passwordErr: '',
      repeatPasswordErr: '',
      termsErr: '',

      errMsg: ''
    }
  },
  methods: {
    validateDisplayName(e) {
      if (e.target) e = e.target

      if (!this.displayName || this.displayName.length < 2) {
        this.displayNameErr = 'Name needs to be at least 2 letters.';
        e.classList.add('error')
        return false;
      } else {
        this.displayNameErr = '';
        e.classList.remove('error')
        return true;
      }
    },
    validateEmail(e) {
      if (e.target) e = e.target

      if (!this.email) {
        this.emailErr = 'Specify an Email';
        e.classList.add('error') 
        return false;
      } else if (!this.email.toLowerCase().match(this.reg)) {
        this.emailErr = 'Email not valid';
        e.classList.add('error');
        return false;
      } else {
        this.emailErr = '';
        e.classList.remove('error')
        return true;
      }
    },
    validatePassword(e) {
      if (e.target) e = e.target

      if (this.password < 6) {
        this.passwordErr = 'Password need to be at least 6 signs';
        e.classList.add('error')
        return false;
      } else {
        this.passwordErr = '';
        e.classList.remove('error')
        return true;
      }
    },
    validateRepeatPassword(e) {
      if (e.target) e = e.target

      if (this.password !== this.repeatPassword) {
        this.repeatPasswordErr = `Passwords doesn't match`;
        e.classList.add('error')
        return false;
      } else {
        this.repeatPasswordErr = '';
        e.classList.remove('error')
        return true;
      }
    },
    validateTerms(e) {
      if (e.checked) {
        this.termsErr = '';
        e.classList.remove('error');
        return true;
      } else {
        this.termsErr = 'You need to accept the terms and conditions';
        e.classList.add('error')
        return false;
      }

    },
    validateForm() {
      if (
        this.validateTerms(document.querySelector('#terms-and-conditions')) &&
        this.validateDisplayName(document.querySelector('#displayName')) &&
        this.validateEmail(document.querySelector('#email')) &&
        this.validatePassword(document.querySelector('#password')) &&
        this.validateRepeatPassword(document.querySelector('#repeat-password'))
        )
      {
        this.errMsg = '';
        return true;

      } else {
        return false;
      }
    },
    signupUser() {
      if (this.validateForm()) {
        createUserWithEmailAndPassword(this.auth, this.email, this.password).then((cred) => {
          console.log(cred, 'successfully registered');
          setDoc(doc(db, 'userinfo', cred.user.uid), {
            user_nickname: this.displayName,
            user_shortcuts: ['6DjvLwu4JFpFZFPH7ZDR', 'cGE11KXamIb47wW9ztS8', 'JxUSSbM9C55xIJjyDpHL', 'F6N4XcJjvgU8yACZRlyK']
          }).then(() => {
            this.$router.push('/');
          });
        }).catch((error) => {
          console.log(error.code)
          switch (error.code) {
            case 'auth/email-already-in-use':
              this.errMsg = 'Denne mail er allerede i brug'
              break;
            case 'auth/invalid-email':
              this.errMsg = 'Denne mail er ikke valid'
              break;
            case 'auth/operation-not-allowed':
              this.errMsg = 'Noget gik galt'
              break;
            default:
              this.errMsg = 'Noget gik galt';
              break;
          }
        }) // createUser end
      }
    },
  }
}
</script>

<style>
</style>
