<template>
  <div id="app">
    <Navbar />
    <Three />
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue';
  import Three from './components/Three.vue';

  export default {
    name: 'App',
    components: {
      Navbar,
      Three
    }
  }
</script>

<style>
  body {
    background-color: #000;
    overflow: hidden;
  }

  #app {
    position: relative;
  }
</style>
