import axios from 'axios';
import Mock from 'mockjs-async';
import { getRefreshToken, getToKen, setRefreshToken, setToken, yiAnToken } from '@/common/Cookie';
import constants from '@/common/constants';

const Random = Mock.Random;
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
    if (getRefreshToken() === undefined) {
      const token = Random.string('lower', 20);
      setToken(yiAnToken, token);
      setRefreshToken(token);
    }
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
