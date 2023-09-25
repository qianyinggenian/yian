import Mock from 'mockjs-async';
import { menuData } from '@/common/data';
import { getDataByKey, addData, instanceDB, cursorGetData, updateDB } from '@/indexedDB';

// const Random = Mock.Random;
// 第一个参数：模拟的url，第二个参数：请求方式， 第三个参数：数据模版，也就是响应回来的值
/**
 * @Description 新增保存
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/menu/save', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  console.log('bodyParams', bodyParams);
  return addData(instanceDB, 'menuList', bodyParams).then((result) => {
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
Mock.mock('/mock/menu/update', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  console.log('bodyParams', bodyParams);
  return updateDB(instanceDB, 'menuList', bodyParams).then((result) => {
    const params = {
      code: result,
      msg: result === 200 ? '操作成功' : '网络错误'
    };
    return Promise.resolve(params);
  });
});
/**
 * @Description 导航详情
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/menu/detail', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  // let res;
  return getDataByKey(instanceDB, 'menuList', bodyParams.id).then((result) => {
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
 * @Description 导航详情
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/menu/tree', 'post', () => {
  // let res;
  return cursorGetData(instanceDB, 'menuList').then((result) => {
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
/**
 * @Description 导航编码或名称唯一性
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/menu/uniqueness', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  const { key, value, id, type } = bodyParams;
  let index;
  if (type !== 'edit') {
    index = menuData.findIndex(item => item[key] === value);
  } else {
    const result = menuData.find(item => item.id === id);
    if (result && result[key] === value) {
      index = -1;
    } else {
      index = menuData.findIndex(item => item[key] === value);
    }
  }
  return {
    code: 200,
    data: {
      exist: index === -1
    },
    msg: 'ok'
  };
});
