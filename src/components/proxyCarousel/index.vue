<template>
<div class="scroll-container">
  <div class="item-box"
       @mouseover="mouseover"
       @mouseleave="mouseleave">
    <template v-for="(item, index) in carouselList" >
      <transition
          mode="out-in"
          :name="transitionName"
          :key="index">
        <div class="item" v-show="index === curIndex">
          <img :src="item" alt="">
        </div>
      </transition>
    </template>
    <div class="prev" v-if="direction === 'horizontal'" :class="arrowFn(arrow)" @click="prevIndex">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="next" v-if="direction === 'horizontal'" :class="arrowFn(arrow)" @click="nextIndex">
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="indicator-box"
         :class="indicatorPosition">
      <div class="indicator-item"
           :class="activeClass(curIndex, index)"
           v-for="index in carouselList.length"
           :key="index"
           @click.self="handleChangeIndex(index)"
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
      leaveActiveClass: 'slide-left-leave-active',
      interval: null,
      isPaused: false,
      curIndex: 0,
      oldIndex: 0
    };
  },
  props: {
    carouselList: {
      type: Array,
      default: () => []
    },
    gap: {
      type: Number,
      default: 16
    },
    // 切换间隔时间， 毫秒
    intervalTime: {
      type: Number,
      default: 3000
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    // arrow 可取值 always、never
    arrow: {
      type: String,
      default: ''
    },
    indicatorStyleObj: {
      type: Object
    },
    // 可取值 horizontal/vertical
    direction: {
      type: String,
      default: 'horizontal'
    },
    dotPosition: {
      type: String,
      default: 'bottom'
    }
  },
  computed: {
    arrowFn () {
      return (value) => {
        return value && ['always', 'never'].includes(value) ? `${value}-arrow` : '';
      };
    },
    indicatorPosition () {
      let dotPosition;
      let direction;
      if (['horizontal', 'vertical'].includes(this.direction)) {
        direction = this.direction;
        if (this.direction === 'horizontal') {
          dotPosition = ['bottom', 'top'].includes(this.dotPosition) ? this.dotPosition : 'bottom';
        } else {
          dotPosition = ['left', 'right'].includes(this.dotPosition) ? this.dotPosition : 'right';
        }
      } else {
        direction = 'horizontal';
        dotPosition = 'bottom';
      }
      return `indicator-${direction} indicator-${direction}-${dotPosition}`;
    },
    activeClass () {
      return (curIndex, index) => {
        return curIndex === index - 1 ? 'active-indicator' : '';
      };
    },
    indicatorStyle () {
      return {
        width: '60px',
        height: '5px',
        borderRadius: '1px',
        background: 'rgba(255, 255, 255, 0.7)',
        ...(this.indicatorStyleObj || {})
      };
    }
  },
  mounted () {
    if (this.autoplay) {
      this.startInterval();
    }
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
        this.transitionName = this.direction === 'horizontal' ? 'slide-left' : 'slide-up';
      } else {
        this.transitionName = this.direction === 'horizontal' ? 'slide-right' : 'slide-down';
      }
      this.$emit('updateTransitionName', this.transitionName);
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
@mixin flexStyle {
  display: flex;
  align-items: center;
  justify-content: center;
}
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
    position: absolute;
  }
  .indicator-horizontal {
    width: 100%;
    @include flexStyle;
    .indicator-item {
      margin-right: 10px;
      cursor: pointer;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.7);
      &:last-child {
        margin-right: 0;
      }
    }
    .active-indicator {
      background: rgba(255,255,255,1);
    }
  }
  .indicator-horizontal-top {
    top: 16px;
    position: absolute;
  }
  .indicator-horizontal-bottom {
    bottom: 16px;
    position: absolute;
  }
  .indicator-vertical {
    @include flexStyle;
    flex-direction: column;
    height: 100%;
    .indicator-item {
      margin-bottom: 10px;
      cursor: pointer;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.7);
      &:last-child {
        margin-bottom: 0;
      }
    }
    .active-indicator {
      background: rgba(255,255,255,1);
    }
  }
  .indicator-vertical-right {
    right: 16px;
    position: absolute;
  }
  .indicator-vertical-left {
    left: 16px;
    position: absolute;
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
      @include flexStyle;
    }
  }
  .always-arrow {
    @include flexStyle;
  }
  .never-arrow {
    display: none !important;
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

.slide-down-enter-active,
.slide-down-leave-active,
.slide-up-enter-active,
.slide-up-leave-active {
  will-change: transform;
  transition: all 2s;
  position: absolute;
}
.slide-down-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.slide-down-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-up-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-up-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>
