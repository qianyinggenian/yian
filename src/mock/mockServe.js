import Mock from 'mockjs';
import { PRIVATEKEY, uStr, pStr } from '@/RSA';
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
// import login from './json/login.json' // 模拟接口返回的数据 对应data后面跟的值
const Random = Mock.Random;
// 第一个参数：模拟的url，第二个参数：请求方式， 第三个参数：数据模版，也就是响应回来的值
Mock.mock('/mock/login', 'post', (data) => {
  const body = JSON.parse(data.body);
  const { password, username } = body;
  let params = {};
  if (decrypt(username) === decrypt(uStr) && decrypt(password) === decrypt(pStr)) {
    params = {
      code: 200,
      data: {
        name: Random.cname(),
        userId: Random.guid()
      },
      msg: '登录成功，正在跳转！'
    };
  } else {
    params = {
      code: 500,
      data: {},
      msg: '用户名或密码错误'
    };
  }
  return params;
});

function decrypt (txt) {
  const decryptor = new JSEncrypt(); // 新建JSEncrypt对象
  decryptor.setPrivateKey(PRIVATEKEY); // 设置私钥
  return decryptor.decrypt(txt); // 对需要解密的数据景行解密
}
