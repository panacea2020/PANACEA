<template>
  <div id="add-claim">
    <input type="text" v-model="claim" required/>
    <button v-on:click.prevent="post">check</button>
    <div v-if="submitted">Claim: {{claim}}</div>
  </div>
</template>

<script>


export default {
  name: 'add-claim',
  data(){
    return{
      claim:""
    }
  },
  methods: {
    post:function(){
      this.$http.post("",{
        claim:this.claim,
        submitted:false,
      })
        .then(function(data){
          console.log(data);
          this.submitted=true;
        });
    }
  }

};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>