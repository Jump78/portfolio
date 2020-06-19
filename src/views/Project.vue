<template>
  <Carousel
  :per-page="1"
  :navigationEnabled="true"
  :paginationActiveColor="'#F54F29'"
  :navigationPrevLabel="'<p class=navigationCursor>&#60;</p>'"
  :navigationNextLabel="'<p class=navigationCursor>&#62;</p>'"
  paginationPosition='bottom'
  >
    <Slide v-for="project in getProjects" :key="project.name">
      <div class="image" :style="{backgroundImage: project.picture}"></div>
      <div class="infoProjet">
        <p class="titre">{{ project.name}}</p>
        <p class="resume" v-html="project.resume" />
        <div class="slide-footer">
          <p class="tags-container">
            <span v-for="tag in project.tags" :key="tag" :class="'tags ' + getColorTagClass(tag)">{{ tag }}</span>
          </p>
          <a :href="project.link" class="button" target="_blank">voir</a>
        </div>
      </div>
    </Slide>
  </Carousel>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel';
  import projectsData from '../projects.json';

  const TAG_NAME_TO_COLOR = {
    'javascript': 'javascript',
    'html5': 'html',
    'css3': 'css'
  }

  const reverseProject = projectsData.reverse();

  export default {
    components: {
      Carousel,
      Slide
    },

    computed: {
      getProjects() {

        return reverseProject.map( project => {
          const link = (project.link.startsWith('http') ? project.link : process.env.BASE_URL + project.link);
          const picture = 'url(' + require('@/' + project.picture) + ')';
          return {
            ...project,
            picture,
            link
          }
        });
      }
    },

    methods: {
      getColorTag( tag ) {
        return TAG_NAME_TO_COLOR[tag.toLowerCase()] || 'default';
      },

      getColorTagClass( tag ) {
        return 'couleur-' + this.getColorTag(tag);
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

  .couleur-javascript {
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