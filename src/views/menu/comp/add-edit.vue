<template>
  <div class="form-container">
    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        size="small"
        label-width="100px"
        class="demo-ruleForm">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-form-item label="编码" prop="code">
            <el-input :disabled="disabled" clearable placeholder="请输入" v-model="ruleForm.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-select :disabled="disabled" clearable v-model="ruleForm.type" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input :disabled="disabled" clearable placeholder="请输入" v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限" prop="permission">
            <el-input :disabled="disabled" clearable placeholder="请输入" v-model="ruleForm.permission"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-form-item label="路由" prop="path" :rules="ruleForm.type === 'menu'? rules.path: []">
            <el-input :disabled="disabled" clearable placeholder="请输入" v-model="ruleForm.path"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组件路径" prop="comp">
            <el-input :disabled="disabled" clearable placeholder="请输入" v-model="ruleForm.comp"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input :disabled="disabled" clearable placeholder="请输入" v-model="ruleForm.sort"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
    </el-form>
    <div class="btns-box">
      <el-button size="small" type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/menu';

export default {
  name: 'add-edit',
  components: {},
  data () {
    return {
      ruleForm: {
        code: '',
        type: ''
      },
      disabled: false,
      checkList: [],
      rules: {
        code: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: this.codeValidator, trigger: 'blur', transform: this.codeValidateTransform }
        ],
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        permission: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      treeNode: {},
      options: [
        {
          value: 'btn',
          label: '按钮'
        },
        {
          value: 'menu',
          label: '菜单'
        }
      ]
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
  },
  methods: {
    // 验证标准中文名称唯一性.
    codeValidateTransform (val) {
      return { code: val, id: this.ruleForm.id };
    },
    // 验证标准中文名称唯一性.
    codeValidator (rule, value, callback) {
      if (!value.code) {
        // eslint-disable-next-line standard/no-callback-literal
        callback();
      } else {
        // 新增的情况下value中的id为undefind
        const obj = {
          key: 'code',
          value: this.ruleForm.code
        };
        console.log(obj);
        api.menuUniqueness(obj).then((result) => {
          console.log('data', result);
          const { data } = result;
          if (result.code === 200) {
            if (data.exist) {
              // eslint-disable-next-line standard/no-callback-literal
              // callback({ state: 'success', message: '验证通过' });
              callback();
            } else {
              // eslint-disable-next-line standard/no-callback-literal
              callback({ state: 'error', message: '该编码已存在' });
              // callback('该路由或url已存在');
            }
          }
        });
      }
    },
    /**
     * @Description 获取信息
     * @author qianyinggenian
     * @date 2023/9/22
     */
    async getInfo ({ treeNode, disabled, type }) {
      this.treeNode = treeNode;
      this.disabled = disabled;
      if (type !== 'add') {
        const result = await api.menuDetail({ id: treeNode.id });
        const { code, data, msg } = result;
        if (code === 200) {
          this.ruleForm = data;
        } else {
          this.$message.error(msg);
        }
      } else {
        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields();
        });
      }
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
            const result = await api.menuSave(this.ruleForm);
            const { code, data, msg } = result;
            if (code === 200) {
              console.log('data', data);
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

<style scoped>

</style>
