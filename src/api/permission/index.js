import request from '@/utils/axios';

export default {

  /**
   * @Description 详情
   * @author qianyinggenian
   * @date 2023/9/22
   */
  permissionDetail: (data) => request({
    url: '/permission/detail',
    method: 'post',
    data
  }),
  /**
   * @Description 列表
   * @author qianyinggenian
   * @date 2023/9/22
   */
  permissionList: (data) => request({
    url: '/permission/list',
    method: 'post',
    data
  }),
  /**
   * @Description 保存
   * @author qianyinggenian
   * @date 2023/9/22
   */
  permissionSave: (data) => {
    return request({
      url: '/permission/save',
      method: 'post',
      data
    });
  },
  /**
   * @Description 保存
   * @author qianyinggenian
   * @date 2023/9/22
   */
  permissionInfo: (data) => {
    return request({
      url: '/permission',
      method: 'post',
      data
    });
  }
};
