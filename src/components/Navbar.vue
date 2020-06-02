<template>
  <div class="navbar-container">
    <hr>
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
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar-container {
    position: relative;
    display: flex;
    width: 25%;
    height: 100vh;
    justify-content: flex-end;
    align-items: center;
  }

  hr {
    transform: rotate(20deg);
    border-right: 1px solid #ffffff;
    position: absolute;
    top: -25%;
    right: 0;
    height: 150%;
    margin: 0;
    padding: 0;
    z-index: -1;
  }

  nav {
    padding-right: 2.5rem;
  }

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
