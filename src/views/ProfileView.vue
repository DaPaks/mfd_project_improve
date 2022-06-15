<template>
<button class="back-arrow" @click="back"><img src="@/assets/media/arrow_white.svg" alt=""></button>
<h1 class="view-header">Profile</h1>
  <div v-if="this.$store.state.isLoggedIn === true" class="profile">
    
      <div class="profile-header">
        <img class="profile-header__avatar" src="@/assets/media/profile-white.svg">
        <p class="profile-header__name">{{ this.$store.state.userData.user_nickname}}</p>
        <p class="profile-header__location">Odense C</p>
      </div>
      <ProfileInfoCard />
      <BadgesProfile />
      <button @click="handleSignOut" class="big-button button-signout">Sign out</button>
  </div>
  <div v-else>
      <h2>Log in to view your profile</h2>
      <router-link to="login">Login</router-link>
  </div>
</template>

<script>
import ProfileInfoCard from '@/components/ProfileInfoCard.vue'
import BadgesProfile from '@/components/BadgesProfile.vue'
import { signOut } from "firebase/auth"
export default {
  name: 'ProfileView',
  components: {
    ProfileInfoCard,
    BadgesProfile
  },
  watch: {
        '$store.state.userData': function (){
           this.user = this.$store.state.userData
           console.log(this.user)
        }
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
     handleSignOut() {
      signOut(this.user.auth);
      this.$router.push('/login')
    }
  },
  computed: {
    user() {
      return {
        auth: this.$store.state.auth,
      }
    }
  }
}
</script>
