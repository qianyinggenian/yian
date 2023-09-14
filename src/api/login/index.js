import request from '@/utils/axios';

export function loginPost (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  });
}
