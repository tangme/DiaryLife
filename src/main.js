// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router/index.js';
import store from './store/index';
import _ from 'lodash';
import ws from '@/assets/js/ws';
Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false
Vue.prototype.$ws=ws;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h => h(App)
})
