<template>
  <div class="locationWrapper">
    <GMapAutocomplete
      :placeholder="this.currentLocation"
      @place_changed="getCord"
      :value="this.currentLocation"
      class="locationWrapper__inputfield"
    >
    </GMapAutocomplete>
    <button @click="clearToCurrent" class="locationWrapper__button"><img class="locationWrapper__image" src="../assets/media/reset_white.svg" alt=""></button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LocationTracker',
  data() {
    return {
      searchQuery: null,
      placeId: '',
      myLat: '',
      myLon: '',
      getLat: 38.9697,
      getLon: -77.385,
      myData: '',
      currentLocation: '',
      nameConvert: '',
    }
  },
  methods: {
    getCord(addressData) {
      this.placeId = addressData.place_id
      this.fetchCord()
      this.storeCoords()
    },
    fetchCord() {
      axios.request('https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=' + this.placeId + '&key=AIzaSyBkPQLyx_zkJzofdXLNN7op3vI3LsaMbSE').then((response) => {
        this.myData = response.data
        this.getLat = this.myData.result.geometry.location.lat
        this.getLon = this.myData.result.geometry.location.lng
      })
    },
    myPosition(position) {
      this.myLat = position.coords.latitude
      this.myLon = position.coords.longitude
      this.convertCord()
    },
    convertCord() {
      axios.request('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.myLat + ',' + this.myLon + '&key=AIzaSyBkPQLyx_zkJzofdXLNN7op3vI3LsaMbSE').then((response) => {
        this.currentLocation = response.data.results[0].address_components[2].long_name
      })
    },
    clearToCurrent() {
      document.getElementsByClassName('pac-target-input')[0].value = this.currentLocation
    },
    storeCoords() {
      this.$store.state.getLat = this.getLat
      this.$store.state.getLon = this.getLat
    },
  },

  mounted() {
    navigator.geolocation.getCurrentPosition(this.myPosition)
  }

}
</script>