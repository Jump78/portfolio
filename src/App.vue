<template>
  <div id="app">
    <Navbar />
    <ParticleBackground />
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue';
  import ParticleBackground from './components/ParticleBackground.vue';

  export default {
    name: 'App',
    components: {
      Navbar,
      ParticleBackground
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
