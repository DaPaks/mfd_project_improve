<template>
  <div class="Phases">
    <h1>Moonphases</h1>
    <LocationTracker class="Phases__button"/>
    <MoonPhases />
    <!--<LocationWeather />-->
  </div>
</template>

<script>
import MoonPhases from '@/components/MoonphaseAnimation.vue'
import LocationTracker from '@/components/LocationTracker.vue'
//import LocationWeather from '@/components/LocationWeather.vue'

export default {
  name: 'MoonPhase',
  components: {
    MoonPhases, LocationTracker, //LocationWeather
  },
}
</script>