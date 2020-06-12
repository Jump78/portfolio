import Vue from 'vue'
import App from './App.vue'
import './reset.css';
import './main.css';
import router from './router'
import VueCarousel from 'vue-carousel';

Vue.config.productionTip = false

new Vue({
  router,
  VueCarousel,
  render: h => h(App)
}).$mount('#app')
