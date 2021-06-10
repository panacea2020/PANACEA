<template>
  <div
    v-if="true"
    class="row"
    style="background-color: white; border-color: rgba(128, 128, 128, 0.411); border-style: solid;"
  >
    <div class="col-9"  style="text-align:left;">
      <router-link v-bind:to="'/article/' + info.id">
        <b class="resulttitle">{{ info.resultToshow }}</b>
      </router-link>

      <p class="resulttext" style="margin-top: 10px; text-align:left;">
        ...{{ info.abstract }}...
      </p>
    </div>
    <div class="col-3">
      <div class="resultsource">
        <button class="button_show">
          <!-- {{ info.type }} -->
          Type: {{ info.type }}
        </button>
      </div>
      <div class="resultsource">
        <button class="button_show">
          Source: {{ info.source }}
        </button>
      </div>
      
      <div class="resultsource">
        <span
          style="border-radius: 5px; border-color: grey; float: right;"
          >Relevant Score: undefined</span
        >
      </div>
      <div class="resultsource" style="margin-top:0px; margin-bottom: 5px">
        <span
          style="border-radius: 5px; border-color: grey; "
          >Stance: </span>
        <span
            :style="{ 'color': getColor(info.singleStance)}"
            >{{info.singleStance[1]}}
          </span>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: ["info"],
  methods: {
    getColor(sentscore) {
      var score = sentscore[0] + 0.1;
      var stance = sentscore[1];
      //console.log("check color", sentscore, score, stance);
      if (stance == "Contradict") {
        return "rgb(170, 57, 29,".concat(score.toString()).concat(")");
      } else if (stance == "Neutral") {
        return "rgb(255, 195, 11,".concat(score.toString()).concat(")");
      } else if (stance == "Support") {
        return "rgb(76, 187, 23,".concat(score.toString()).concat(")");
      } else {
        console.log("not working", stance);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resultsource {
  clear: both; 
  font-size: 15px;
  float: right;
  text-align: right;
  color: rgb(107, 107, 107);
  margin-top: 10px;
  display: flex;
}

.resulttext {
  font-size: 15px;
  color: rgb(107, 107, 107);
}

.resulttitle {
  font-size: 20px;
  background-color: white;
  color: rgb(107, 107, 107);
  border: none;
  margin-top: 5px;
  text-align: left;
}

.wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button_show {
  min-width: 200px;
  height: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  }

.button_show:hover {
  background-color: #7ba091;
  box-shadow: 0px 15px 20px rgba(159, 167, 163, 0.4);
  color: #fff;
  transform: translateY(-3px);
}


</style>
