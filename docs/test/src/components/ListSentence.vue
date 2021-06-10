<template>
  <div id="list-sentence">
    <router-view />
    <div class="homebackground">
      <div
        style=" background-color: rgb(224, 224, 224); height: 25px; padding: 0; display: inline-block; border-radius: 5px; margin-top:30px; "
      >
        <input
          v-model="claim"
          class="fillmessage"
          type="text"
          :placeholder="inputClaim"
        />

        <button class="jumpbutton" @click="Clear()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="rgba(128, 128, 128, 0.8)"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
        <div style="display: inline; color: rgba(128, 128, 128, 0.438);">
          |
        </div>
        <button
          class="jumpbutton"
          @click="updateClaim(claim)"
          style="padding: 0px 18px 0px 0px; border-radius: 5px;"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="rgba(128, 128, 128, 0.8)"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </button>
      </div>

      <div class="row" style="width: 50%; margin-left: 24%;">
        <div class="col-4">
          <p
            class="overall-score"
            :style="{ color: adjustColor('rgb(170, 57, 29,', score[0]) }"
          >
            {{ Math.round(score[0] * 100) }}%
            <span
              class="score-name"
              :style="{ color: adjustColor('rgb(170, 57, 29,', score[0]) }"
            >
              Contradict
            </span>
          </p>
        </div>

        <div class="col-4">
          <p
            class="overall-score"
            :style="{ color: adjustColor('rgb(255, 195, 11,', score[1]) }"
          >
            {{ Math.round(score[1] * 100) }}%
            <span
              class="score-name"
              :style="{ color: adjustColor('rgb(255, 195, 11,', score[1]) }"
            >
              Neutral
            </span>
          </p>
        </div>

        <div class="col-4">
          <p
            class="overall-score"
            :style="{ color: adjustColor('rgb(0,128,0,', score[2]) }"
          >
            {{ Math.round(score[2] * 100) }}%
            <span
              class="score-name"
              :style="{ color: adjustColor('rgb(0,128,0,', score[2]) }"
            >
              Support
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div
        class="col-1"
        style="padding: 0; text-align: left; margin-left:20px; margin-top:50px"
      >
        <p style="font-size: 20px;">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-sort-down"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
            />
          </svg>
          Sort by:
        </p>
        <button
          class="sourcebutton"
          style="border-radius: 0 15px 15px 0; margin-top: 0px; background-color: rgba(99, 95, 89, 0); margin-left:-10px"
          @click="changeSortby()"
        >
          Article
        </button>
        <button
          class="sourcebutton"
          style="border-radius: 0 15px 15px 0; margin-top: 0px; margin-left:-10px"
        >
          Sentence
        </button>

        <button
          v-on:click="show_filters = !show_filters"
          style="border:none; margin-top:20px; font-size: 20px; background:white; margin-left:-8px"
        >
          <svg
            style="margin-top: -5px"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path
              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            />
          </svg>
          More
        </button>
        <div v-if="show_filters" style="color:grey; margin-left:5px">
          <p style="font-size: 18px; margin-top: 10px;  margin-bottom:5px">
            Source Filter:
          </p>
          <div style="margin-left:20px; margin-top:0px; margin-left:20px">
            <input
              type="radio"
              id="all_source"
              value="false"
              :name="source_filter"
              @click="sourceReset()"
              :checked="true"
            />
            <label for="all_source" style="font-weight: normal">All Sources</label>
            <br />
            <input
              type="radio"
              id="selected_source"
              value="true"
              :name="source_filter"
              @click="source_filter = true"
              :checked="false"
            />
            <label for="selected_source" style="font-weight: normal"
              >Select Sources</label
            >
            <br />
          </div>

          <div v-if="source_filter">
            <div
              v-for="(sourceI, index) in sourceList"
              :key="index"
              style="margin-left:20px"
            >
              <input
                type="checkbox"
                :value="sourceI"
                :checked="true"
                @click="filterChange('source', sourceI)"
              />
              {{ sourceI }}
            </div>
          </div>

          <p style="font-size: 18px; margin-top: 10px;  margin-bottom:5px">
            Relevance Filter:
          </p>
          <div style="margin-left:20px">
            <input
              type="radio"
              id="all_relevance_score"
              value="all_relevance_score"
              name="score_filter"
              checked="checked"
            />
            <label for="all_relevance_score" style="font-weight: normal"
              >All Results</label
            >
            <br />
            <input
              type="radio"
              id="low_relevance_score"
              value="low_relevance_score"
              name="score_filter"
            />
            <label for="low_relevance_score" style="font-weight: normal"
              >Score above 30%</label
            >
            <br />
            <input
              type="radio"
              id="high_relevance_score"
              value="high_relevance_score"
              name="score_filter"
            />
            <label for="high_relevance_score" style="font-weight: normal"
              >Score above 60%</label
            >
            <br />
          </div>

          <p style="font-size: 18px; margin-top: 10px;  margin-bottom:5px">
            Type Filter:
          </p>
          
          <div style="margin-left:20px; margin-top:0px; margin-left:20px">
            <input
              type="radio"
              id="all_type"
              value="false"
              :name="type_filter"
              @click="typeReset()"
              :checked="true"
            />
            <label for="all_type" style="font-weight: normal">All Types</label>
            <br />
            <input
              type="radio"
              id="selected_source"
              value="true"
              :name="type_filter"
              @click="type_filter = true"
              :checked="false"
            />
            <label for="selected_source" style="font-weight: normal"
              >Select Types</label
            >
            <br />
          </div>

          <div v-if="type_filter">
            <div
              v-for="(sourceI, index) in typeList"
              :key="index"
              style="margin-left:20px"
            >
              <input
                type="checkbox"
                :value="sourceI"
                :checked="true"
                @click="filterChange('type', sourceI)"
              />
              {{ sourceI }}
            </div>
          </div>

          <p style="font-size: 18px; margin-top: 10px;  margin-bottom:5px">
            Stance Filter:
          </p>
          
          <div style="margin-left:20px; margin-top:0px; margin-left:20px">
            <input
              type="radio"
              id="all_stance"
              value="false"
              :name="stance_filter"
              @click="stanceReset()"
              :checked="true"
            />
            <label for="all_stance" style="font-weight: normal">All Stances</label>
            <br />
            <input
              type="radio"
              id="selected_source"
              value="true"
              :name="stance_filter"
              @click="stance_filter = true"
              :checked="false"
            />
            <label for="selected_source" style="font-weight: normal"
              >Select Stances</label
            >
            <br />
          </div>

          <div v-if="stance_filter">
            <div
              v-for="(sourceI, index) in stanceList"
              :key="index"
              style="margin-left:20px"
            >
              <input
                type="checkbox"
                :value="sourceI"
                :checked="true"
                @click="filterChange('stance', sourceI)"
              />
              {{ sourceI }}
            </div>
          </div>
          
        </div>
      </div>

      <div
        class="col-9"
        style="width: 65%; margin-left: 6%; margin-top: 50px; margin-bottom: 200px;"
      >
        <ArticleMain
          v-for="(item, index) in dataToshow"
          :info="item"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleMain from "./ArticleMain.vue";

