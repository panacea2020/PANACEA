<template>
  <div style="width: 70%; margin-left: 15%; margin-top: 50px; margin-bottom: 200px;" id="app">
    <div><a
            href="result_article.html"
          >
            About Us
          </a></div>
    <ArticleMain v-for="(item, index) in articleArr" :info="item" :key="index"/>
  </div>
</template>

<script>
import ArticleMain from '@/components/ArticleMain.vue'
import article_content from '@/data/article_content.json'

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

.homebackground {
            background-image: 'url("@/@/assets/background/fog.jpg")';
            background-size: 100%;
            height: 30vh;
            min-height: 200px;
            overflow: hidden;
        }

        .maintopic {
            color: white;
            font-size: 35px;
            text-align: left;
        }

        .topic {
            margin-top: 10px;
            width: 100%;
            color: white;
            font-size: 35px;
            text-align: center;
        }

        .jumpbutton {
            background-color: rgba(43, 43, 43, 0.9);
            border: none;
            color: white;
            padding: 1vh 2vw;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 0;
            width: 12vw;
            cursor: pointer;
        }

        .maintitle {
            margin-top: 10px;
            color: black;
            font-size: 35px;
            text-align: left;
        }

        .maintext {
            color: rgb(107, 107, 107);
            font-size: 17px;
            text-align: left;
        }

        .background1 {
            background-color: rgba(76, 83, 82, 0.2)
        }

        .toptopic {
            width: 100%;
            background-color: black;
        }

        .navbarbutton {
            background-color: black;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
        }

        .fillmessage {
            background-color: rgb(224, 224, 224);
            margin-left: 10%;
            margin-bottom: 5%;
            border: none;
            min-height: 25px;
            width: 37%;
        }

        .middle_box {
            position: fixed;
            top: 50%;
            left: 50%;
        }

        .search {
            height: 400px;
            width: 800px;
            margin-top: -300px;
            margin-left: -400px;
        }

        .sourcebutton {
            color: rgb(138, 136, 136);
            margin-left: 0px;
            border: none;
            padding: 8px 32px;
            text-align: center;
            font-size: 15px;
            cursor: pointer;
        }

        .resulttitle {
            font-size: 20px;
            background-color: white;
            color: rgb(107, 107, 107);
            border: none;
            margin-top: 5px;
            text-align: left;
        }

        .resulttext {
            font-size: 15px;
            color: rgb(107, 107, 107);
        }

        .resultsource {
            font-size: 15px;
            text-align: right;
            color: rgb(107, 107, 107);
            margin-top: 10px;
        }

</style>
