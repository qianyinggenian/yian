<template>
  <el-drawer
      title="设置"
      size="15%"
      custom-class="custom-class-drawer"
      :visible.sync="drawer"
      direction="rtl"
      @close="closeDrawer"
  >
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
  props: {
    isShowWaterMark: {
      type: String
    }
  },
  watch: {
    isShowWaterMark: {
      handler (newVal) {
        this.waterMark = newVal;
      },
      immediate: true
    }
  },
  computed: {},
  mounted () {},
  methods: {
    /**
     * @Description 是否显示水印
     * @author qianyinggenian
     * @date 2023/9/13
     */
    handleShowWaterMask (value) {
      this.$_store.commit('app/SET_WATER_MARK', value);
    },
    getInfo () {
      this.drawer = true;
    },
    /**
     * @Description
     * @author qianyinggenian
     * @date 2023/9/13
    */
    closeDrawer () {
      this.drawer = false;
      this.$emit('close');
    },

    handleShowWaterMask1 () {
      const area = this.WaterMarkArea === 'system' ? 'module' : 'system';
      this.$_store.commit('app/SET_WATER_MASK_AREA', area);
    }
  }
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
