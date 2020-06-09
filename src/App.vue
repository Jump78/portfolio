<template>
  <div id='app'>
    <div class='layout'>
      <div class='aside'>
        <LeftAside />
      </div>
      <main>
        <transition
          :name='transitionName'
          mode='out-in'
        >
          <router-view/>
        </transition>
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
    },
    data() {
      return {
        transitionName: ''
      }
    },
    created() {
      this.$router.beforeEach((to, from, next) => {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';

        next();
      });
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
    margin-left: 16rem;
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: 0.25s;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(2rem, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-2rem, 0);
  }
</style>