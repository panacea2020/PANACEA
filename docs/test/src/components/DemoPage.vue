<template>
  <div
    id="search-page"
    class="homebackground col-xs-12"
    style="margin-top:-200px"
  >
    <router-view />

    <div class="middle_box search">
      <p class="maintopic" style="margin-bottom: 0px; line-height: 90%; margin-top:10px">
        PANACEA
      </p>
      <p
        class="topic"
        style="font-size: 18px; margin-top: 0px; margin-bottom: 50px;"
      >
        PANdemic Ai Claim vEracity Assessment
      </p>
      <p
        class="topic"
        style="font-size: 20px; margin-left: 80px; margin-top: 30px;"
      ></p>

      <DemoClaimChoice
          v-for="(item, index) in claimsList"
          :info="item"
          :key="index"
        />
    </div>
  </div>
</template>

<script>
import test from "./data/selected_search_results_v4.json";
import DemoClaimChoice from "./DemoClaimChoice.vue";

export default {
  name: "search-page",
  data() {
    return {
      claim: "",
      sentData: {},
      artData: {},
      claimsList: {},
    };
  },
  components: {
    DemoClaimChoice,
  },
  methods: {
    updateClaim(claimNew) {
      this.$store.commit("changeName", claimNew);
      //console.log(this.$store.state.claim.inputClaim);
      this.inputClaim = this.$store.state.claim.inputClaim;
      //this.$router.push({ name: "ListArticle" });
      this.$router.push({path:"/list/article",query:{input:claimNew}});
    },

    getOverallStance(stanceString){
      stanceString = stanceString.substring(1,stanceString.length-1);
      stanceString = stanceString.split(",");

      console.log("overall stance string", stanceString);
      var scoreList = []
      for (var score in stanceString){
        scoreList.push(parseFloat(stanceString[score]));

        
      }
      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };
      Array.prototype.min = function() {
        return Math.min.apply(null, this);
      };

      var maxValue = scoreList.max();
      var maxIndex = scoreList.indexOf(Math.max(...scoreList));
      if (maxIndex == 0){
        console.log("true")
        return [maxValue, "Disagreement"]
      } else {
        return [scoreList[2], "Agreement"]
      }
    },

    getAllStance(stanceString){
      stanceString = stanceString.substring(1,stanceString.length-1);
      stanceString = stanceString.split(",");

      console.log("overall stance string", stanceString);
      var scoreList = []
      for (var score in stanceString){
        scoreList.push(parseFloat(stanceString[score]));
      }
      return scoreList
    },


    getSentStance(stanceString){
      stanceString = stanceString.substring(1,stanceString.length-1);
      stanceString = stanceString.split(",");
      var scoreList = []
      for (var score in stanceString){
        if (Object.prototype.hasOwnProperty.call(stanceString, score)){
          scoreList.push(parseFloat(stanceString[score]));
        }
      }
      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };
      Array.prototype.min = function() {
        return Math.min.apply(null, this);
      };

      var maxValue = scoreList.max();
      var maxIndex = scoreList.indexOf(Math.max(...scoreList));
      if (maxIndex == 0){
        return [maxValue, "Negative"]
      } else if (maxIndex == 1){
        return [maxValue, "Neutral"]
      } else {
        return [maxValue, "Positive"]
      }
    },

    getArticleStance(stanceString){
      stanceString = stanceString.substring(1,stanceString.length-1);
      stanceString = stanceString.split(",");
      var scoreList = []
      for (var score in stanceString){
        if (Object.prototype.hasOwnProperty.call(stanceString, score)){
          scoreList.push(parseFloat(stanceString[score]));
        }
      }
      return scoreList
    },

    loadClaims(){
      var claimNum = 20;
      for (var i = 0; i < claimNum; i++){
        var keys = Object.keys(test[i]);
        var query = test[i][keys[0]];
        this.claimsList[i] = {"id":i, "claim": query};
        console.log(i, query);
        console.log(this.claimsList);
      }
      
    },

    readFile(queryIndex) {
      //var queryIndex = 0;
      var unitLength = 13;
      console.log(test[queryIndex]);
      var keys = Object.keys(test[queryIndex]);
      console.log(keys);
      var sentIndex = -1;
      var articleIndex = -1;
      var currentSent = {};
      var currentArticle = {};
      var docList = [];
      var existIndex = 0;
      //var docScore;
      var query = test[queryIndex][keys[0]];
      console.log(query);
      var overallScore = test[queryIndex][keys[1]];
      overallScore = this.getAllStance(overallScore);
      for (var i = 2; i < keys.length; i++) {
        var currentData = test[queryIndex][keys[i]];
        //console.log(currentData);

        if (i % unitLength == 1) {
          var articleStance = this.getArticleStance(currentData);
          var singlearticleStance = this.getSentStance(currentData);
          
          console.log(sentStance);
          
          currentSent["sentid"] = sentIndex + 1;
          //currentSent["source"] = "undefined";
          currentSent["title"] = "undefined";
          currentSent["score"] = overallScore;
          currentSent["type"] = "undefined type";
          
          currentSent["stance"] = sentStance;
          currentSent["singleStance"] = currentSent["stance"];


          // for article based, resultToshow would be the title of article
          
          currentArticle["score"] = overallScore;
          currentArticle["type"] = "undefined type";
          currentArticle["id"] = articleIndex + 1;

          sentIndex = sentIndex + 1;
          var check_doc = docList.includes(currentSent["document"]);

          if (!check_doc) {
            //console.log("document");
            //console.log(currentSent["document"]);
            currentArticle["document"] = currentSent["document"];
            currentArticle["sentence"] = [currentSent["resultToshow"]];
            currentArticle["sentenceStance"] = [currentSent["stance"]];
            currentArticle["url"] = currentSent["url"];
            currentArticle["sentScore"] = [currentSent["sentScore"]];
            currentArticle["abstract"] = currentSent["document"].substring(0, 300);
            currentArticle["source"] = currentSent["source"];
            currentArticle["resultToshow"] = articleTitle;
            currentSent["id"] = currentArticle["id"]
            // Might need average all sentence to get the document level one
            currentArticle["stance"] = articleStance;
            currentArticle["singleStance"] = singlearticleStance;

            docList.push(currentSent["document"]);
            articleIndex = articleIndex + 1;
            existIndex = articleIndex;
          } else { 
            // find the existing article index, which is the same article as the current one
            existIndex = docList.indexOf(currentSent["document"]);
            currentSent["id"] = existIndex;
            currentArticle = this.artData[existIndex];
            

            //update sentence
            var existSentList = currentArticle["sentence"];
            var existSentStanceList = currentArticle["sentenceStance"];
            //console.log(existSentList)
            existSentList.push(currentSent["resultToshow"]);
            existSentStanceList.push(currentSent["stance"]);
            currentArticle["sentence"] = existSentList;
            currentArticle["sentenceStance"] = existSentStanceList;
            //update sentence score
            var existSentscoreList = currentArticle["sentScore"];
            existSentscoreList.push(currentSent["sentScore"]);
            currentArticle["sentScore"] = existSentscoreList;
          }
          console.log("document index", currentSent["id"]);
          this.sentData[sentIndex] = JSON.parse(JSON.stringify(currentSent));
          //console.log(existIndex);
          this.artData[existIndex] = JSON.parse(JSON.stringify(currentArticle));
        } else if (i % unitLength == 2) {
          // for sentence based, resultToshow would be the sentence
          currentSent["resultToshow"] = currentData;
        } else if (i % unitLength == 3) {
          currentSent["abstract"] = currentData;
        } else if (i % unitLength == 4) {
          currentSent["document"] = currentData;
        } else if (i % unitLength == 5) {
          currentSent["url"] = currentData;
        } else if (i % unitLength == 6) {
          currentSent["sentScore"] = currentData;
        } else if (i % unitLength == 7) {
          currentArticle["docScore"] = currentData;
        } else if (i % unitLength == 11) {
          currentSent["source"] = currentData;
        } else if (i % unitLength == 12) {
          var articleTitle = currentData;
        } else if (i % unitLength == 0) {
          var sentStance = this.getSentStance(currentData);
        }
      }

      console.log("sentence data");
      console.log(this.sentData);
      console.log("article data");
      console.log(this.artData);

      var reoderResult = this.reOrder(this.artData, "docScore");
      for (i in this.sentData) {
        this.sentData[i]["id"] = reoderResult[this.sentData[i]["id"]];
      }

      var newartData = {};
      for (i in this.artData) {
        this.artData[i]["id"] = reoderResult[i];
        this.artData[i]["content"] = this.splitDocument(this.artData[i]["document"], this.artData[i]["sentence"], this.artData[i]["sentenceStance"]);
        newartData[reoderResult[i]] = this.artData[i];
      }

      this.$store.commit("updateSentData", this.sentData);
      this.$store.commit("updateArtData", newartData);
      console.log(newartData);
    },

    reOrder(dict, keyChosen) {
      var items = Object.keys(dict).map(function(key) {
        return [key, dict[key][keyChosen]];
      });
      items.sort(function(first, second) {
        return second[1] - first[1];
      });

      var reoderResult = [];
      for (var item in items) {
        reoderResult.push(items[item][0]);
      }
      var mappingResult = [];
      for (var key in Object.keys(dict)) {
        mappingResult.push(reoderResult.indexOf(key));
      }
      //console.log(mappingResult);
      return mappingResult;
    },

    splitDocument(document, sentenceList, sentenceStanceList){
      const sentenceHighlight = 3;
      console.log("sentenceStanceList", sentenceStanceList)
      sentenceList = sentenceList.slice(0, sentenceHighlight);
      var splitCheckpoint = [0, document.length];
      //console.log(document);
      //console.log(sentenceList);
      for (var sentence in sentenceList){
        //document.split(sentence);
        var currentIndex = document.indexOf(sentenceList[sentence]);
        var currentLength = sentenceList[sentence].length;
        splitCheckpoint.push(currentIndex);
        splitCheckpoint.push(currentIndex + currentLength);
        //console.log(sentenceList[sentence]);
        //console.log([currentIndex,currentIndex + currentLength]);
      }
      splitCheckpoint.sort(function(a, b){return a - b});
      console.log(splitCheckpoint);

      var splitResult = [];
      var stance = 0;
      for (var i = 1; i < splitCheckpoint.length; i++){
        var docSlice = document.substring(splitCheckpoint[i-1], splitCheckpoint[i]);
        if (sentenceList.includes(docSlice)){
          splitResult.push([docSlice, sentenceStanceList[stance]]);
          stance = stance + 1;
        } else {
          splitResult.push([docSlice, [0, "Neutral"]]);
        }
      }
      console.log("splitResult");
      console.log(splitResult);
      return splitResult
    }
  },
  created() {
    this.loadClaims();
  },
};
</script>

<style scoped>
.homebackground {
  background-image: "url('~@/assets/background/fog.jpg')";
  background-size: 100% 100%;
  height: 100vh;
  overflow: hidden;
}

.maintopic {
  margin-left: 28vw;
  color: white;
  font-size: 65px;
  text-align: left;
}

.topic {
  margin-top: 10px;
  margin-left: 28vw;
  color: white;
  font-size: 35px;
  text-align: left;
}

.jumpbutton {
  background-color: rgba(43, 43, 43, 0.9);
  border: none;
  color: white;
  width: 200px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  margin-left: 60px;
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
  top: 20%;
  left: 50%;
}

.search {
  height: 600px;
  width: 80vw;
  margin-top: 0px;
  margin-left: -40vw;
}
</style>
