import Vue from 'vue';
import Router from 'vue-router';
import Temp from '@/components/Temp';
import Sign from '@/components/pages/Sign';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/BackEnd/Products';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/sign',
    },
    {
      path: '/',
      name: 'Temp',
      component: Temp,
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
