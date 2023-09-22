import request from '@/utils/axios';

export default {
  /**
   * @Description 详情
   * @author qianyinggenian
   * @date 2023/9/22
   */
  menuDetail: (data) => request({
    url: '/menu/detail',
    method: 'post',
    data
  }),
  /**
   * @Description 保存
   * @author qianyinggenian
   * @date 2023/9/22
   */
  menuSave: (data) => {
    return request({
      url: '/menu/save',
      method: 'post',
      data
    });
  },
  /**
   * @Description 唯一性校验
   * @author qianyinggenian
   * @date 2023/9/22
   */
  menuUniqueness: (data) => {
    return request({
      url: '/menu/uniqueness',
      method: 'post',
      data
    });
  }
};