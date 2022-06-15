<template>
  <div class="moonanimation" v-if="this.moonphase">
    <div class="moonanimation__circlecenter">
      <img class="moonanimation__moon white-glow" src="../assets/media/moon_small.svg" alt="">
      <div
        class="moonanimation__circle moonanimation__aslide"
        id="ani"
        data-animation
        :style="cssVariable"
      ></div>
    </div>
    <label class="moonanimation__label">
      <input
        class="moonanimation__input"
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model.number="this.moonphase.days[15].moonphase"
      />
    </label>
    <div class="moonanimation__data">
      <div class="moonanimation__moonrise">
        <img class="moonanimation__moonrise__img" src="../assets/media/moon_rise.svg" alt="">
        <p>07:32</p>
      </div>
      <div class="moonanimation__currentdate">
        <p class="moonanimation__currentdate__p">{{this.currentDate}}</p>
      </div>
      <div class="moonanimation__moonset">
        <img class="moonanimation__moonset__img" src="../assets/media/moon_set.svg" alt="">
        <p>02:27</p>
      </div>
      <div class="moonanimation__info">
        <div @click="showMoonInfo('moon-age')" id="moon-age" class="hovereffect">
          <h3>Moon Age</h3>
          <p>{{this.moonphase.days[15].moonphase}}</p>
        </div>
        <div @click="showMoonInfo('distance')" id="distance">
          <h3>Distance</h3>
          <p>{{Math.round(this.moonphase.moon_distance)}} Km</p>
        </div>
        <div @click="showMoonInfo('azimuth')" id="azimuth">
          <h3>Azimuth</h3>
          <p>{{Math.round(this.moonphase.moon_azimuth)}}</p>
        </div>
      </div>
      <div class="moonanimation__infobox" v-if="infoText">
        {{ infoText }}
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
    return {
      lat: '',
      lon: '',
      city: '',
      currentDate: moment(new Date()).format("DD-MM-yyyy"),
      pastdate: moment(new Date()).add(-15, 'days').format("yyyy-MM-DD"),
      futuredate: moment(new Date()).add(15, 'days').format("yyyy-MM-DD"),
      days: null,
      moonphase: null,
      oldLat: '',
      moonageText: 'Månefase henviser til en del af Moon belyst af Sun og set fra Jorden . Sidstnævnte svarer til den del af Månen, der er orienteret både mod Jorden og mod Solen. Når månen bevæger sig i kredsløb omkring jorden , skifter månefaserne fra dag til dag og afslutter en cyklus efter en lunation , der varer omkring 29,5 dage.',
      distanceText: 'Månens bane rundt Jorden er en ellipse, og et omløb rundt Jorden tager omtrent 27 dage. På et punkt i ellipsen er Månen nærmest Jorden (dette kaldes perigæum), og et halvt omløb (omtrent 14 dage) senere er Månen længst fra Jorden (dette kaldes apogæum).',
      azimuthText: 'Solens og månens position på himlen er defineret af azimut og højde. Azimuth er intet andet end den vinkel, som enhver himmellegeme skaber med Nord. Denne vinkel måles fra urets retning og omkring observatørens horisont. Derfor er situationen, hvor vi befinder os, vigtig for at bestemme himmellegemets position.',
      showInfoBox: true,
      infoText: 'Månefase henviser til en del af Moon belyst af Sun og set fra Jorden . Sidstnævnte svarer til den del af Månen, der er orienteret både mod Jorden og mod Solen. Når månen bevæger sig i kredsløb omkring jorden , skifter månefaserne fra dag til dag og afslutter en cyklus efter en lunation , der varer omkring 29,5 dage.'
    }
  },
  computed: {
    cssVariable() {
      return {
        '--moonage': this.moonphase.days[15].moonphase * -1 + "s",
      }
    },
    fetchLat() {
      return this.$store.state.getLat
    },
    fetchLon() {

      return this.$store.state.getLon
    }
  },
  methods: {
    getApi() {
      this.lat = this.$store.state.getLat
      this.lon = this.$store.state.getLon
      const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
      const apiIncludes = '?unitGroup=metric&elements=moonphase&include=days'
      const apiKey = '8CVNABXSS2R9M2JCNA3DL5UTE'
      const apiFormat = 'json'
      axios(`${apiUrl}${this.lon},${this.lat}/${this.pastdate}/${this.futuredate}${apiIncludes}&key=${apiKey}&contentType=${apiFormat}`).then(response => {
        this.moonphase = response.data
        console.log(this.moonphase.data)
      })
    },
    showMoonInfo(infoString) {
      if (infoString == 'moon-age') {
        this.infoText = this.moonageText;
        document.querySelector('#moon-age').setAttribute('class', 'hovereffect');
        document.querySelector('#distance').removeAttribute('class');
        document.querySelector('#azimuth').removeAttribute('class');
      }
      if (infoString == 'distance') {
        this.infoText = this.distanceText;
        document.querySelector('#moon-age').removeAttribute('class');
        document.querySelector('#distance').setAttribute('class', 'hovereffect');
        document.querySelector('#azimuth').removeAttribute('class');
      }
      if (infoString == 'azimuth') {
        document.querySelector('#moon-age').removeAttribute('class');
        document.querySelector('#distance').removeAttribute('class');
        document.querySelector('#azimuth').setAttribute('class', 'hovereffect');
        this.infoText = this.azimuthText;
        
      }
    }
  },
  created() {
    this.getApi();
  }

}
</script>