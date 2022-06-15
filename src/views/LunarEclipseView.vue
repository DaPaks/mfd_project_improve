<template>
  <div>
      <div class="event">
          
        <img class="event__img red-glow" src="../assets/media/lunar_eclipse_large.svg" alt="">
          
        <div class="event__textBox">
            <article class="event__article">
                <h1 class="event__header">Lunar Eclipse</h1>
                <p>Visible from</p> 
                <p class="event__visible">North and South America, Europe, Africa and parts of Asia</p>
                <router-link to="lunar_eclipse" class="countdown-container gradient-button">
                    <countdown />
                </router-link>
                <p class="event__date">May 15-16, 2022</p>

                <p>Lunar Eclipse info</p>
                <p class="event__description">There are three types of lunar eclipses — total, partial and penumbral — with the most 
                    dramatic being a total lunar eclipse, in which Earth's shadow completely covers the moon. 
                    During a total lunar eclipse, the moon will appear bright red in the night sky.</p>
            </article>
        </div>
      </div>
  </div> 
</template>

<script>
import countdown from '@/components/Count-down.vue'
import eventCountdown from '@/assets/mixins/eventCountdown'
export default {
    name: 'lunarEclipse',
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

<style scoped lang="scss">
</style>