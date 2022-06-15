<template>
    <nav class="shortcutBar">
      <ul class="shortcutBar__list" v-if="this.$store.state.isLoggedIn === true">
          <li class="shortcutBar__item"> <router-link class="shortcutBar__route" to="/">
            <img class="shortcutBar__img" src="@/assets/media/home.svg" alt=""> <p class="shortcutBar__name">Home</p> 
          </router-link>
          </li>
          <li class="shortcutBar__item" v-for="item in this.$store.state.userShortcuts" :key="item.shortcut_id"><router-link class="shortcutBar__route" :to="'/' + item.shortcut_route">
          <img class="shortcutBar__img" :src="require('@/assets/media/' + item.shortcut_icon + '.svg')" alt=""><p class="shortcutBar__name">{{item.shortcut_name}}</p> 
          </router-link></li>
      </ul>
      <ul class="shortcutBar__list" v-else>
          <li class="shortcutBar__item"> <router-link class="shortcutBar__route" to="/">
            <img class="shortcutBar__img" src="@/assets/media/home.svg" alt=""> <p class="shortcutBar__name">Home</p> 
          </router-link>
          </li>
          <li class="shortcutBar__item"> <router-link class="shortcutBar__route" to="/phases">
            <img class="shortcutBar__img" src="@/assets/media/moon_small.svg" alt=""> <p class="shortcutBar__name">Moon Phases</p> 
          </router-link>
          </li>
          <li class="shortcutBar__item"> <router-link class="shortcutBar__route" to="/settings">
            <img class="shortcutBar__img" src="@/assets/media/settings_small.svg" alt=""> <p class="shortcutBar__name">Settings</p> 
          </router-link>
          </li>
          <li class="shortcutBar__item"> <router-link class="shortcutBar__route" to="/news">
            <img class="shortcutBar__img" src="@/assets/media/news.svg" alt=""> <p class="shortcutBar__name">News</p> 
          </router-link>
          </li>
          <li class="shortcutBar__item"> <router-link class="shortcutBar__route" to="/lunar_eclipse">
            <img class="shortcutBar__img" src="@/assets/media/lunar_eclipse_small.svg" alt=""> <p class="shortcutBar__name">Lunar Eclipse</p> 
          </router-link>
          </li>
      </ul>
      
    </nav>
</template>

<script>
import userShortcuts from '@/assets/mixins/userShortcuts'

export default {
    name: 'shortcutBar',
    mixins: [userShortcuts],
    data(){
        return{
            defaultShortcuts: {
                "0": {
                    "shortcut_icon": "moon_phases",
                    "shortcut_name": "Moon Phases",
                    "shortcut_route": "phases"
                },
                 "1": {
                    "shortcut_icon": "moon_small",
                    "shortcut_name": "Moon",
                    "shortcut_route": "moon"
                },
                 "2": {
                    "shortcut_icon": "settings",
                    "shortcut_name": "Settings",
                    "shortcut_route": "settings"
                },
                 "3": {
                     "shortcut_icon": "news",
                    "shortcut_name": "News",
                    "shortcut_route": "news"
                }
            }
        }
    },
    watch: {
        '$store.state.userData': function (){
            this.getUserShortcuts(this.$store.state.userData)
            
        }
    },
}
</script>