import axios from 'axios';

const mockAjax = axios.create({
  baseURL: '/mock',
  timeout: 10000
});

// 请求拦截
mockAjax.interceptors.request.use((config) => {
  return config;
});
// 响应拦截
mockAjax.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export default mockAjax;
