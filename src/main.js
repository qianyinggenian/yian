import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import './css/index.scss';
import './components/index.js';
import '@/common/icons/index';
import 'element-ui/lib/theme-chalk/index.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import mock from 'mockjs';
dayjs.locale('zh-cn');
import axios from 'axios';
import '@/mock/mockServe.js';
// 配置vue原型，(在任何组件中都可以正常使用 axios ）
Vue.prototype.http = axios;
Vue.config.productionTip = false;
Vue.prototype.$_store = store;
Vue.prototype.$Mock = mock;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
