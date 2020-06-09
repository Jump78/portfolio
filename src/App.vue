<template>
  <div id="app">
    <div class='layout'>
      <LeftAside />
      <router-view/>
    </div>
    <ParticleBackground />
  </div>
</template>

<script>
  import LeftAside from './components/LeftAside.vue';
  import ParticleBackground from './components/ParticleBackground.vue';

  export default {
    name: 'App',
    components: {
      LeftAside,
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

  .layout {
    display: flex;
    justify-content: space-between;
  }
</style>