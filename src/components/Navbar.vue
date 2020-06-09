<template>
    <nav>
      <ul>
        <router-link to='/' tag='li' active-class='active' exact><p>Accueil</p></router-link>
        <router-link to='detail' tag='li' active-class='active' exact><p>Details</p></router-link>
        <router-link to='project' tag='li' active-class='active' exact><p>Projets</p></router-link>
        <router-link to='contact' tag='li' active-class='active' exact><p>Contact</p></router-link>
      </ul>
    </nav>
</template>

<script>
  export default {
    name: 'Navbar',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li {
    display: block;
    width: auto;
    color: #ffffff;
    border: 1px solid #fff;
    padding: 0.8rem 1.2rem;
    margin-top: 0.8rem;
    transition: all 0.3s ease-in;
  }

  li:hover, .active {
    width: 200%;
    color: #000000;
    background-color: #fff;
  }
</style>
