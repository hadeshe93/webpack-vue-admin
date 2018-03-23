/* View */
import App from '@VIEWS/app.vue';
import MainLayout from '@VIEWS/common/mainLayout.vue';
import ContentContainer from '@VIEWS/common/contentContainer.vue';

import Login from '@VIEWS/account/login.vue';

/* Lazy-Load View */
// Index
const Index = ()=>import(/* webpackChunkName: "index" */ '@VIEWS/index/index.vue').then(m=>m.default);
// Content
const Article = ()=>import(/* webpackChunkName: "content" */ '@VIEWS/content/article.vue').then(m=>m.default);
// Analyze
const UserStay = ()=>import(/* webpackChunkName: "analyze" */ '@VIEWS/analyze/userStay.vue').then(m=>m.default);
const UserLost = ()=>import(/* webpackChunkName: "analyze" */ '@VIEWS/analyze/userLost.vue').then(m=>m.default);
const Terminal = ()=>import(/* webpackChunkName: "analyze" */ '@VIEWS/analyze/terminal.vue').then(m=>m.default);

const loginRoute = {
  name: '/login',
  path: '/login',
  component: Login,
  meta: { title: '登录页', },
};

const logoutRoute = {
  name: '/logout',
  path: '/logout',
  meta: { title: '退出账号', },
};

export const baseRoutes = [
  loginRoute,
  logoutRoute,
];

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
            meta: { title: '文章管理', type: 'page', icon: 'ios-paper' },
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
