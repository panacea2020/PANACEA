<template>
  <div id="app">
    <Article v-for="(item, index) in articleArr" :info="item" :key="index">check</Article>
  </div>
</template>
<script>

import Article from './components/article.vue'
import article_content from './json/article_content.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'


export default {
  components:{Article},

  data(){
    return{
      a:100,
      articleArr: article_content,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
