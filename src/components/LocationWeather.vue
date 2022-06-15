<template>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Søg ..."
          v-model="query"
          v-on:keypress="fetchWeather"
        />
      </div>
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="weather-box">
            <div class="temp">
              {{ weather.name }}, {{ weather.sys.country }} . {{ Math.round(weather.main.temp) }}°c . {{ weather.weather[0].main }}
            </div>
          </div>
        </div>
      </div>
</template>

<script>

export default {
  data() {
    return {
      api_key: 'd3d7b75c1b7ae9567ef3833457c0ddaf',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {}
    }
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}&lang=da`)
          .then(res => {
            return res.json();
          }).then(this.setResults);

      }
    },
    setResults(results) {
      this.weather = results;
    }
  }
}
</script>

<style lang="scss">

</style>
