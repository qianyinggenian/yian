import Mock from 'mockjs-async';
import { PRIVATEKEY, uStr, pStr } from '@/RSA';
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
import {
  instanceDB,
  getDataByIndex
} from '@/indexedDB';

const Random = Mock.Random;
// 第一个参数：模拟的url，第二个参数：请求方式， 第三个参数：数据模版，也就是响应回来的值
Mock.mock('/mock/login', 'post', (data) => {
  const body = JSON.parse(data.body);
  const { password, username } = body;
  let params = {};
  return getDataByIndex(instanceDB, 'userList', 'account', decrypt(username)).then((result) => {
    if (result.code === 200) {
      if (decrypt(password) === decrypt(result.data.password)) {
        if (result.data.status === '启用') {
          params = {
            code: 200,
            data: {
              name: result.data.name,
              userId: result.data.id,
              account: result.data.account,
              // 随机字符串
              token: Random.string('lower', 20)
            },
            msg: '登录成功，正在跳转！'
          };
          return params;
        } else {
          return {
            code: 500,
            data: {},
            msg: '该账号已禁用，请联系管理员'
          };
        }
      }
    }
    return {
      code: 500,
      data: {},
      msg: '账号或密码错误，请联系管理员'
    };
  });
  // if (decrypt(username) === decrypt(uStr) && decrypt(password) === decrypt(pStr)) {
  //   params = {
  //     code: 200,
  //     data: {
  //       name: Random.cname(),
  //       userId: Random.guid(),
  //       account: decrypt(username),
  //       // 随机字符串
  //       token: Random.string('lower', 20)
  //     },
  //     msg: '登录成功，正在跳转！'
  //   };
  // } else {
  //   params = {
  //     code: 500,
  //     data: {},
  //     msg: '用户名或密码错误'
  //   };
  // }
  // return params;
});
// 第一个参数：模拟的url，第二个参数：请求方式， 第三个参数：数据模版，也就是响应回来的值
Mock.mock('/mock/login1', 'post', (data) => {
  const body = JSON.parse(data.body);
  const { password, username } = body;
  let params = {};
  if (decrypt(username) === decrypt(uStr) && decrypt(password) === decrypt(pStr)) {
    params = {
      code: 200,
      data: {
        name: Random.cname(),
        userId: Random.guid(),
        account: decrypt(username),
        // 随机字符串
        token: Random.string('lower', 20)
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
