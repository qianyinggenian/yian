<template>
  <div id="particles-js" class="login-container">
    <div class="login-content">
      <div class="info">
        <div class="system-title">
          <div class="user-login">用户登录</div>
          <div class="welcome-info">WELCOME TO THE SYSTEM</div>
        </div>
        <div class="user-info">
          <el-form ref="ruleForm" :model="formData" :rules="loginRules" class="login-form" autocomplete="on"
                   label-position="left">
            <div class="username">
              <el-form-item prop="username">
                <el-input
                    ref="username"
                    type="text"
                    tabindex="1"
                    maxlength="20"
                    name="username"
                    autocomplete="on"
                    placeholder="输入用户名"
                    v-model="formData.username"
                />
              </el-form-item>
            </div>
            <div class="password">
              <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">
                  <!--  autocomplete="new-password" 浏览器不自动填充已记住的账号密码-->
                  <el-input
                      ref="password"
                      show-password
                      tabindex="2"
                      maxlength="20"
                      name="password"
                      autocomplete="new-password"
                      key="password"
                      type="password"
                      placeholder="输入密码"
                      v-model="formData.password"
                      @blur="capsTooltip = false"
                      @keyup.enter.native="handleLogin"
                  />
                </el-form-item>
              </el-tooltip>
            </div>
            <div class="checkbox">
              <el-checkbox
                  false-label="no"
                  true-label="yes"
                  v-model="checked"
                  @change="handleChange">记住用户名与密码
              </el-checkbox>
            </div>
            <el-button :loading="loading" class="login-btn" style="width:100%;margin-bottom:30px;margin-top: 30px"
                       @click="handleLogin">登录
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div class="copyright">Copyright &copy;2023 技术支持: xxx</div>
  </div>
</template>

<script>
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
import { loginPost } from '@/api/login';
import { PUBLICKEY, encryptionKey, decryptKey } from '@/RSA';
import { setRefreshToken, setToken, yiAnToken } from '@/common/Cookie';
import 'particles.js';
import particlesConfig from './Json/particles.json';
import { userData } from '@/common/data/userData';
import { addData, instanceDB } from '@/indexedDB';

