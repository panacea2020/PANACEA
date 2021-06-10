<template>
  <div id="app">
    <v-app>
      <v-app-bar app dense fixed>
        <v-toolbar-title>Title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text>Link One</v-btn>
          <v-btn text>Link Two</v-btn>
          <v-btn text>Link </v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <v-content>
        <v-container fluid>
          <h1 v-for="n in 20" :key="n">{{ n }}</h1>
        </v-container>
      </v-content>
    </v-app>

    <v-toolbar dense fixed app class="toptopic row">
      <div class="col-2">
        <div style="height: 10px;"></div>
        <!-- <img src="./pictures/background/logo.jpg" alt="covid" style="width:180px"> -->
        <b
          style="color: rgb(219, 219, 219); font-size: 35px; height: 40px; margin-left: 10px;"
          >PANACEA</b
        >
        <div style="height: 2px;"></div>
      </div>
      <div class="col-10">
        <div style="height: 10px;"></div>
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="./index.html">Home</a>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link"
              href="#"
              id="dropdown_link"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              About <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdown_link">
              <li><a class="dropdown-item" href="./about.html">About</a></li>
              <li><a class="dropdown-item" href="./news.html">News</a></li>
              <li>
                <a class="dropdown-item" href="./publications.html"
                  >Publications</a
                >
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="./team.html">Team</a>
          </li>
          <li class="nav-item active font-weight-bold">
            <a class="nav-link" aria-current="page" href="./demo.html">Demo</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="./contact.html"
              >Contact us</a
            >
          </li>
        </ul>
      </div>
    </v-toolbar>

    <div
      style="width: 70%; margin-left: 15%; margin-top: 50px; margin-bottom: 200px;"
    >
      <ArticleMain
        v-for="(item, index) in articleArr"
        :info="item"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import ArticleMain from "@/components/ArticleMain.vue";
import article_content from "@/data/article_content.json";

export default {
  name: "App",
  components: {
    ArticleMain,
  },
  data() {
    return {
      a: 100,
      articleArr: article_content,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
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
  background-color: rgba(76, 83, 82, 0.2);
}

.toptopic {
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

.navbar-default .navbar-nav > .open > a,
.navbar-default .navbar-nav > .open > a:focus {
  background-color: rgb(206, 206, 206) !important;
}

.active a {
  background-color: rgb(66, 66, 66) !important;
  color: rgb(255, 255, 255) !important;
}

.nav-pills a {
  color: rgb(160, 160, 160);
  font-size: 16px;
}

.nav-pills a:hover {
  background-color: rgb(66, 66, 66) !important;
  color: rgb(160, 160, 160) !important;
}

.nav-item {
  width: 15%;
  text-align: center;
  margin-top: 5px;
}

ul.nav li.dropdown:hover > ul.dropdown-menu {
  display: block;
}

.dropdown-menu {
  width: 12vw !important;
  text-align: center;
}

.modal-lg {
  max-width: 80vw;
}
</style>
