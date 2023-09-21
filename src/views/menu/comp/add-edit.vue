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
            <el-input clearable placeholder="请输入" v-model="ruleForm.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择">
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
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限" prop="permission">
            <el-input v-model="ruleForm.permission"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-form-item label="路由" prop="path">
            <el-input v-model="ruleForm.path"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组件路径" prop="comp">
            <el-input v-model="ruleForm.comp"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="ruleForm.sort"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
    </el-form>
    <div class="btns-box">
      <el-button size="small" type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-edit',
  components: {},
  data () {
    return {
      ruleForm: {
        code: '编码',
        type: 'btn'
      },
      checkList: [],
      rules: {
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { validator: this.codeValidator, trigger: 'blur', transform: this.codeValidateTransform }
        ]
      },
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
      return { chineseName: val, id: this.formData.id };
    },
    // 验证标准中文名称唯一性.
    codeValidator (rule, value, callback) {
      if (!value.chineseName) {
        // eslint-disable-next-line standard/no-callback-literal
        callback();
      } else {
        // 新增的情况下value中的id为undefind
        const obj = {
          chineseName: this.formData.chineseName,
          id: this.formData.id
        };
        console.log(obj);
        // api.chineseName(obj).then(({ data }) => {
        //   if (data.code === 200) {
        //     if (data.data) {
        //       // eslint-disable-next-line standard/no-callback-literal
        //       callback({ state: 'success', message: '验证通过' });
        //       // callback();
        //     } else {
        //       // eslint-disable-next-line standard/no-callback-literal
        //       callback({ state: 'error', message: '该编码已存在' });
        //       // callback('该路由或url已存在');
        //     }
        //   }
        // });
      }
    }
  }
};
</script>

<style scoped>

</style>
