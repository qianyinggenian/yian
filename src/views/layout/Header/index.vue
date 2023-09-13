<template>
  <div class="header-container">
    <div class="system-info">
      <div class="logo">
        <el-avatar title="图像来源抖音号：lj771056898" fit="contain" :src="logoUrl"></el-avatar>
      </div>
      <div class="system-name">{{systemName}}</div>
    </div>
    <div class="user-info">
      <div class="time-container">
        <div class="time">{{time}}</div>
        <div class="date">{{date}}</div>
      </div>
      <el-avatar :size="30" fit="contain" :src="avatarUrl"></el-avatar>
      <div class="username">{{personalMsg.username}}</div>
      <svg-icon title="设置" @click="handleSetting" icon-class="setting"/>
    </div>
    <drawer-view
        ref="drawerView"
        v-if="isShowDrawerView"
        @close="closeDrawer"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState, mapGetters } from 'vuex';
import drawerView from "./components/drawerView.vue";
export default {
  name: "indexView",
  components: {
    drawerView
  },
  data () {
    return {
      date: '',
      time: '',
      isShowDrawerView: false
    };
  },
  computed: {
    ...mapGetters([
      'systemName',
      'personalMsg'
    ]),
    ...mapState('app', ['logoUrl','avatarUrl','isShowWaterMark','waterMarkArea'])
  },
  mounted() {
    this.date = dayjs().format("YYYY/MM/DD");
    this.time = dayjs().format("HH:mm:ss");
    if (this.interval !== null) {
      // 判断计时器是否为空
      clearInterval(this.interval);
      this.interval = null;
    }
    this.interval = setInterval(() => {
      this.time = dayjs().format("HH:mm:ss");
      if (this.time === '00:00:00') {
        this.date = dayjs().format('YYYY/MM/DD');
      }
    }, 1000);
  },
  methods: {

    /**
     * @Description 点击设置图标触发
     * @author qianyinggenian
     * @date 2023/9/13
    */
    handleSetting () {
      this.isShowDrawerView = true;
      this.$nextTick(() => {
        const params = {
          isShowWaterMark: this.isShowWaterMark,
          waterMarkArea: this.waterMarkArea
        };
         this.$refs.drawerView.getInfo(params);
      });
    },
    /**
     * @Description
     * @author qianyinggenian
     * @date 2023/9/13
    */
    closeDrawer () {
      this.isShowDrawerView = false;
    }
  },
  destroyed() {
    clearInterval(this.interval);
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(41,16,122,1) 15%, rgba(34,49,144,1) 44%, rgba(0,212,255,1) 100%);
  .system-info {
    box-sizing: border-box;
    padding-left: 20px;
    display: flex;
    align-items: center;
    .system-name {
      color: #ffffff;
      margin-left: 20px;
      font-size: var(--system-name-font-size);
      background: var(--system-name-background);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: var(--system-name-color);
    }
  }
  .user-info {
    display: flex;
    box-sizing: border-box;
    padding-right: 20px;
    .time-container {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      .date {
        font-size: var(--font-size-16);
      }
      .time {
        font-size: var(--font-size-14);
      }
    }
    .username {
      cursor: pointer;
      margin: 0 10px;
    }
    .svg-icon {
      cursor: pointer;
    }
  }
}
</style>
