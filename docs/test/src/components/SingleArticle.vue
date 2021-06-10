<template>
  <div id="single-article" style="margin-top:0px">
    <div class="col-xs-12" style="width:100%">
      <p
        style="font-size: 15px; text-align: left; margin-top:20px; margin-left: 1%;"
      >
        <span><b>Result for text searched: </b></span>
        <i>{{ inputClaim }}</i>
      </p>
    </div>
    <div
      class="row"
      style="background-color: rgba(99, 95, 89, 0.048); margin-top: 30px; padding: 0; border: none;"
    >
      <div class="col-xs-12" style="width:60%; margin-left: 20%;">
        <h5
          class="resulttext"
          style="font-size: 20px; margin-top: 50px; text-align: center;"
        >
          <span style="font-size: 25px;">{{ singleArticle.resultToshow }}</span>
          <p style="margin-top: 20px;">
            <span></span>
            <a :href="singleArticle.url"
              ><img
                src="@/assets/logo/logo.png"
                style="width:22px; margin-top:-2px"
              />
              <span style="color:teal; margin: 8px"
                >Full document in
                <b>{{ singleArticle.source }}</b>
              </span>
            </a>
            <span style="margin:5px">|</span>
            <span style="color:rgb(12, 70, 146)">
              <span>Share</span>

              <span style="position: relative; margin-left:3px">
                <ShareNetwork
                  network="twitter"
                  url="http://localhost:8080/demo.html#/article/1"
                  title="PANACEA: PANdemic Ai Claim vEracity Assessment. An AI-enabled evidence-driven framework for claim veracity assessment during pandemics."
                  hashtags="PANACEA"
                >
                  <font-awesome-icon
                    :icon="{ prefix: 'fab', iconName: 'twitter' }"
                    style="color:#1da1f2;"
                  />
                </ShareNetwork>
              </span>

              <span style="position: relative; margin-left:3px">
                <ShareNetwork
                  network="facebook"
                  url="http://localhost:8080/demo.html#/article/1"
                  title="PANACEA: PANdemic Ai Claim vEracity Assessment. An AI-enabled evidence-driven framework for claim veracity assessment during pandemics."
                  hashtags="PANACEA"
                >
                  <font-awesome-icon
                    :icon="{ prefix: 'fab', iconName: 'facebook' }"
                  />
                </ShareNetwork>
              </span>

              <span
                style="position: relative; margin-left:5px; vertical-align: up;;"
              >
                <ShareNetwork
                  network="email"
                  url="http://localhost:8080/demo.html#/article/1"
                  title="PANACEA: PANdemic Ai Claim vEracity Assessment. An AI-enabled evidence-driven framework for claim veracity assessment during pandemics."
                  hashtags="PANACEA"
                >
                <font-awesome-icon
                    :icon="{ prefix: 'fas', iconName: 'envelope' }"
                    style="color:grey"
                  />
                </ShareNetwork>
              </span>
            </span>
          </p>
        </h5>
      </div>
    </div>

    <div
      class="row"
      style="margin-top: 30px; padding: 0; border: none; margin-left: 5%; margin-right: 5%; width: 90%;"
    >
      <div class="col-8">
        <p id="show_query_modal" style="font-size: 20px; text-align: left;">
          Document Content:
        </p>
        <div style="text-align: left;">
          <span
            v-for="item in sentlist"
            v-bind:key="item"
            :style="{ 'background-color': getColor(item[1]) }"
            >{{ item[0] }}
          </span>
        </div>
      </div>
      <div class="col-4">
        <p
          class="resulttext"
          style="text-align: center; width:100%; height: 1vw;"
        >
          Document relation to searched sentence?
        </p>
        <div
          id="positionchart"
          class="container"
          style="width:24vw; height:300px; margin-top:30px; align:center"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "single-article",
  data() {
    return {
      id: this.$route.params.id,
      inputData: undefined,
      singleArticle: undefined,
      sentlist: undefined,
      sentscore: undefined,
      stance: undefined,
      inputClaim: undefined,
      colorChoice: [
        "white",
        "rgba(255, 68, 21, 0.7)",
        "rgba(255, 166, 0, 0.5)",
        "rgba(0, 128, 0, 0.15)",
        "rgba(0, 128, 0, 0.5)",
      ],
    };
  },
  mounted() {
    //console.log("start");
    //this.inputClaim = this.$store.state.claim.inputClaim;
    this.inputData = this.$store.state.claim.data.artData;
    var myChart = this.$echarts.init(document.getElementById("positionchart"));
    myChart.setOption({
      legend: {
        top: "0%",
        left: "center",
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: "relation",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: this.stance[0],
              name: "Contradict",
              itemStyle: { color: "#C24641" },
            },
            {
              value: this.stance[1],
              name: "Neutral",
              itemStyle: { color: "#E8A317" },
            },
            {
              value: this.stance[2],
              name: "Support",
              itemStyle: { color: "#4E9258" },
            },
          ],
        },
      ],
    });
    console.log("finish");
  },
  created() {
    console.log("start");
    this.inputClaim = this.$store.state.claim.inputClaim;
    this.inputData = this.$store.state.claim.data.artData;
    this.getData(this.id);
  },
  methods: {
    getData(articleid) {
      let data = this.inputData;
      console.log("single article inputdata", this.inputData);
      var keys = Object.keys(data);
      this.singleArticle = data[keys[articleid]];

      this.sentlist = this.singleArticle.content;
      this.sentscore = this.singleArticle.sentScore;
      this.stance = this.singleArticle.stance;
    },
    getColor(sentscore) {
      console.log(this.singleArticle.content);
      console.log("sentscore", sentscore);
      var score = sentscore[0] * 0.5;
      var stance = sentscore[1];
      console.log("check color", sentscore, score, stance);
      if (stance == "Contradict") {
        return "rgb(255,99,71,".concat(score.toString()).concat(")");
      } else if (stance == "Neutral") {
        return "rgb(255, 195, 11,".concat(score.toString()).concat(")");
      } else if (stance == "Support") {
        return "rgb(50,205,50,".concat(score.toString()).concat(")");
      } else {
        console.log("not working", stance);
      }
    },
  },
};
</script>

<style>
#chart1 {
  width: 300px;
  height: 300px;
}
</style>
