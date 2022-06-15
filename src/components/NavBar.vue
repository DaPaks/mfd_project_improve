<template>
<span  @mouseleave="closeNav">
  <div class="navigation-controller">
    <span v-if="isLoggedIn">
      <router-link to ="/profile"><img src="@/assets/media/profile-white.svg" alt="profile" class="profile-picture"></router-link>
    </span>
    <router-link to="login" v-else>Log in</router-link>
    <img src="@/assets/media/menu.svg" alt="Open navigation bar" class="poo navigation-controller__burger" @click="openNav">
  </div>
    <nav class="nav">
      <section class="nav__top">
        <img src="@/assets/media/close.svg" class="nav__burger--closeoption" @click="closeNav">
        <shortcutSearch />
        <shortcutModal v-if="this.$store.state.modalOpen === true" />
      </section>
      <ul class="nav__list">
        <li class="nav__item">
          <router-link to="/" @click="closeNav">Home</router-link>
        </li>
        <li class="nav__item">
          <router-link to="moon" @click="closeNav">Moon</router-link>
        </li>
        <li class="nav__item">
          <router-link to="phases" @click="closeNav">Moon phases</router-link>
        </li>
        <li class="nav__item">
          <router-link to="profile" @click="closeNav">Profile</router-link>
        </li>
        <li class="nav__item">
          <router-link to="news" @click="closeNav">News</router-link>
        </li>
        <li class="nav__item">
          <router-link to="new_moon" @click="closeNav">New Moon</router-link>
        </li>
        <li class="nav__item">
          <router-link to="lunar_eclipse" @click="closeNav">Lunar Eclipse</router-link>
        </li>
        <li class="nav__item">
          <router-link to="settings" @click="closeNav">Settings</router-link>
        </li>
        <li class="nav__item">
          <router-link to="quiz_overview" @click="closeNav">Quiz Overview</router-link>
        </li>
      </ul>
    </nav>
  </span>
</template>

<script>
import shortcutSearch from '@/components/ShortcutSearch.vue'
import shortcutModal from '@/components/ShortcutModal.vue'

export default {
  components: {
    shortcutSearch,
    shortcutModal
  },
  data() {
    return {
      showNav: false,
      BurgerMenu: 'Open',
      screenWidth: window.innerWidth
    }
  },
  created() {
    window.addEventListener('resize', this.getWidth);
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    getWidth() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth >=  1024) this.openNav();
      else this.closeNav();
    },
    closeNav() {
      if (this.screenWidth <  1024) {
        this.showNav = false
        this.BurgerMenu = 'Open'
        document.querySelector('nav').style.transform = 'translate(100%, 0)';
      }
    },
    openNav() {
      this.showNav = true
      this.BurgerMenu = 'Close'
      document.querySelector('nav').style.transform = 'none';
    }
  }
}

</script>