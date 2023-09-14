<template>
  <div class="layout-container">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <sidebar ref="menu"></sidebar>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import WaterMark from '@/components/WaterMark';
import Header from './header/index.vue';
import sidebar from './sidebar/index.vue';
import { mapState } from 'vuex';

export default {
  name: 'indexView',
  components: {
    sidebar,
    Header
  },
  data () {
    return {
      isUseDom: false
    };
  },
  mounted () {
  },
  computed: {
    ...mapState('app', ['isShowWaterMark', 'personalMsg', 'waterMarkArea'])
  },
  watch: {
    isShowWaterMark: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.showWaterMask(newVal);
        }
      },
      immediate: true
    },
    waterMarkArea: {
      handler (newVal) {
        if (newVal && this.isShowWaterMark) {
          WaterMark.set(this.personalMsg.username, this.waterMarkArea);
        }
      },
      immediate: true
    }
  },
  methods: {
    showWaterMask (flag) {
      if (flag === '1') {
        this.$nextTick(() => {
          WaterMark.set(this.personalMsg.username, this.waterMarkArea);
        });
      } else {
        this.$nextTick(() => {
          WaterMark.del();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  .el-header {
    padding: 0;
  }

  .el-aside {
    height: 100%;
  }

  .el-main {
    height: 100%;
    width: 100%;
    position: relative;
  }
}
</style>
