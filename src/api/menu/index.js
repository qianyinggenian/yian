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
   * @Description 新增保存
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
   * @Description 编辑保存
   * @author qianyinggenian
   * @date 2023/9/22
   */
  menuUpdate: (data) => {
    return request({
      url: '/menu/update',
      method: 'post',
      data
    });
  },
  /**
   * @Description 获取导航树信息
   * @author qianyinggenian
   * @date 2023/9/22
   */
  menuTree: (data) => {
    return request({
      url: '/menu/tree',
      method: 'post',
      data
    });
  },
  /**
   * @Description 删除
   * @author qianyinggenian
   * @date 2023/9/22
   */
  menuDelete: (data) => {
    return request({
      url: '/menu/delete',
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
