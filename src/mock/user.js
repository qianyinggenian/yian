import Mock from 'mockjs-async';
import {
  getDataByKey,
  addData,
  instanceDB,
  cursorGetData,
  updateDB,
  deleteDB,
  batchDeleteDB
} from '@/indexedDB';

// const Random = Mock.Random;
// 第一个参数：模拟的url，第二个参数：请求方式， 第三个参数：数据模版，也就是响应回来的值
/**
 * @Description 新增保存
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/user/save', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  console.log('bodyParams', bodyParams);
  return addData(instanceDB, 'userList', bodyParams).then((result) => {
    const params = {
      ...result
    };
    return Promise.resolve(params);
  });
});
/**
 * @Description 编辑保存
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/user/update', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  console.log('bodyParams', bodyParams);
  return updateDB(instanceDB, 'userList', bodyParams).then((result) => {
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
Mock.mock('/mock/user/detail', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  // let res;
  return getDataByKey(instanceDB, 'userList', bodyParams.id).then((result) => {
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
/**
 * @Description 删除
 * @author qianyinggenian
 * @date 2023/9/26
 */
Mock.mock('/mock/user/delete', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  return deleteDB(instanceDB, 'userList', bodyParams.id).then((result) => {
    return result;
  });
});
/**
 * @Description 批量删除
 * @author qianyinggenian
 * @date 2023/9/26
 */
Mock.mock('/mock/user/batch/delete', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  console.log('bodyParams', bodyParams);
  // let count = 0;
  const { ids } = bodyParams;
  return batchDeleteDB(instanceDB, 'userList', ids).then((result) => {
    return result;
  });
  // console.log('ds', batchDeleteDB(instanceDB, 'userList', ids));
  // return batchDeleteDB(instanceDB, 'userList', ids);
  // for (const id of ids) {
  //   // return batchDeleteDB(instanceDB, 'userList', bodyParams.ids).then((result) => {
  //   //   return result;
  //   // });
  //   const res = batchDeleteDB(instanceDB, 'userList', id).then((result) => {
  //     return result;
  //   });
  //   res.then(value => {
  //     console.log('valuevalue', value);
  //     if (value.code === 200) {
  //       ++count;
  //     }
  //   });
  //   console.log('resres', res);
  // }
  // console.log('count', count);
  // if (count === ids.length) {
  //   return Promise.resolve({
  //     code: 200,
  //     msg: '删除成功'
  //   });
  // } else {
  //   return Promise.resolve({
  //     code: 500,
  //     msg: '删除失败'
  //   });
  // }
});
Mock.mock('/mock/user/list', 'post', () => {
  // let res;
  return cursorGetData(instanceDB, 'userList').then((result) => {
    const { code, list, msg } = result;
    let params = {};
    if (code === 200) {
      params = {
        code,
        data: {
          list
        },
        msg: '0k'
      };
    } else {
      params = {
        code,
        data: {},
        msg
      };
    }
    return Promise.resolve(params);
  });
});
