import Mock from 'mockjs-async';
import {
  getDataByKey,
  instanceDB,
  updateDB
} from '@/indexedDB';

/**
 * @Description 保存
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/permission/save', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  console.log('bodyParams', bodyParams);
  return updateDB(instanceDB, 'permissionList', bodyParams).then((result) => {
    const params = {
      code: result,
      msg: result === 200 ? '操作成功' : '网络错误'
    };
    return Promise.resolve(params);
  });
});
/**
 * @Description 详情
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/permission/detail', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  // let res;
  return getDataByKey(instanceDB, 'permissionList', bodyParams.id).then((result) => {
    const params = {
      code: 200,
      data: {
        ...result
      },
      msg: 'ok'
    };
    return Promise.resolve(params);
  });
});
