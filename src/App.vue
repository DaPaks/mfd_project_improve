<template>
  <NavBar/>
  <div id="wrapper">
    <router-view/>
  </div>
  <shortcutBar/>
</template>

<style lang="scss">
@use './assets/scss/main.scss';

//Old Nav
// <router-link to="/">Home</router-link> |
//<router-link to="/about">About</router-link>

</style>

<script>
import NavBar from '@/components/NavBar.vue'
import shortcutBar from '@/components/ShortcutBar.vue'



export default {
  name: 'TestView',
  components: {
    NavBar,
    shortcutBar,
  }
}
</script>