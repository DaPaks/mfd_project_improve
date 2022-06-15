<template>
  <div>
    
    <img class="home__img white-glow" src="@/assets/media/moon_large.svg" alt="">
    <router-link to="lunar_eclipse" class="countdown-container gradient-button">
        <countdown />
        <img class="home-event__icon" src="@/assets/media/arrow_grey.svg" alt="">
      </router-link>
    <section class="info">
        <p class="info__phases-header ">Moon Phases</p>
        <img class="info__img" src="@/assets/media/moon_phases_all.svg" alt="">
        <p class="info__phases-header ">More info</p>
        <div class="info__text-wrap"><p class="info__text info__text--scrollable"> The Moon is Earth's only natural satellite. At about one-quarter the diameter of Earth 
            (comparable to the width of Australia), it is the fifth largest satellite in the Solar System, the largest 
            satellite in the Solar System relative to its major planet, and larger than any known dwarf planet. The Moon i
            s a planetary-mass object that formed a differentiated rocky body, making it a satellite planet under the 
            geophysical definitions of the term. It lacks any significant atmosphere, hydrosphere, or magnetic field. 
            Its surface gravity is about one-sixth of Earth's (0.1654 g). Jupiter's moon Io is the only satellite in the Solar 
            System known to have a higher surface gravity and density.</p>
        </div>
        <table class="moon-table">
            <tbody class="moon-table__body">
                <tr class="moon-table__row">
                    <th class="moon-table__label">Alternative names</th>
                    <td class="moon-table__data">Luna, Selene, Cynthia</td>
                </tr>
                <tr class="moon-table__row moon-table__row--right">
                    <th class="moon-table__label">Mean radius</th>
                    <td class="moon-table__data">1737.4 km</td>
                </tr>
                <tr class="moon-table__row">
                    <th class="moon-table__label">Age</th>
                    <td class="moon-table__data">4,53E9 years</td>
                </tr>
                <tr class="moon-table__row moon-table__row--right">
                    <th class="moon-table__label">Distance to earth</th>
                    <td class="moon-table__data">384.400 km</td>
                </tr>
                <tr class="moon-table__row">
                    <th class="moon-table__label">Full orbit</th>
                    <td class="moon-table__data">27,3 days</td>
                </tr>
                <tr class="moon-table__row moon-table__row--right">
                    <th class="moon-table__label">Satelites</th>
                    <td class="moon-table__data">Earth</td>
                </tr>
            </tbody>
        </table>

    </section>
  </div>
</template>

<script>
import countdown from '@/components/Count-down.vue'
import eventCountdown from '@/assets/mixins/eventCountdown'
export default {
    name: 'moon-view',
     components: {countdown},
    mixins: [eventCountdown],
    data(){
        return{
            
        }
    },
    created(){
        this.getEventDate()
    }
}
</script>

<style>

</style>