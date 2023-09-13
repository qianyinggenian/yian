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
              v-model="isShowWaterMark"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="handleShowWaterMask"
          >
          </el-switch>
        </div>
      </div>
      <div class="item">
        <div>显示区域</div>
        <div>
          <el-select
              size="mini"
              :disabled="isShowWaterMark === '0'"
              v-model="waterMarkArea"
              placeholder="请选择"
              @change="handleWaterMarkArea"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
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
      waterMarkArea: '',
      isShowWaterMark: '',
      drawer: false,
      options: [
        {
          label: '系统',
          value: 'system'
        },
        {
          label: '模块',
          value: 'module'
        }
      ]
    };
  },
  props: {
  },
  watch: {
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
    /**
     * @Description 显示区域切换
     * @author qianyinggenian
     * @date 2023/9/13
    */
    handleWaterMarkArea () {
      this.$_store.commit('app/SET_WATER_MASK_AREA', this.waterMarkArea);
    },
    /**
     * @Description 显示抽屉
     * @author qianyinggenian
     * @date 2023/9/13
    */
    getInfo (params) {
      this.drawer = true;
      this.isShowWaterMark = params.isShowWaterMark;
      this.waterMarkArea = params.waterMarkArea;
    },
    /**
     * @Description
     * @author qianyinggenian
     * @date 2023/9/13
    */
    closeDrawer () {
      this.drawer = false;
      this.$emit('close');
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
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .el-select {
    width: 100px;
  }
}
</style>