export default {
  name: 'indexView',
  data () {
    // 密钥对生成 http://web.chacuo.net/netrsakeypair
    return {
      publicKey: PUBLICKEY,
      encryptionKey: encryptionKey,
      decryptKey: decryptKey,
      formData: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码', trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false,
      checked: '',
      capsTooltip: false,
      redirect: undefined
    };
  },
  mounted () {
    if (this.formData.username === '') {
      this.$refs.username.focus();
    } else if (this.formData.password === '') {
      this.$refs.password.focus();
    }
    if (localStorage.getItem('cu') && localStorage.getItem('pr')) {
      this.$set(this.formData, 'username', this.decrypt(localStorage.getItem('cu')));
      this.$set(this.formData, 'password', this.decrypt(localStorage.getItem('pr')));
    }
    this.checked = localStorage.getItem('checked');
    this.$nextTick(() => {
      this.initParticlesJS();
    });

    this.$nextTick(() => {
      this.initUserData();
    });
  },
  methods: {
    initParticlesJS () {
      this.$nextTick(() => {
        // eslint-disable-next-line no-undef
        particlesJS('particles-js', particlesConfig);
      });
    },
    /**
     * @Description 加密
     * @author qianyinggenian
     * @date 2022/4/28
     */
    encrypt (txt) {
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(this.publicKey); // 设置公钥
      return encryptor.encrypt(txt); // 对需要加密的数据进行加密
    },
    /**
     * @Description 加密用来记住密码
     * @author qianyinggenian
     * @date 2022/4/28
     */
    encryptFn (txt) {
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(this.encryptionKey); // 设置公钥
      return encryptor.encrypt(txt); // 对需要加密的数据进行加密
    },
    /**
     * @Description 解密
     * @author qianyinggenian
     * @date 2022/1/4
     */
    decrypt (txt) {
      const decryptor = new JSEncrypt(); // 新建JSEncrypt对象
      decryptor.setPrivateKey(this.decryptKey); // 设置私钥
      return decryptor.decrypt(txt); // 对需要解密的数据景行解密
    },
    checkCapslock () {
    },
    handleChange () {
      console.log('checked', this.checked);
    },
    initUserData () {
      setTimeout(() => {
        for (const key of userData) {
          addData(instanceDB, 'userList', key);
        }
      }, 100);
    },
    handleLogin () {
      try {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            const params = {
              username: this.encrypt(this.formData.username),
              password: this.encrypt(this.formData.password)
            };
            localStorage.setItem('checked', this.checked);
            if (this.checked === 'yes') {
              localStorage.setItem('cu', this.encryptFn(this.formData.username));
              localStorage.setItem('pr', this.encryptFn(this.formData.password));
            } else {
              localStorage.removeItem('cu');
              localStorage.removeItem('pr');
            }
            const result = await loginPost(params);
            const { code, data, msg } = result;
            if (code === 200) {
              setToken(yiAnToken, data.token);
              setRefreshToken(data.token);
              this.$_store.commit('app/SET_USER_MSG', {
                username: data.name,
                userId: data.userId,
                account: data.account
              });
              this.$nextTick(() => {
                this.$router.push('/layout');
              });
              this.$message.success(msg);
            } else {
              this.$message.error(msg);
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url('./img/bj.jpg');
}

.login-content {
  top: 27%;
  z-index: 2;
  width: 460px;
  right: 278px;
  height: 55%;
  padding: 50px;
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  position: absolute;
  box-sizing: border-box;
  justify-content: center;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.info {
  width: 80%;
  height: 70%;

  .system-title {
    width: 100%;
    height: 100px;
    text-align: center;
    align-items: center;

    .user-login {
      height: 59px;
      color: #FFFFFF;
      font-size: 42px;
      font-weight: 500;
      letter-spacing: 5px;
      font-family: PingFang SC;
    }

    .welcome-info {
      font-size: 16px;
      opacity: 0.67;
      color: #FFFFFF;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: 2px;
      font-family: PingFang SC;
    }
  }

  .user-info {
    height: 100%;
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: center;

    .el-input {
      width: 340.84px;

      ::v-deep .el-input__inner {
        opacity: 0.6;
        height: 54px !important;
        line-height: 54px !important;
        border-radius: 36px !important;
        background: rgba(255, 255, 255, 0.6);
      }
    }

    ::v-deep .el-checkbox__inner {
      opacity: 0.6;
      height: 20px;
      width: 20px;
      border: 2px solid #3E83E9;
      background: rgba(255, 255, 255, 0.6);
    }

    ::v-deep .el-checkbox {
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 400;
      font-family: PingFang SC;
    }

    ::v-deep .el-checkbox__inner::after {
      top: 3px;
      left: 7px;
    }

    ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #ffffff !important;
    }

    .login-btn {
      opacity: 1;
      width: 335px;
      height: 49px;
      border: #3E83E9;
      color: #ffffff;
      font-size: 21px;
      font-weight: 400;
      border-radius: 32px;
      letter-spacing: 2px;
      background-color: #3E83E9;
      font-family: PingFang SC;
    }
  }
}

.login-content h1 {
  text-align: center;
  margin-bottom: 20px;
}

.login-content p {
  text-indent: 2em;
  line-height: 1.7;
}

::v-deep input::-webkit-input-placeholder {
  opacity: 1;
  color: #ffffff;
  font-size: 17px;
  font-weight: 400;
  line-height: 500px;
  font-family: PingFang SC;
}

::v-deep input::-ms-input-placeholder {
  opacity: 1;
  color: #ffffff;
  font-size: 17px;
  font-weight: 400;
  line-height: 500px;
  font-family: PingFang SC;
}

.copyright {
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  color: #ffffff;
  font-size: 18px;
  font-weight: 400;
  position: absolute;
  align-items: center;
  letter-spacing: 2px;
  justify-content: center;
}

::v-deep .el-form-item__error {
  left: 20px !important;
}
</style>
