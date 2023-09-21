import Mock from 'mockjs';
// import login from './json/login.json' // 模拟接口返回的数据 对应data后面跟的值
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
    msg: '登录成功，正在跳转！'
  };
});

/**
 * @Description 导航详情
 * @author qianyinggenian
 * @date 2023/9/21
 */
Mock.mock('/mock/menu/detail', 'post', () => {
});
