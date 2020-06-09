<template>
  <aside>
    <hr>
    <div class="header">
      <Header />
    </div>
    <div class='navbar'>
        <Navbar />
    </div>
  </aside>
</template>

<script>
  import Header from './Header.vue';
  import Navbar from './Navbar.vue';

  export default {
    name: 'LeftAside',
    components: {
      Navbar,
      Header
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  aside {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  hr {
    transform: rotate(20deg);
    border: none;
    position: absolute;
    top: -25%;
    right: 0;
    height: 150%;
    margin: 0;
    padding: 0;
    z-index: -1;
    background: white;
    width: 1px;
  }

  .navbar {
    align-self: flex-end;
    padding-right: 4rem;
    margin-top: 6.4rem;
  }
</style>
