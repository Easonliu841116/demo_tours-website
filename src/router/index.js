import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/FrontEnd/Index';
import Register from '@/components/FrontEnd/Register';
import Dashboard from '@/components/BackEnd/Dashboard';
import Products from '@/components/BackEnd/Products';
import OrderList from '@/components/BackEnd/OrderList';
import Coupon from '@/components/BackEnd/Coupon';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/register',
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
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
        {
          path: 'orderlist',
          name: 'OrderList',
          component: OrderList,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
