<template>
  <div class="news">
      <div class="news__link">
      <a href="#" class="news__link__button"><img class="news__link__button__img" src="../assets/media/arrow_white.svg" alt=""></a>
      <h1 class="news__link__title">Latest news</h1>
      </div>
        <article class="news-article" v-for="news in this.newsData.articles" :key="news">
            <a class="news-article__link article-link" :href="news.url" target="_blank">
                <img class="article-link__image" :src="news.urlToImage" alt="">
                <p class="article-link__author">{{news.author}}</p>
                <h2 class="article-link__title">{{news.title}}</h2>
                <p class="article-link__description">{{news.description}}</p>
            </a>
            <p class="news-article__date">{{news.publishedAt}}</p>
        </article>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewsView',
  data(){
      return{
          newsData: '',
      }
  },
  components: {
  },
  methods: {
      fetchNewsData(){
 
      }
  },
  mounted(){
    
      axios.request('https://newsapi.org/v2/everything?q=space&searchIn=title&sortBy=publishedAt&apiKey=08a1ccd4b58941669114a560ff0b29b1')
           .then((response) => {
      this.newsData = response.data
      
    })
  },
}
</script>
<style lang="scss">

</style>