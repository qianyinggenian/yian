<template>
  <proxy-dialog
      ref="dialog"
      :visible.sync="isShowDialog"
      @close="handleClose"
      :is-show-footer="type !== 'show'"
  >
    <div class="dialog-form">
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          size="small"
          label-width="auto">
        <el-row type="flex" justify="space-around" :gutter="50">
          <el-col :span="11">
            <el-form-item label="姓名" prop="name" :title="ruleForm.name">
              <el-input
                  :disabled="disabled" clearable
                  placeholder="请输入"
                  v-model="ruleForm.name">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="账号" prop="account" :title="ruleForm.account">
              <el-input
                  :disabled="disabled" clearable
                  placeholder="请输入"
                  v-model="ruleForm.account">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around" :gutter="50">
          <el-col :span="11">
            <el-form-item label="密码" prop="password">
              <el-input
                  autocomplete="new-password"
                  type="password"
                  show-password
                  :disabled="disabled" clearable placeholder="请输入"
                  v-model="ruleForm.password">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                  type="password"
                  autocomplete="new-password"
                  :disabled="disabled" clearable
                  placeholder="请输入"
                  show-password
                  v-model="ruleForm.confirmPassword">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around" :gutter="50">
          <el-col :span="11">
            <el-form-item label="状态" prop="status">
              <proxySelect
                  :disabled="disabled"
                  v-model="ruleForm.status"
                  :options="accountStatusOptions"
                  clearable>
              </proxySelect>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="邮箱" prop="email" :title="ruleForm.email">
              <el-input
                  :disabled="disabled" clearable
                  placeholder="请输入"
                  v-model="ruleForm.email">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around" :gutter="50">
          <el-col :span="11">
            <el-form-item label="是否超管" prop="isAdmin">
              <proxySelect
                  :disabled="disabled"
                  v-model="ruleForm.isAdmin"
                  :options="yesOrNo"
                  clearable>
              </proxySelect>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="类型" prop="type">
              <proxySelect
                  :disabled="disabled"
                  v-model="ruleForm.type"
                  :options="typeOptions"
                  clearable>
              </proxySelect>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer">
      <el-button size="small" type="primary" @click="handleSave">保存</el-button>
    </div>
  </proxy-dialog>
</template>

<script>

import dayjs from 'dayjs';
import Mock from 'mockjs';
import api from '@/api/user';
import { mapGetters } from 'vuex';
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
import { PUBLICKEY, PRIVATEKEY } from '@/RSA';
import proxyDialog from '@/components/proxyDialog';
import proxySelect from '@/components/proxySelect/index.vue';
import { yesOrNo, typeOptions, accountStatusOptions } from '@/common/data/dictionaryData';

const Random = Mock.Random;
export default {
  name: 'add-edit',
  components: {
    proxyDialog,
    proxySelect
  },
  data () {
    return {
      encryptionKey: PUBLICKEY,
      decryptKey: PRIVATEKEY,
      type: 'add',
      ruleForm: {
        isAdmin: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        isAdmin: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      typeOptions: typeOptions,
      accountStatusOptions: accountStatusOptions,
      yesOrNo: yesOrNo,
      disabled: false,
      isShowDialog: false
    };
  },
  props: {},
  watch: {},
  computed: {
    ...mapGetters([
      'personalMsg'
    ])
  },
  mounted () {
  },
  methods: {

    /**
     * @Description 加密
     * @author qianyinggenian
     * @date 2022/4/28
     */
    encrypt (txt) {
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
    /**
     * @Description 获取信息
     * @author qianyinggenian
     * @date 2023/10/10
     */
    async getInfo (params) {
      const { type, id } = params;
      console.log('Random.guid()', Random.guid());
      this.isShowDialog = true;
      this.type = type;
      this.disabled = type === 'show';
      if (type === 'add') {
        this.$set(this.ruleForm, 'isAdmin', '0');
        this.$set(this.ruleForm, 'status', '启用');
        return false;
      }
      const result = await api.userDetail({ id });
      const { code, data, msg } = result;
      if (code === 200) {
        this.ruleForm = data;

        const { confirmPassword, password } = this.ruleForm;
        this.ruleForm.password = password ? this.decrypt(password) : password;
        this.ruleForm.confirmPassword = confirmPassword ? this.decrypt(confirmPassword) : confirmPassword;
      } else {
        this.$message.error(msg);
      }
    },
    /**
     * @Description 关闭弹窗
     * @author qianyinggenian
     * @date 2023/10/10
     */
    handleClose () {
      this.isShowDialog = false;
      this.$emit('close');
    },
    /**
     * @Description 保存
     * @author qianyinggenian
     * @date 2023/9/22
     */
    handleSave () {
      try {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            let params = {};
            const { confirmPassword, password } = this.ruleForm;
            if (this.type === 'add') {
              params = {
                ...this.ruleForm,
                id: Random.guid(),
                creatDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                creator: this.personalMsg.username,
                password: this.encrypt(password),
                confirmPassword: this.encrypt(confirmPassword)
              };
            } else {
              params = {
                ...this.ruleForm,
                password: this.encrypt(password),
                confirmPassword: this.encrypt(confirmPassword)
              };
            }
            const result = await api[this.type === 'add' ? 'userSave' : 'userUpdate'](params);
            const { code, msg } = result;
            if (code === 200) {
              this.$message.success(msg);
              this.$emit('close', true);
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

</style>
