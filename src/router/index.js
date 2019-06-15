import Vue from 'vue';
import Router from 'vue-router';
import Temp from '@/components/Temp';
import Sign from '@/components/pages/Sign';
import BackEnd from '@/components/BackEnd';

Vue.use(Router);

export default new Router({
  routes: [
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
      name: 'BackEnd',
      component: BackEnd,
    },
  ],
});
