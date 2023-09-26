import axios from 'axios';
import { getToKen } from '@/common/Cookie';
import constants from '@/common/constants';

const mockAjax = axios.create({
  baseURL: '/mock',
  timeout: 10000
});

// 请求拦截
mockAjax.interceptors.request.use((config) => {
  if (constants.whiteRequestList.includes(config.url.split('?')[0])) {
    return config;
  }
  if (getToKen() !== undefined) {
    config.headers.yiAnToKen = `yiAnToken ${getToKen()}`;
  } else {
    window.open('/', '_self');
  }
  return config;
});
// 响应拦截
mockAjax.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export default mockAjax;
