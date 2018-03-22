/* 引入样式文件 */
import '@STYLES/config_iview_theme.less';
import '@STYLES/base.less';
import '@STYLES/common.less';
// import 'iview/dist/styles/iview.css';

/* 引入脚本文件 */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import IrmUtil from 'irm-util';
import iView from 'iView';

/* 载入 Vue 插件 */
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(iView);

/* 载入插件之后再载入配置 */
import router from '@SRC/configs/router/index.js';
import axios from '@SRC/configs/axios/index.js';
import storeConfig from '@SRC/configs/store/index.js';
import AssetsUtil from '@ASSETS/utils/index.js';

import App from '@VIEWS/app.vue';

const util = {
  ...IrmUtil,
  ...AssetsUtil,
};


/* 全局引入插件 */
Vue.prototype.$axios = axios;
Vue.prototype.$util = util;

/* 实例化 Vuex.Store */
const store = new Vuex.Store(storeConfig);

if(!PRODUCTION){
  // 非生产环境代码
}

const vm = new Vue({
  el: '#root',
  router,
  store,
  render: h=>h(App)
});
