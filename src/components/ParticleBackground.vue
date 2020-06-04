<template>
    <div id='three-container'></div>
</template>

<script>
    import ParticleBackground from '../services/ParticleBackground/ParticleBackground.js';

    export default {
        name: 'ParticleBackground',
        mounted: () => {
            const domElement = document.getElementById('three-container');

            const ParticleBackgroundInstance = new ParticleBackground(
                window.innerWidth,
                window.innerHeight,
                1,
                1000,
                domElement,
                350
            );

            ParticleBackgroundInstance.start();
        }
    }
</script>

<style scoped>
    #three-container {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        z-index: -2;
    }
</style>