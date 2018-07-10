/**
 * 引入样式文件
 * - 统一集中在一个入口，避免样式文件顺序混乱导致覆盖
 */
import '@STYLES/common.less';

/* 引入库和插件 */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import IrmUtil from 'irm-util';
import Moment from 'moment';
import iView from 'iView';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

/* 载入配置 */
import router from '@SRC/configs/router/index.js';
import axios, { axiosConfig } from '@SRC/configs/axios/index.js';
import mixin from '@SRC/configs/mixin/index.js';
import iviewConfig from '@SRC/configs/iview/index.js';
import commConfig from '@SRC/configs/comm/index.js';
import enums from '@SRC/configs/filter/enums.js';
import filters from '@SRC/configs/filter/index.js';
import STORE_CONFIGURATION, { storeConfig } from '@SRC/configs/store/index.js';
import auth from '@ASSETS/scripts/auth.js';
import AssetsUtil from '@ASSETS/utils/index.js';

/* 引入 */
import App from '@VIEWS/app.vue';

// 生产环境代码
if ( PRODUCTION ) {
  // 远程错误监控
  // Raven
  //   .config('填入自己在 sentry.io 注册项目后返回的 url')
  //   .addPlugin(RavenVue, Vue)
  //   .install();
}

/* 载入 Vue 插件 */
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(iView);

/* 全局引入插件 */
Vue.prototype.$axios = axios;
Vue.prototype.$util = { ...IrmUtil, ...AssetsUtil, };
Vue.prototype.$auth = auth;
Vue.prototype.$enums = enums;
Vue.prototype.$filters = filters;
Vue.prototype.$moment = Moment;
Vue.prototype.$comm = new IrmUtil.UtilComm();

/* 进行全局混入 */
Vue.mixin(mixin);

/* 定义全局过滤器 */
Vue.filter('accountLevelFilter', filters.accountLevelFilter);
Vue.filter('dateFilter', function(timestamp){
  let t = Number(timestamp);
  if (isNaN(t)) {
    return '(暂无信息)';
  }
  return Moment.unix(Number(timestamp)).format('YYYY-MM-DD');
});

/* 对个别插件进行定制 */
const UtilQS_stringify = Vue.prototype.$util.UtilQS.stringify;
Vue.prototype.$util.UtilQS.stringify = function(data, delInvalid=true){
  if (delInvalid && !!data) {
    const keys = Object.keys(data);
    for (let key of keys) {
      if (data[key]==undefined || data[key]==='') {
        delete data[key];
      }
    }
  }
  return UtilQS_stringify.call(Vue.prototype.$util.UtilQS, data);
};

/* 实例化 Vuex.Store */
const store = new Vuex.Store(STORE_CONFIGURATION);

/* 实例化 Vue */
const vm = new Vue({
  el: '#root',
  router,
  store,
  render: h=>h(App),
  created () {
    axiosConfig.setReqInterceptor(this);
    axiosConfig.setRspInterceptor(this);

    // 初始化全局通信机制
    commConfig.init(this);

    // 恢复 store
    storeConfig.resetStore(this);
  },
  mounted () {
    // 初始化 iview 组件的配置
    iviewConfig.initComponents(this);

    this.$axios.get('/mock/test/data')
      .then(rsp=>{
        console.log(rsp);
      });
  },
});

// 暴露为全局变量
window.vm = vm;
