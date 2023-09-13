<template>
  <el-drawer
      title="设置"
      size="15%"
      custom-class="custom-class-drawer"
      :visible.sync="drawer"
      direction="rtl">
    <el-divider content-position="left">水印设置</el-divider>
    <div class="setting-box">
      <div class="item">
        <div>显示水印</div>
        <div>
          <el-switch
              v-model="waterMark"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="handleShowWaterMask"
          >
          </el-switch>
        </div>
      </div>
    </div>
    <el-divider content-position="left">水印设置</el-divider>
  </el-drawer>
</template>

<script>
export default {
  name: "drawerView",
  components: {},
  data () {
    return {
      waterMark: '',
      drawer: false
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {},
  methods: {}
};
</script>

<style lang="scss" scoped>
::v-deep .custom-class-drawer {
  .el-drawer__header {
    margin-bottom: 0;
    padding: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
  }
  .el-drawer__body {
    box-sizing: border-box;
    padding: 0 15px;
  }
  .setting-box {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
