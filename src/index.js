/* eslint-disable no-debugger */
import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import App from './App.vue';
import routerConfig from './router';
import storeConfig from './store';
import AppRely from './common/rely';

AppRely.set('Vuex', Vuex);

Vue.use(Vuex);
Vue.use(Router);
Vue.config.productionTip = false;

export default function (loadModules) {
  loadModules().then((modules) => {
    modules.forEach((module) => {
      if (module.router) { routerConfig.routes.push(module.router); }
      if (module.store) { storeConfig.modules[module.name] = module.store; }
    });
    const router = new Router(routerConfig);
    const store = new Vuex.Store(storeConfig);

    AppRely.set('store', store);

    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  });
}
