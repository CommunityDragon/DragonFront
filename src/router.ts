import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/docs',
      name: 'Docs',
      component: () => import(/* webpackChunkName: "docs" */ './views/Docs.vue'),
    },
  ],
});
