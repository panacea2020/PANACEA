<template>
  <div id="app">
    <router-view/>
    <div
      style="width: 70%; margin-left: 15%; margin-top: 0px; margin-bottom: 200px;"
    ></div>
  </div>
</template>

<script>

export default {
  name: "demo",
  components: {
  },
  data() {
    return {
      claimTocheck: undefined,
    };
  },
};
</script>

<style>

</style>
