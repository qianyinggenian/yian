<template>
<div class="scroll-container">
  <div class="item-box"
       @mouseover="mouseover"
       @mouseleave="mouseleave">
    <template v-for="(item, index) in carouselList" >
      <transition :name="transitionName"  :key="index">
        <div class="item" v-if="index === curIndex">
          <img :src="item" alt="">
        </div>
      </transition>
    </template>
    <div class="prev" @click="prevIndex">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="next" @click="nextIndex">
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="indicator-box">
      <div class="indicator-item"
           :class="curIndex === item - 1 ? 'active-indicator-item' : ''"
           v-for="item in carouselList.length"
           :key="item"
           @click.self="handleChangeIndex(item)"
      >
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      transitionName: 'slide-left',
      interval: null,
      isPaused: false,
      intervalTime: 3000,
      curIndex: 0,
      oldIndex: 0,
      gap: 16,
      carouselList: [
        require('../../assets/45.jpg'),
        require('../../assets/56.jpeg'),
        require('../../assets/login.jpg'),
        require('../../assets/55.jpeg'),
        require('../../assets/广州塔.jpg')
      ]
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.startInterval();
  },
  methods: {
    mouseover () {
      this.isPaused = true;
    },
    mouseleave () {
      this.isPaused = false;
    },
    handleChangeIndex (index) {
      this.oldIndex = this.curIndex;
      this.curIndex = index - 1;
      if (this.oldIndex < this.curIndex) {
        this.changeTransitionName('next');
      } else {
        this.changeTransitionName('prev');
      }
    },
    startInterval () {
      if (this.interval !== null) {
        // 判断计时器是否为空
        clearInterval(this.interval);
        this.interval = null;
      }
      this.interval = setInterval(() => {
        if (!this.isPaused) {
          this.nextIndex();
        }
      }, this.intervalTime);
    },
    stopInterval () {
      if (this.interval) {
        clearInterval(this.interval); // 清除定时器
        this.interval = null; // 重置定时器ID
      }
    },

    prevIndex () {
      this.curIndex = this.curIndex === 0 ? this.carouselList.length - 1 : this.curIndex - 1;
      this.changeTransitionName('prev');
    },
    changeTransitionName (flag) {
      if (flag === 'next') {
        this.transitionName = 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }
    },
    nextIndex () {
      this.curIndex = this.curIndex === this.carouselList.length - 1 ? 0 : this.curIndex + 1;
      this.changeTransitionName('next');
    }
  },
  destroyed () {
    this.stopInterval(); // 组件销毁前清除定时器
  }
};
</script>
<style scoped lang="scss">
.scroll-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .item-box {
    display: flex;
    width: 100%;
    height: 100%;
    .item {
      flex-shrink: 0;
      width: 100%;
      height:100%;
      ::v-deep  img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .indicator-box {
    width: 100%;
    position: absolute;
    bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    .indicator-item {
      width: 60px;
      height: 5px;
      margin-right: 10px;
      background: rgba(255,255,255,0.7);
      cursor: pointer;
    }
    .active-indicator-item {
      background: rgba(255,255,255,1);
    }
  }
  .prev, .next {
    display: none;
    position: absolute;
    top: calc(50% - 36px);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(81, 147, 241, 0.51);
    cursor: pointer;
    i {
      font-size: 20px;
      font-weight: bold;
    }
    &:hover {
      background: rgba(64,158,255);
    }
  }
  &:hover {
    .prev, .next {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .prev {
    left: 0;
  }
  .next {
    right: 0;
  }
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 2s;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

</style>
