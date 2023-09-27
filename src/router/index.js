import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '../views/login';
import layout from '../views/layout';
import errorView from '../views/404';
import { config } from '@/router/config';
import home from '@/views/home/index.vue';
import { getToKen, getRefreshToken } from '@/common/Cookie';
import constants from '@/common/constants';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '*',
    name: '404',
    component: errorView,
    meta: {
      title: '未找到'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/layout',
    name: 'layout',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
          title: '首页'
        }
      },
      ...config
    ]
  }
];
const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  // console.log('to', to);
  // console.log('from', from);
  if (constants.whiteRequestList.includes(to.path)) {
    next();
    return;
  }
  if (getToKen() !== undefined || getRefreshToken() !== undefined) {
    next();
  } else {
    sessionStorage.clear();
    next('/login');
  }
  // next();
});
export default router;
