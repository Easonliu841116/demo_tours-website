// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'jquery';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

router.beforeEach((to, from, next) => {
  const url = `${process.env.APIPATH}/api/user/check`;
  if (to.meta.requiresAuth) {
    axios.post(url).then((response) => {
      // eslint-disable-next-line
      response.data.success ? next() : next({ path: '/login' });
    });
  } else {
    next();
  }
});
