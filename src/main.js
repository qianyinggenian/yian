import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import './components/index.js';
import '@/common/icons/index';
import 'element-ui/lib/theme-chalk/index.css';
import '@/css/element-variables.scss';
import './css/index.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import mock from 'mockjs';
import axios from 'axios';
import '@/indexedDB';
import '@/mock/index.js';
import '@/common/ztree/index';

dayjs.locale('zh-cn');
// 配置vue原型，(在任何组件中都可以正常使用 axios ）
Vue.prototype.http = axios;
Vue.config.productionTip = false;
Vue.prototype.$_store = store;
Vue.prototype.$Mock = mock;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
