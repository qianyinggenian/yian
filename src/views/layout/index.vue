<template>
  <div class="layout-container" :class="{'bg-disable': isGreyOut === '1'}">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container class="yiAn-container">
        <el-aside :style="{width: isCollapse ? '65px': '200px'}">
          <sidebar ref="menu"></sidebar>
        </el-aside>
        <el-main>
          <navbar></navbar>
          <div class="router-view-container">
            <router-view style="height: 100%;width: 100%"/>
          </div>
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
import navbar from './navbar/index.vue';
import { menuData } from '@/common/data';
import { userData } from '@/common/data/userData';
import { addData, instanceDB } from '@/indexedDB';

export default {
  name: 'indexView',
  components: {
    sidebar,
    Header,
    navbar
  },
  data () {
    return {
      // instanceDB: null,
      isUseDom: false
    };
  },
  computed: {
    ...mapState('app', [
      'isCollapse',
      'isGreyOut',
      'isShowWaterMark',
      'personalMsg',
      'waterMarkArea'])
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

  mounted () {
    this.initIndexedDB();
  },
  methods: {
    initIndexedDB () {
      setTimeout(() => {
        for (const key of menuData) {
          addData(instanceDB, 'menuList', key);
        }
        for (const key of userData) {
          addData(instanceDB, 'userList', key);
        }
      }, 1500);
    },
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

  .yiAn-container {
    height: calc(100% - 60px);
    background-color: #060d24;
  }

  .el-aside {
    height: 100%;
  }

  .el-main {
    height: 100%;
    width: 100%;
    position: relative;
    padding: 0;

    .router-view-container {
      width: 100%;
      height: calc(100% - 34px);
      overflow-y: auto;
      color: white;
    }
  }
}

.bg-disable {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -webkit-filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
  filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
}
</style>
