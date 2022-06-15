<template>
  <div>
      <div class="event">

          <img class="event__img white-glow" src="../assets/media/new_moon_large.svg" alt="">
          <div class="event__textBox">
            <article class="event__article">
                <h1 class="event__header">New Moon</h1>
                <p class="event__visible">Visible from:</p> <p> -</p>
                <router-link to="lunar_eclipse" class="countdown-container gradient-button">
                    <countdown />
                </router-link>
                <p class="event__date">May 30, 2022</p>

                <p>New Moon info</p>
                <p class="event__description">In astronomy, the new moon is the first lunar phase, when the Moon and Sun have the 
                    same ecliptic longitude. At this phase, the lunar disk is not visible to the unaided 
                    eye, but its presence may be detected because it occults stars behind it.</p>
            </article>
        </div>
      </div>
  </div>
</template>

<script>
import countdown from '@/components/Count-down.vue'
import eventCountdown from '@/assets/mixins/eventCountdown'
export default {
    name: 'newMoonView',
    components: {countdown},
    mixins: [eventCountdown],
    data(){
        return{
            eventData:[]
        }
    },
    created(){
        this.getEventDate()
    }
}
</script>

<style>

</style>