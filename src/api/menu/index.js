import request from '@/utils/axios';

export function menuSave (data) {
  return request({
    url: '/menu/save',
    method: 'post',
    data
  });
}
