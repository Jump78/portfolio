<template>
    <nav>
      <ul>
        <li>
          <p>Accueil</p>
        </li>
        <li>
          <p>Details</p>
        </li>
        <li>
          <p>Projets</p>
        </li>
        <li>
          <p>Contact</p>
        </li>
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