export default {
  name: "ListSentence",
  components: {
    ArticleMain,
  },
  data() {
    return {
      inputClaim: undefined,
      inputData: undefined,
      dataToshow: undefined,
      show_filters: false,
      source_filter: false,
      type_filter: false,
      stance_filter: false,

      sourceList: undefined,
      sourceToshow: undefined,
      typeList: ["Article", "Official information", "Peer-reviewed paper"],
      typeToshow: ["Article", "Official information", "Peer-reviewed paper"],
      stanceList: ["Contradict", "Neutral", "Support"],
      stanceToshow: ["Contradict", "Neutral", "Support"],

      currentFillmessage: "Input another claim you want to check",
      claim: "",
      score: undefined,
      colorChoice: [
        "rgb(170, 57, 29)",
        "rgb(201, 140, 8)",
        "rgb(176, 179, 0)",
        "rgb(121, 148, 0)",
        "rgb(0, 119, 16)",
      ],
    };
  },
  mounted() {
    this.inputClaim = this.$store.state.claim.inputClaim;
    console.log("check");
    console.log(this.inputClaim);
    this.inputData = this.$store.state.claim.data.sentData;
    this.dataToshow = { ...this.inputData };
    console.log("datatoshow", this.dataToshow);
    this.getData();
    //console.log("inputdata")
    //console.log(this.inputData);
  },
  created() {},
  methods: {
    
    sourceReset(){
      this.sourceToshow = this.sourceList.slice();
      console.log("reset", this.sourceToshow);
      this.source_filter = false;
      this.updateDataToshow(this.sourceList, this.typeList, this.stanceList);
    },
    typeReset() {
      this.typeToshow = this.typeList.slice();
      //console.log("reset", this.sourceToshow);
      this.type_filter = false;
      this.updateDataToshow(this.sourceList, this.typeList, this.stanceList);
    },
    stanceReset() {
      this.stanceToshow = this.stanceList.slice();
      //console.log("reset", this.sourceToshow);
      this.stance_filter = false;
      this.updateDataToshow(this.sourceList, this.typeList, this.stanceList);
    },
    filterChange(filter, content) {
      //console.log("test")
      if (filter == "source") {
        if (this.sourceToshow.includes(content)) {
          // remove
          const index = this.sourceToshow.indexOf(content);
          if (index > -1) {
            this.sourceToshow.splice(index, 1);
          }
        } else {
          this.sourceToshow.push(content);
          console.log("123");
        }
      } else if (filter == "type") {
        if (this.typeToshow.includes(content)) {
          const index = this.typeToshow.indexOf(content);
          if (index > -1) {
            this.typeToshow.splice(index, 1);
          }
        } else {
          this.typeToshow.push(content);
        }
      } else if (filter == "stance") {
        if (this.stanceToshow.includes(content)) {
          const index = this.stanceToshow.indexOf(content);
          if (index > -1) {
            this.stanceToshow.splice(index, 1);
          }
        } else {
          this.stanceToshow.push(content);
        }
      }

      //console.log("source to show", this.sourceToshow);
      console.log(filter, content, this.sourceToshow, this.typeToshow, this.stanceToshow);
      this.updateDataToshow(this.sourceToshow, this.typeToshow, this.stanceToshow);
      console.log(this.dataToshow);
    },
    updateDataToshow(sourceToshow, typeToshow, stanceToshow) {
      this.dataToshow = {};
      var keys = Object.keys(this.inputData);
      // update date to show based on current sourceToshow and scoreToshow
      for (var key in keys) {
        var currentsource = this.inputData[key]["source"];
        var currenttype = this.inputData[key]["type"];
        var currentstance = this.inputData[key]["singleStance"][1];
        console.log("stance", this.inputData[key]["singleStance"][1])
        if (
          sourceToshow.includes(currentsource) &&
          typeToshow.includes(currenttype) &&
          stanceToshow.includes(currentstance)
        ) {
          console.log(key, this.inputData[key]["source"], sourceToshow);
          this.dataToshow[key] = this.inputData[key];
        }
      }
    },
    updateClaim(claimNew) {
      //console.log(claimNew);
      this.$store.commit("changeName", claimNew);
      //console.log(this.$store.state.claim.inputClaim);
      this.inputClaim = this.$store.state.claim.inputClaim;
    },
    changeSortby() {
      this.$router.push({ name: "ListArticle" });
    },
    Clear() {
      this.claim = "";
      console.log(this.claim);
    },
    getData() {
      var keys = Object.keys(this.inputData);
      this.score = this.inputData[keys[0]].score;
      this.sourceList = this.inputData[keys[0]].sourceList;
      console.log(this.sourceList);
      this.sourceToshow = this.sourceList.slice();
    },
    adjustColor(color, sentscore) {
      var transparent_rate = sentscore * 0.7 + 0.3;
      return color.concat(transparent_rate.toString()).concat(")");
    },
    getColor(sentscore) {
      var score = sentscore[0];
      var stance = sentscore[1];
      if (stance == "Disagreement") {
        return "rgb(170, 57, 29,".concat(score.toString()).concat(")");
      } else if (stance == "Agreement") {
        return "rgb(0, 119, 16,".concat(score.toString()).concat(")");
      }
    },
  },
};
</script>

<style>
body,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Lato", sans-serif;
}

.fillmessage {
  background-color: rgb(224, 224, 224);
  min-height: 25px;
  width: 40vw;
  border: none;
  background-color: rgb(224, 224, 224);
  border-radius: 5px;
}

.jumpbutton {
  background-color: rgb(224, 224, 224);
  border: none;
  color: rgba(128, 128, 128, 0.438);
  padding: 3px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 0;
  width: 17px;
  cursor: pointer;
}

.overall-score {
  font-size: 45px;
  width: 300px;
  margin-top: 30px;
}
.score-name {
  font-size: 20px;
}

.homebackground {
  background-image: "url('~@/assets/background/fog.jpg')";
  background-size: 100%;
  margin-top: 0px;
  height: 180px;
  overflow: hidden;
}
</style>
