<template>
    <nav>
      <ul>
        <router-link to='/' tag='li'><p>Accueil</p></router-link>
        <router-link to='detail' tag='li'><p>Details</p></router-link>
        <router-link to='project' tag='li'><p>Projets</p></router-link>
        <router-link to='contact' tag='li'><p>Contact</p></router-link>
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
    padding: 0.5rem 0.75rem;
    margin-top: 0.5rem;
    transition: all 0.3s ease-in;
  }

  li:hover {
    width: 200%;
    color: #000000;
    background-color: #fff;
  }
</style>
