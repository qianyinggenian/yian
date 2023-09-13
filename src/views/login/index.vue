<template>
  <div class="login-container">
    <div class="login-content">
      <div class="info">
        <div class="system-title">
          <div class="user-login">用户登录</div>
          <div class="welcome-info">WELCOME TO THE SYSTEM</div>
        </div>
        <div class="user-info">
          <el-form ref="wkzForm" :model="formData" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="username">
              <el-form-item prop="username" >
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
                      autocomplete="on"
                      :key="passwordType"
                      :type="passwordType"
                      placeholder="输入密码"
                      v-model="formData.password"
                      @blur="capsTooltip = false"
                      @keyup.native="checkCapslock"
                      @keyup.enter.native="handleLogin"
                  />
                </el-form-item>
              </el-tooltip>
            </div>
            <div class="checkbox"><el-checkbox v-model="checked">记住用户名与密码</el-checkbox></div>
            <el-button :loading="loading" class="login-btn"  style="width:100%;margin-bottom:30px;margin-top: 30px"  @click="handleLogin">登录</el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div class="copyright">Copyright  &copy;2023 技术支持: xxx</div>
  </div>
</template>

<script>
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
import { loginPost } from '@/api/login';
import { PUBLICKEY } from '@/RSA';
export default {
  name: 'indexView',
  data () {
    // 密钥对生成 http://web.chacuo.net/netrsakeypair
    return {
      publicKey: PUBLICKEY,
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
      checked: false,
      capsTooltip: false,
      registerLoading: false,
      showrRegisterDialog: false,
      redirect: undefined
    };
  },
  mounted () {
    // if (this.wkzForm.username === '') {
    //   this.$refs.username.focus();
    // } else if (this.wkzForm.password === '') {
    //   this.$refs.password.focus();
    // }
  },
  methods: {
    /**
     * @Description 加密
     * @author qianyinggenian
     * @date 2022/4/28
     */
    encryptFn (txt) {
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(this.publicKey); // 设置公钥
      return encryptor.encrypt(txt); // 对需要加密的数据进行加密
    },
    /**
     * @Description 解密
     * @author qianyinggenian
     * @date 2022/1/4
     */
    decrypt (txt) {
      const decryptor = new JSEncrypt(); // 新建JSEncrypt对象
      decryptor.setPrivateKey(this.personalKey); // 设置私钥
      return decryptor.decrypt(txt); // 对需要解密的数据景行解密
    },
    checkCapslock () {},
    handleLogin () {
      try {
        this.$refs.wkzForm.validate(async (valid) => {
          if (valid) {
            const params = {
              username: this.encryptFn(this.formData.username),
              password: this.encryptFn(this.formData.password)
            };
            const result = await loginPost(params);
            const { code, data, msg } = result;
            if (code === 200) {
              this.$_store.commit('app/SET_USER_MSG', {
                username: data.name,
                userId: data.userId
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
    //min-height: calc(100vh - 0px);
    position: relative;
    background-size:100% 100%;
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
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  }
  /* 通过给背景添加模糊效果使其不会模糊容器内荣，即文字 */
  .login-content::before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    z-index: -3;
    /* 将距离限制于容器内部，防止边缘虚化 */
    margin: -30px;
    position: absolute;
    filter: blur(20px);
    -o-filter: blur(20px);
    -ms-filter: blur(20px);
    -moz-filter: blur(20px);
    -webkit-filter: blur(20px);
    /* 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。 */
    background-size: cover;
    /* 固定的背景图像 */
    background-attachment: fixed;
    background-position: center top;
    background-image: url('./img/bj.jpg');
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
      ::v-deep .el-checkbox__input.is-checked+.el-checkbox__label {
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
  ::v-deep  input::-ms-input-placeholder {
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
    position:absolute;
    align-items: center;
    letter-spacing: 2px;
    justify-content: center;
  }
  ::v-deep .el-form-item__error {
    left: 20px !important;
  }
</style>
