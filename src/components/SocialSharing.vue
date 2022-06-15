<template>
  <article class="shareable" v-if="apiData">
    <div class="socialShareBar">
      <div class="share shareButton">
        <twitter-button
          class="share-button--circle share-button--outline"
          btnText
          title="hello"
          :picture="apiData.images.jpg.image_url"
          :url="apiData.url"
          v-bind:isBlank="false"
          v-bind:modalWidth="400"
          v-bind:modalHeight="400"
        />
      </div>
      <div class="share shareButton">
        <facebook-button
          class="share-button--circle share-button--outline"
          btnText
          :title="apiData.title"
          :picture="apiData.images.jpg.image_url"
          :url="apiData.url"
          :description="apiData.synopsis"
          v-bind:isBlank="false"
          v-bind:modalWidth="400"
          v-bind:modalHeight="400"
        />
      </div>
    </div>
  </article>
</template>

<script>
import axios from 'axios'
import TwitterButton from "vue-share-buttons/src/components/TwitterButton";
import FacebookButton from "vue-share-buttons/src/components/FacebookButton";

export default {
  name: "SocialSharing",


  data() {
    return {
      apiData: null,
    };
  },
  computed: {
    test() {
      return console.log(this.apiData.url)
    }
  },
  components: {
    TwitterButton,
    FacebookButton,
  },
  mounted() {

    axios.get('https://api.jikan.moe/v4/anime/' + 1).then((response) => {
      this.apiData = response.data.data;
    })

  },

};
</script>

<style>
.socialShareBar {
  display: inline-block;
}
.shareButton {
  display: inline-block;
}
</style>