/* View */
import App from '@VIEWS/app.vue';
import MainLayout from '@VIEWS/common/mainLayout.vue';
import ContentContainer from '@VIEWS/common/contentContainer.vue';

import Login from '@VIEWS/account/login.vue';
import Err404 from '@VIEWS/common/404.vue';
import Err403 from '@VIEWS/common/403.vue';
import Err500 from '@VIEWS/common/500.vue';

/* Lazy-Load View */
// Index
const Index = ()=>import(/* webpackChunkName: "index" */ '@VIEWS/index/index.vue').then(m=>m.default);
// Content
const Article = ()=>import(/* webpackChunkName: "content" */ '@VIEWS/content/article.vue').then(m=>m.default);
// Analyze
const UserStay = ()=>import(/* webpackChunkName: "analyze" */ '@VIEWS/analyze/userStay.vue').then(m=>m.default);
const UserLost = ()=>import(/* webpackChunkName: "analyze" */ '@VIEWS/analyze/userLost.vue').then(m=>m.default);
const Terminal = ()=>import(/* webpackChunkName: "analyze" */ '@VIEWS/analyze/terminal.vue').then(m=>m.default);

/**
 * 1. 普通页面
 * 在整个浏览器区域展现
 */
export const loginRoute = {
  name: '/login',
  path: '/login',
  component: Login,
  meta: { title: '登录页', },
};

export const logoutRoute = {
  name: '/logout',
  path: '/logout',
  meta: { title: '退出账号', },
};

export const err404Route = {
  name: 'error-404',
  path: '/*',
  component: Err404,
  meta: { title: '404-页面不存在', },
}

export const err403Route = {
  name: 'error-403',
  path: '/403',
  component: Err403,
  meta: { title: '403-权限不足', },
}

export const err500Route = {
  name: 'error-500',
  path: '/500',
  component: Err500,
  meta: { title: '500-服务器错误', },
}

/**
 * 2. 应用页面
 * 在 Main 组件的子页面区域展示，在左侧菜单栏显示；有两种对应情况；
 */
export const appRoutes = [
  {
    name: '/',
    path: '/',
    component: MainLayout,
    redirect: '/index',
    meta: { title: '首页', requiresAuth: true, }, //最上级这里放一个权限标志，则以下的路由全都需要！
    children: [
      // 首页
      {
        name: '/index',
        path: 'index',
        component: Index,
        meta: { title: '首页', type: 'page', icon: 'home', },
      },
      // 内容管理模块
      {
        name: '/content',
        path: 'content',
        component: ContentContainer,
        meta: { title: '内容管理', type: 'menu', },
        children: [
          {
            name: '/content/article',
            path: 'article',
            component: Article,
            meta: { title: '文章管理', type: 'page', icon: 'ios-paper',
              check () {
                // 在这里可以做权限校验
                return true;
              },
           },
          },
        ],
      },
      // 统计分析模块
      {
        name: '/analyze',
        path: 'analyze',
        component: ContentContainer,
        meta: { title: '统计分析', type: 'menu', },
        children: [
          {
            name: '/analyze/user',
            path: 'user',
            component: ContentContainer,
            meta: { title: '用户分析', type: 'menu', icon: 'ios-paper' },
            children: [
              {
                name: '/analyze/user/stay',
                path: 'stay',
                component: UserStay,
                meta: { title: '用户留存', type: 'page', },
              },
              {
                name: '/analyze/user/lost',
                path: 'lost',
                component: UserLost,
                meta: { title: '流失用户', type: 'page', },
              },
            ]
          },
          {
            name: '/analyze/terminal',
            path: 'terminal',
            component: Terminal,
            meta: { title: '终端分析', type: 'page', icon: 'ios-paper' },
          },
        ],
      }
    ]
  },
]

/**
 * 3. 其他页面
 * 在 Main 组件的子页面区域展示，但不在左侧菜单栏显示
 */
export const otherRoutes = [];


// 这里统一导出所有 routes
export const routes = [
  loginRoute,
  logoutRoute,
  ...otherRoutes,
  ...appRoutes,
  err403Route,
  err500Route,
  err404Route,
];
