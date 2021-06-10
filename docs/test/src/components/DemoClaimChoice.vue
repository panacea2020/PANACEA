<template>
  <div
    class="row"
    style="background-color: rgb(255,255,255,0.35); border-color: rgba(128, 128, 128, 0.411); border-style: solid;"
  >
    <div style="text-align:left;">
        <router-link v-bind:to="'/list/article'">
            <b @click="readFile(info.id)" class="resulttitle">{{ info.claim }}</b>
        </router-link>
    </div>
  </div>
</template>

<script>
import test from "./data/selected_search_results_v4.json";

export default {
  props: ["info"],
  created() {
  },
  data() {
    return {
      claim: "",
      sentData: {},
      artData: {},
    };
  },
  methods: {
    updateClaim(claimNew) {
      this.$store.commit("changeName", claimNew);
      //console.log(this.$store.state.claim.inputClaim);
      this.inputClaim = this.$store.state.claim.inputClaim;
      //this.$router.push({ name: "ListArticle" });
      this.$router.push({
        path: "/list/article",
        query: { input: this.claim },
      });
    },

    getOverallStance(stanceString) {
      stanceString = stanceString.substring(1, stanceString.length - 1);
      stanceString = stanceString.split(",");

      //console.log("overall stance string", stanceString);
      var scoreList = [];
      for (var score in stanceString) {
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
      if (maxIndex == 0) {
        //console.log("true");
        return [maxValue, "Disagreement"];
      } else {
        return [scoreList[2], "Agreement"];
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

    getSentStance(stanceString) {
      stanceString = stanceString.substring(1, stanceString.length - 1);
      stanceString = stanceString.split(",");
      var scoreList = [];
      for (var score in stanceString) {
        if (Object.prototype.hasOwnProperty.call(stanceString, score)) {
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
      if (maxIndex == 0) {
        return [maxValue, "Contradict"];
      } else if (maxIndex == 1) {
        return [maxValue, "Neutral"];
      } else {
        return [maxValue, "Support"];
      }
    },

    getArticleStance(stanceString) {
      stanceString = stanceString.substring(1, stanceString.length - 1);
      stanceString = stanceString.split(",");
      var scoreList = [];
      for (var score in stanceString) {
        if (Object.prototype.hasOwnProperty.call(stanceString, score)) {
          scoreList.push(parseFloat(stanceString[score]));
        }
      }
      return scoreList;
    },


    loadClaims() {
      var claimNum = 20;
      for (var i = 0; i < claimNum; i++) {
        var keys = Object.keys(test[i]);
        var query = test[i][keys[0]];
        this.claimsList[i] = { id: i, claim: query };
        //console.log(i, query);
        //console.log(this.claimsList);
      }
    },

    readFile(queryIndex) {
      //var queryIndex = 0;
      console.log("index", queryIndex)
      var unitLength = 13;
      //console.log(test[queryIndex]);
      var keys = Object.keys(test[queryIndex]);
      //console.log(keys);
      var sentIndex = -1;
      var articleIndex = -1;
      var currentSent = {};
      var currentArticle = {};
      var sourceList = [];
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

          //console.log(sentStance);

          currentSent["show"] = "true";
          currentSent["sentid"] = sentIndex + 1;
          //currentSent["source"] = "undefined";
          currentSent["title"] = "undefined";
          currentSent["score"] = overallScore;
          currentSent["type"] = "Article";

          currentSent["stance"] = sentStance;
          currentSent["singleStance"] = sentStance;

          // for article based, resultToshow would be the title of article

          currentArticle["score"] = overallScore;
          currentArticle["type"] = "Article";
          currentArticle["id"] = articleIndex + 1;
          

          sentIndex = sentIndex + 1;
          var check_doc = docList.includes(currentSent["document"]);

          if (!check_doc) {
            //console.log("document");
            //console.log(currentSent["document"]);
            currentArticle["show"] = "true";
            currentArticle["document"] = currentSent["document"];
            currentArticle["sentence"] = [currentSent["resultToshow"]];
            var existSentStanceList = {}
            existSentStanceList[currentSent["resultToshow"]] = currentSent["stance"];
            currentArticle["sentenceStance"] = existSentStanceList;
            currentArticle["url"] = currentSent["url"];
            currentArticle["sentScore"] = [currentSent["sentScore"]];
            currentArticle["abstract"] = currentSent["document"].substring(0, 300);
            currentArticle["source"] = currentSent["source"];
            //sourceList.push(currentSent["source"]);
            
            //if (!sourceList.includes(currentSent["source"])) {
            //  sourceList.push(currentSent["source"]);
            //  currentSent["sourceList"] = sourceList;
            //  currentArticle["sourceList"] = sourceList;
            //}
            //console.log("check", sourceList, currentSent["source"], sourceList.includes(currentSent["source"]));
            
            currentArticle["resultToshow"] = articleTitle;
            // Might need average all sentence to get the document level one
            currentArticle["stance"] = articleStance;
            currentArticle["singleStance"] = singlearticleStance;
            currentSent["id"] = currentArticle["id"]

            docList.push(currentSent["document"]);
            articleIndex = articleIndex + 1;
            existIndex = articleIndex;
          } else {
            // find the existing article index, which is the same article as the current one
            existIndex = docList.indexOf(currentSent["document"]);
            currentSent["id"] = existIndex;
            currentArticle = this.artData[existIndex];
            //console.log(existIndex);

            //update sentence
            var existSentList = currentArticle["sentence"];
            existSentStanceList = currentArticle["sentenceStance"];
            //console.log(existSentList)
            existSentList.push(currentSent["resultToshow"]);
            //existSentStanceList.push(currentSent["stance"]);
            existSentStanceList[currentSent["resultToshow"]] = currentSent["stance"];
            currentArticle["sentence"] = existSentList;
            currentArticle["sentenceStance"] = existSentStanceList;
            //update sentence score
            var existSentscoreList = currentArticle["sentScore"];
            existSentscoreList.push(currentSent["sentScore"]);
            currentArticle["sentScore"] = existSentscoreList;
          }

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
      
      // remove blank data
      for (i in this.artData) {
        if (this.artData[i]["abstract"] == ""){
          delete this.artData[i];
        } else {
          if (!sourceList.includes(this.artData[i]["source"])) {
            sourceList.push(this.artData[i]["source"]);
          }
        }
      }
      for (i in this.sentData) {
        if (this.sentData[i]["abstract"] == ""){
          delete this.sentData[i];
        }
      }

      // add source list to both data
      for (i in this.artData) {
        this.artData[i]["sourceList"] = sourceList;
      }
      for (i in this.sentData){
        this.sentData[i]["sourceList"] = sourceList;
        //console.log("check artdata",sourceList, this.artData);
      }

      

      //console.log("sentence data");
      //console.log(this.sentData);
      //console.log("article data");
      //console.log(this.artData);

      var reoderResult = this.reOrder(this.artData, "docScore");
      for (i in this.sentData) {
        this.sentData[i]["id"] = reoderResult[this.sentData[i]["id"]];
      }

      var newartData = {};
      for (i in this.artData) {
        this.artData[i]["id"] = reoderResult[i];
        this.artData[i]["content"] = this.splitDocument(
          this.artData[i]["document"],
          this.artData[i]["sentence"],
          this.artData[i]["sentenceStance"]
        );
        this.artData[i]["abstract"] = this.GetTopsent(this.artData[i]["content"]);
        newartData[reoderResult[i]] = this.artData[i];
      }

      this.$store.commit("updateSentData", this.sentData);
      this.$store.commit("updateArtData", newartData);
      //console.log(newartData);
      this.updateClaim(query)
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

    GetTopsent(content){
      var abstract = "";
      for (var sent in content){
        try{
          if (content[sent][1][0] != 0) {
            
            abstract = abstract + content[sent][0] + "...";
            console.log(content[sent][0]);
          }
        }
        catch {
          console.log("current sentence", sent, content[sent])
        }
      }
      abstract = abstract.substring(0, 300);
      return abstract
    },

    splitDocument(document, sentenceList, sentenceStanceList) {
      //var abstract = "";
      const sentenceHighlight = 3;
      console.log("sentenceStanceList", sentenceStanceList);
      sentenceList = sentenceList.slice(0, sentenceHighlight);
      var splitCheckpoint = [0, document.length];
      console.log(document);
      console.log(sentenceList);
      for (var sentence in sentenceList) {
        //document.split(sentence);
        var currentIndex = document.indexOf(sentenceList[sentence]);
        var currentLength = sentenceList[sentence].length;
        splitCheckpoint.push(currentIndex);
        splitCheckpoint.push(currentIndex + currentLength);
        //console.log(sentenceList[sentence]);
        //console.log([currentIndex,currentIndex + currentLength]);
      }
      splitCheckpoint.sort(function(a, b) {
        return a - b;
      });
      //console.log(splitCheckpoint);

      var splitResult = [];
      var stance = 0;
      for (var i = 1; i < splitCheckpoint.length; i++) {
        var docSlice = document.substring(
          splitCheckpoint[i - 1],
          splitCheckpoint[i]
        );
        if (sentenceList.includes(docSlice)) {
          splitResult.push([docSlice, sentenceStanceList[docSlice]]);
          //console.log("abstract", abstract);
          //abstract.concat(docSlice);
          stance = stance + 1;
        } else {
          splitResult.push([docSlice, [0, "Neutral"]]);
        }
      }
      //console.log("splitResult");
      //console.log(splitResult);
      return splitResult;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resultsource {
  font-size: 15px;
  text-align: right;
  color: rgb(107, 107, 107);
  margin-top: 10px;
}

.resulttext {
  font-size: 15px;
  color: rgb(107, 107, 107);
}

.resulttitle {
  font-size: 16px;
  background-color: rgb(255, 255, 255, 0);
  color: rgb(107, 107, 107);
  border: none;
  margin-top: 5px;
  text-align: left;
}
</style>
