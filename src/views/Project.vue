<template>
  <Carousel
  :per-page="1"
  :navigationEnabled="true"
  :paginationActiveColor="'#F54F29'"
  :navigationPrevLabel="'<p class=navigationCursor>&#60;</p>'"
  :navigationNextLabel="'<p class=navigationCursor>&#62;</p>'"
  paginationPosition='bottom'
  >
    <Slide>
      <div class="image" :style="{backgroundImage: momoImg}"></div>
      <div class="infoProjet">
        <p class="titre">Momo le noyau</p>
        <p class="resume">Developpé pendant la Double Game Week de l'Ecole Multimedia en groupe de 4</p>
        <div class="slide-footer">
          <p class="tags-container"><span class="tags couleur-js">JavaScript </span><span class="tags couleur-default">Phaser </span><span class="tags couleur-html">HTML5 </span><span class="tags couleur-css">CSS3 </span></p>
          <a :href="momoProject" class="button">voir</a>
        </div>
      </div>
    </Slide>
    <Slide>
      <div class="image" :style="{backgroundImage: alzerImg}"></div>
      <div class="infoProjet">
        <p class="titre">Alzer Chronicle</p>
        <p class="resume">Prototype d'un system de combat en tour par tour developpé en tant que projet de fin d'année de classe préparatoire</p>
        <div class="slide-footer">
          <p class="tags-container"><span class="tags couleur-js">JavaScript </span><span class="tags couleur-default">Phaser </span></p>
          <a :href="alzerProject" class="button">voir</a>
        </div>
      </div>
    </Slide>
    <Slide>
      <div class="image" :style="{backgroundImage: hcrImg}"></div>
      <div class="infoProjet">
        <p class="titre">Hyper Cosmic Racer</p>
        <p class="resume">Il s'agit d'un projet commun a toute la classe de 1er année, soit 12 personnnes, ou le but était de developper un browser game en 2 semaines. J'ai principalement travailler sur le developpement des modules, du vaisseau spacial et sur la creation et la mise en place de la base de donnée</p>
        <div class="slide-footer">
          <p class="tags-container"><span class="tags couleur-js">JavaScript </span><span class="tags couleur-default">PHP </span><span class="tags couleur-html">HTML5 </span><span class="tags couleur-default">MySQL </span></p>
          <a :href="hcrProject" class="button">voir</a>
        </div>
      </div>
    </Slide>
    <Slide>
      <div class="image" :style="{backgroundImage: leapzikImg}"></div>
      <div class="infoProjet">
        <p class="titre">LeapZik</p>
        <p class="resume">1 semaine de developpement, un binome, un LeapMotion et une idée. Quoi de mieux pour créer LeapZik ?<br>Merci à <span class="colleague-name">Victor MOUTTON</span> d'avoir mené ce projet avec moi</p>
        <div class="slide-footer">
          <p class="tags-container"><span class="tags couleur-js">JavaScript </span><span class="tags couleur-default">LeapMotion </span><span class="tags couleur-html">HTML5 </span><span class="tags couleur-css">CSS3 </span></p>
          <a :href="leapZikProject" class="button">voir</a>
        </div>
      </div>
    </Slide>
    <Slide>
      <div class="image" :style="{backgroundImage: mrAntiniverseImg}"></div>
      <div class="infoProjet">
        <p class="titre">Mr AntiUniverse</p>
        <p class="resume">Developpé en 1 semaine avec <span class="colleague-name">Clément DUSSOL</span> pour apprendre a utiliser Three.js. Le but de la semaine était de developpé un shoot'em up</p>
        <div class="slide-footer">
          <p class="tags-container"><span class="tags couleur-js">JavaScript </span><span class="tags couleur-default">Three.js </span></p>
          <a :href="mrAntiniverseProject" class="button">voir</a>
        </div>
      </div>
    </Slide>
  </Carousel>
</template>

<script>
import momoImg from '../assets/momo_le_noyau.png';
import alzerImg from '../assets/alzer.png';
import hcrImg from '../assets/hcr.png';
import leapzikImg from '../assets/leapzik.png';
import mrAntiniverseImg from '../assets/mr-antiniverse.png';
import { Carousel, Slide } from 'vue-carousel';

export default {
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      momoImg: 'url(' + momoImg + ')',
      momoProject: process.env.BASE_URL + 'projets/momo_le_noyau/index.html',
      alzerImg: 'url(' + alzerImg + ')',
      alzerProject: process.env.BASE_URL + 'projets/alzer/index.html',
      hcrImg: 'url(' + hcrImg + ')',
      hcrProject: 'http://hcr.alwaysdata.net/index.php/login',
      leapzikImg: 'url(' + leapzikImg + ')',
      leapZikProject: process.env.BASE_URL + 'projets/leapzik.mp4', 
      mrAntiniverseImg: 'url(' + mrAntiniverseImg + ')',
      mrAntiniverseProject: process.env.BASE_URL + 'projets/Mr-AntiUniverse/index.html',
    }
  }
};
</script>

<style>
  .VueCarousel {
    width: 100%;
  }
  
  .VueCarousel-navigation-button:focus, .VueCarousel-dot:focus {
    outline: none !important;
  }

  .navigationCursor {
    color: #F54F29;
    font-size: 2rem;
    font-weight: 800;
  }

  .image {
    height: 350px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
  }

  @media (min-width: 1500px) {
    .image {
      height: 400px;
    }
  }

  .infoProjet {
    padding-top: 3.5rem;
  }
  
  .titre {
    text-transform: uppercase;
    font-weight: 700;
  }

  .resume {
    margin-top: 1.2rem;
    line-height: 1.8rem;
  }

  .tags {
      font-size: 1.3rem;
      margin-right: 1rem;
      padding: 0.5rem;
      color: white;
  }

  .couleur-js {
      background-color: #f0c025;
  }

  .couleur-default {
      background-color: #51254b;
  }

  .couleur-html {
      background-color: #f2672c;
  }

  .couleur-css {
      background-color: #31aada;
  }

  .button {
      font-size: 1.3rem;
      text-align: center;
      color: white;
      font-weight: 700;
      padding: 1rem 2rem;
      text-transform: capitalize;
      text-decoration: none;
      border: 1px solid white;
      cursor: pointer;
  }

  .button:hover {
    background-color: #fff;
    color: black;
  }

  .colleague-name {
    text-decoration: none;
    color: #f6f6f6;
    display: inline-block;
    max-width: 50%;
    transition: all 0.1s ease-out;
  }

  .slide-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.2rem;
  }
</style>