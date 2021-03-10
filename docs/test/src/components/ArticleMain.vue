<template>
  <div class="row"
        style="background-color: white; border-color: rgba(128, 128, 128, 0.411); border-style: solid;">
        <div class="col-9">
          <button class="resulttitle" data-toggle="modal" data-target="#articlemodal"><b>{{info.title}}</b></button>
          <p class="resulttext" style="margin-top: 10px;">{{info.content}}
          </p>
        </div>
        <div class="col-3">
          <p class="resultsource">{{info.type}} Article</p>
          <p class="resultsource">Source: {{info.source}}</p>
        </div>
    </div>

</template>

<script>
export default {
  props: ['info']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .resultsource {
      font-size: 12px;
      text-align: right;
      color: rgb(107, 107, 107);
      margin-top: 10px;
    }

    .resulttext {
      font-size: 12px;
      color: rgb(107, 107, 107);
    }

    .resulttitle {
      font-size: 20px;
      background-color: white;
      color: rgb(107, 107, 107);
      border: none;
      margin-top: 5px;
    }
</style>
