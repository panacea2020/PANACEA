<template>
  <div style="width: 70%; margin-left: 15%; margin-top: 50px; margin-bottom: 200px;" id="app">
    <div></div>
    <ArticleMain v-for="(item, index) in articleArr" :info="item" :key="index"/>
  </div>
</template>

<script>
import ArticleMain from './components/ArticleMain.vue'
import article_content from './article_content.json'

export default {
  name: 'App',
  components: {
    ArticleMain
  },
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
