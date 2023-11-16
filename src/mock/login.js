import Mock from 'mockjs-async';
import { userData } from '@/common/data/userData';
import { PRIVATEKEY } from '@/RSA';
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
import {
  instanceDB,
  getDataByIndex
} from '@/indexedDB';

const Random = Mock.Random;
// 第一个参数：模拟的url，第二个参数：请求方式， 第三个参数：数据模版，也就是响应回来的值
Mock.mock('/mock/login2', 'post', (data) => {
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
});
// 第一个参数：模拟的url，第二个参数：请求方式， 第三个参数：数据模版，也就是响应回来的值
Mock.mock('/mock/login', 'post', (data) => {
  const body = JSON.parse(data.body);
  const { password, username } = body;
  let params = {};
  const result = userData.find(value => value.account === decrypt(username) &&
    decrypt(value.password) === decrypt(password));
  if (result) {
    if (result.status === '启用') {
      params = {
        code: 200,
        data: {
          name: result.name,
          userId: result.id,
          account: result.account,
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
  } else {
    return {
      code: 500,
      data: {},
      msg: '账号或密码错误，请联系管理员'
    };
  }
});

function decrypt (txt) {
  const decryptor = new JSEncrypt(); // 新建JSEncrypt对象
  decryptor.setPrivateKey(PRIVATEKEY); // 设置私钥
  return decryptor.decrypt(txt); // 对需要解密的数据进行解密
}
