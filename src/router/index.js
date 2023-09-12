import Vue from "vue";
import VueRouter from 'vue-router';
import login from '../views/login';
import layout from '../views/layout';
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "login",
    component: login
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/layout",
    name: "layout",
    component: layout
  }
];
const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
});
console.log('router', router);
// router.beforeEach(async (to, from, next) => {
//   console.log('to', to);
//   console.log('from', from);
//   // if () {
//   //   // 将用户重定向到登录页面
//   //   return { name: 'Login' }
//   // }
//   // next('/login');
//   next()
// })
export default router;
