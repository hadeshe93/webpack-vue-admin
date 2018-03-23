/* 引入样式文件 */
import '@STYLES/config_iview_theme.less';
import '@STYLES/base.less';
import '@STYLES/common.less';

/* 引入脚本文件 */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import IrmUtil from 'irm-util';
import iView from 'iView';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

if(PRODUCTION){
  // 生产环境代码
  Raven
    .config('https://7e0fedea4a294976ab51f0981fe130a6@sentry.io/482278')
    .addPlugin(RavenVue, Vue)
    .install();
}

/* 载入 Vue 插件 */
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(iView);

/* 载入插件之后再载入配置 */
import router from '@SRC/configs/router/index.js';
import axios from '@SRC/configs/axios/index.js';
import auth from '@ASSETS/scripts/auth.js';
import storeConfig from '@SRC/configs/store/index.js';
import AssetsUtil from '@ASSETS/utils/index.js';

import App from '@VIEWS/app.vue';

const util = {
  ...IrmUtil,
  ...AssetsUtil,
};

console.log(util);

/* 全局引入插件 */
Vue.prototype.$axios = axios;
Vue.prototype.$util = util;
Vue.prototype.$auth = auth;

/* 实例化 Vuex.Store */
const store = new Vuex.Store(storeConfig);

const vm = new Vue({
  el: '#root',
  router,
  store,
  render: h=>h(App)
});
