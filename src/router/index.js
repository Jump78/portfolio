import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    // route level code-splitting
    // this generates a separate chunk (name.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import('../views/Project.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import( '../views/Contact.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
