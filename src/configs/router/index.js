import VueRouter from 'vue-router';

import { appRoutes } from './routes.js';


//创建路由实例，传入配置参数
const router = new VueRouter({
  routes: appRoutes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
  }
  next();
});

router.afterEach((to, from, next) => {
});

export default router;
