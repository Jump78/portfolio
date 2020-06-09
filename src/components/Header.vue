<template>
  <header>
      <h1>Clément Teboul</h1>
      <p><span class='job'>Web Developer</span></p>
      <p>En recherche d'un contrat à durée indéterminée</p>
  </header>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header {
    line-height: 3.2rem;
    padding: 3.2rem 0 0 3.2rem;
    height: 139px;
    width: 100%;
  }

  header .job {
    font-weight: 300;
    font-size: 3rem;
    color: rgba(255,255,255,0.6);
  }

  h1 {
    font-size: 3.2rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #F54F29;
  }
</style>
