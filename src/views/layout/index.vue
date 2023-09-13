<template>
  <div class="layout-container">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main class="yian-module">
          <svg-icon icon-class="return"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { watermark } from 'watermark-dom';
import WaterMask from '@/components/WaterMask';
import Header from './Header/index.vue';
import { mapState } from 'vuex';
export default {
  name: "indexView",
  components: {
    Header
  },
  data () {
    return {
      isUseDom: false
    };
  },
  mounted() {},
  computed: {
    ...mapState('app', ['isShowWaterMask','personalMsg'])
  },
  watch: {
    isShowWaterMask: {
      handler (newVal,oldVal) {
        if (newVal !== oldVal) {
          this.showWaterMask(newVal);
        }
      },
      immediate: true
    }
  },
  methods:{
    showWaterMask (flag) {
      if (flag === '1') {
       this.$nextTick(() => {
         WaterMask.set(this.personalMsg.username, 'module');
       });
       if (this.isUseDom) {
         this.$nextTick(() => {
           this.iniTMask();
         });
       }
      } else {
        this.$nextTick(() => {
          WaterMask.del();
        });
        if (this.isUseDom) {
          this.$nextTick(() => {
            this.iniTMask();
            watermark.remove();
          });
        }
      }
    },
    iniTMask () {
        watermark.init({
          watermark_txt: this.personalMsg.username,
          watermark_x: 0,
          watermark_y: 0,
          watermark_fontsize:'14px',
          watermark_angle: 45,
          monitor: false
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
.el-aside {
  height: 100%;
  background-color: #42b983;
}
</style>
