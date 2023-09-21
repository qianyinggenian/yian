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
            <el-input placeholder="请输入" v-model="ruleForm.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-input v-model="ruleForm.type"></el-input>
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
      ruleForm: {},
      rules: {}
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
  },
  methods: {}
};
</script>

<style scoped>

</style>
