import VueRouter from 'vue-router';

import { routes } from './routes.js';
import auth from '@ASSETS/scripts/auth.js';


//创建路由实例，传入配置参数
const router = new VueRouter({
  routes: routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.name === '/logout') {
    // 如果是登出页
    auth.logout();
    next('/login');
  }
  else if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果是需要权限的页面
    if (!auth.isLogin()) {
      next('/login');
      console.log('请你先登录');
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
});

export default router;
