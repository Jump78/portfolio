import Vue from 'vue'
import App from './App.vue'
import './reset.css';
import './main.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
