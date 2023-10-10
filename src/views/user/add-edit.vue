<template>
  <proxy-dialog
      ref="dialog"
      :visible.sync="isShowDialog"
      @close="handleClose"
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
                  :disabled="disabled" clearable placeholder="请输入"
                  v-model="ruleForm.password">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                  :disabled="disabled" clearable
                  placeholder="请输入"
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
                  :options="options"
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
import proxyDialog from '@/components/proxyDialog';
import proxySelect from '@/components/proxySelect/index.vue';
import { mapGetters } from 'vuex';

const Random = Mock.Random;
export default {
  name: 'add-edit',
  components: {
    proxyDialog,
    proxySelect
  },
  data () {
    return {
      type: 'add',
      ruleForm: {},
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
        ]
      },
      options: [
        {
          value: '启用',
          label: '启用'
        },
        {
          value: '禁用',
          label: '禁用'
        }
      ],
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
     * @Description 获取信息
     * @author qianyinggenian
     * @date 2023/10/10
     */
    getInfo () {
      this.isShowDialog = true;
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
            if (this.type === 'add') {
              params = {
                ...this.ruleForm,
                id: Random.guid(),
                creatDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                creator: this.personalMsg.username
              };
            } else {
              params = {
                ...this.ruleForm
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
