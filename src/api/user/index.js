import request from '@/utils/axios';

export default {
  /**
   * @Description 详情
   * @author qianyinggenian
   * @date 2023/9/22
   */
  userDetail: (data) => request({
    url: '/user/detail',
    method: 'post',
    data
  }),
  /**
   * @Description 列表
   * @author qianyinggenian
   * @date 2023/9/22
   */
  userList: (data) => request({
    url: '/user/list',
    method: 'post',
    data
  }),
  /**
   * @Description 新增保存
   * @author qianyinggenian
   * @date 2023/9/22
   */
  userSave: (data) => {
    return request({
      url: '/user/save',
      method: 'post',
      data
    });
  },
  /**
   * @Description 编辑保存
   * @author qianyinggenian
   * @date 2023/9/22
   */
  userUpdate: (data) => {
    return request({
      url: '/user/update',
      method: 'post',
      data
    });
  },
  /**
   * @Description 删除
   * @author qianyinggenian
   * @date 2023/9/22
   */
  userDelete: (data) => {
    return request({
      url: '/user/delete',
      method: 'post',
      data
    });
  },
  /**
   * @Description 删除
   * @author qianyinggenian
   * @date 2023/9/22
   */
  userBatchDelete: (data) => {
    return request({
      url: '/user/batch/delete',
      method: 'post',
      data
    });
  }
};
