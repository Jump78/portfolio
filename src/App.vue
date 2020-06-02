<template>
  <div id="app">
    <Navbar/>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'

  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
</script>

<style>
  body {
    background-color: #000;
    overflow: hidden;
  }
</style>
