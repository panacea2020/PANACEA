<template>
  <div>
    <div class="col-xs-3">
      <p class="resultsource">General Article</p>
      <p class="resultsource">Source: {{info.source}}</p>
      
      
    </div>
    <div class="right">
      {{info.content}}
    </div>
  </div>

              




</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['info']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resultsource {
      font-size: 15px;
      text-align: right;
      color: rgb(107, 107, 107);
      margin-top: 10px;
    }
</style>
