<template>
  <div id="app">
    <div class='layout'>
      <div class="aside">
        <LeftAside />
      </div>
      <main>
        <router-view/>
      </main>
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
  }

  .aside {
    width: 33vw;
  }

  main {
    width: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10rem;
  }
</style>