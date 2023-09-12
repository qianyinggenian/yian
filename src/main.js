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

dayjs.locale('zh-cn');
Vue.config.productionTip = false;
Vue.prototype.$_store = store;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
