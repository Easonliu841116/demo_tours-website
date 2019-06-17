import Vue from 'vue';
import Router from 'vue-router';
import Temp from '@/components/Temp';
import Register from '@/components/pages/Register';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/BackEnd/Products';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/register',
    },
    {
      path: '/',
      name: 'Temp',
      component: Temp,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
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
