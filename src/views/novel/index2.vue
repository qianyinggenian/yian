<script>
import proxyDialog from '@/components/proxyDialog';
export default {
  name: 'index2',
  components: {
    proxyDialog
  },
  data () {
    return {
      isShowDialog: false
    };
  },
  mounted () {
  },
  methods: {
    handleClose () {
      this.isShowDialog = false;
    }
  }
};
</script>

<template>
<div class="container">
  <el-button size="small" @click="isShowDialog = true">测试</el-button>
  <proxy-dialog
      ref="dialog"
      height="80%"
      :visible.sync="isShowDialog"
      @close="handleClose"
      :is-show-footer="false"
  >
    <div class="dialog-form" @dblclick="isShowDialog = false">
      <iframe src="http://localhost:8888/#/novel3" frameborder="0" style="width: 98%;height: 98%;"></iframe>
    </div>
    <div slot="footer">
      <el-button size="small" type="primary" @click="handleClose">关闭</el-button>
    </div>
  </proxy-dialog>
</div>
</template>

<style scoped lang="scss">
.container {
  .dialog-form {
    height: 100%;
    width: 100%;
  }
}
</style>
<style>
.popperClass {
  height: 60%;
  width: 60%;
}
</style>
