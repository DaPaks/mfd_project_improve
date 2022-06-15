<template>
  <div class="home">
    <img class="home__img white-glow" src="@/assets/media/moon_large.svg" alt="Cartoon image of the moon">
    <router-link class="home-event" to="lunar_eclipse">
      <div class="countdown-container gradient-button">
        <countdown />
        <img class="home-event__icon" src="@/assets/media/arrow_grey.svg" alt="">
      </div>
    </router-link>
    <router-link class="shortcutBar__route" to="/phases">
     <h1>Explore &#8594;</h1>
     </router-link> 
  </div>
  
</template>

<script>
import countdown from '@/components/Count-down.vue'
import eventCountdown from '@/assets/mixins/eventCountdown'



export default {
  name: 'HomeView',
  components: {countdown},
  mixins: [eventCountdown],
  data(){
    return{
      result: null,
    }
  },
  computed: {
    user() {
      return {
        isLoggedIn: this.$store.state.isLoggedIn,
        data: this.$store.state.userData,
      }
    }
  }, // computed end
  created(){
     this.getEventDate()
  }
}
</script>
