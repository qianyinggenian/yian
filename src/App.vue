<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  height: 100vh;
  width: 100%;
}
* {
  margin: 0;
}
</style>
