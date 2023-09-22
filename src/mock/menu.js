import Mock from 'mockjs';
import { menuData } from '@/common/data';

const Random = Mock.Random;
// 第一个参数：模拟的url，第二个参数：请求方式， 第三个参数：数据模版，也就是响应回来的值
/**
 * @Description 导航保存
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/menu/save', 'post', () => {
  return {
    code: 200,
    data: {
      name: Random.cname(),
      userId: Random.guid()
    },
    msg: '保存成功！'
  };
});

/**
 * @Description 导航详情
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/menu/detail', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  const result = menuData.find(value => value.id === bodyParams.id);
  return {
    code: 200,
    data: {
      ...result
    },
    msg: 'ok'
  };
});

/**
 * @Description 导航编码或名称唯一性
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/menu/uniqueness', 'post', (data) => {
  const bodyParams = JSON.parse(data.body);
  console.log('bodyParams', bodyParams);
  const { key, value } = bodyParams;
  console.log(key, value);
  const index = menuData.findIndex(item => item[key] === value);
  return {
    code: 200,
    data: {
      exist: index === -1
    },
    msg: 'ok'
  };
});
