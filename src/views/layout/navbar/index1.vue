<template>
  <!-- 文本超出，左右按钮滚动 -->
  <div ref="swiperScroll" class="left-right-swiper-scroll-box">
    <!-- 左边按钮 -->
    <div
        @click="handleLeftClick"
        class="scroll-icon left-icon"
    >
      <div v-if="showLeftIcon">
        <i  class="el-icon-d-arrow-left"></i>
      </div>
<!--      <span class='left-icon' v-if="!showLeftIcon">左标1</span>-->
<!--      <img src="@/assets/img/arrows_left.png" alt="" class='left-icon hovercli' v-if="showLeftIcon">-->
<!--      <img src="@/assets/img/ash_arrows_left.png" alt="" class='left-icon' v-if="!showLeftIcon">-->
    </div> <!-- 中间滚动区域 -->
    <div ref="swiperScrollContent" class="swiper-scroll-content">
      <slot></slot>
    </div>
    <!-- 右边按钮 -->
    <div
        @click="handleRightClick"
        class="scroll-icon right-icon"
    >

      <div v-if="showRightIcon">
        <i  class="el-icon-d-arrow-right"></i>
      </div>
<!--      <div v-if="!showRightIcon">-->
<!--         <i  class="el-icon-d-arrow-right"></i>-->
<!--      </div>-->
<!--      <span class=""  v-if="showRightIcon">右标</span>-->
<!--      <span  v-if="!showRightIcon">右标1</span>-->

<!--      <img src="@/assets/img/arrows_right.png" alt="" class='right-icon hovercli' v-if="showRightIcon">-->
<!--      <img src="@/assets/img/ash_arrows_right.png" alt="" class='right-icon ' v-if="!showRightIcon">-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftRightSwiperScroll',
  props: {
    swiperList: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      showRightIcon: false, // 是否显示右箭头
      swiperScrollWidth: 0, // 盒子的宽度
      swiperScrollContentWidth: 0, // 内容的宽度
      maxClickNum: 0, // 最大点击次数
      lastLeft: 0, // 上次滑动距离
      clickNum: 0, // 点击次数
      childrenList: [], // 传进来的子元素
      is_clickNum: true
    };
  },
  computed: {
    showLeftIcon () {
      return this.clickNum > 0;
    }
  },
  mounted () {
    // 获取 HTMLCollection 转为 数组
    this.childrenList = [...this.$refs.swiperScrollContent.children];
    // 盒子的宽度
    this.swiperScrollWidth = this.$refs.swiperScroll.getBoundingClientRect().width;
    // 内容的宽度
    this.swiperScrollContentWidth = this.$refs.swiperScrollContent.getBoundingClientRect().width;
    // 比较盒子的宽度,跟内容的宽度：判断是否需要展示右边的按钮
    if (this.swiperScrollWidth < this.swiperScrollContentWidth) {
      this.showRightIcon = true;
    }
  },
  methods: {
    // 点击右箭头（左侧滚动）
    handleRightClick () {
      // 如果点击次数小于数组长度-1时，执行左滑动效果。
      console.log(this.clickNum + '--' + this.childrenList.length);
      if (this.clickNum < this.childrenList.length && this.is_clickNum) {
        // 获取当前元素宽度
        const width =
            this.childrenList[this.clickNum].getBoundingClientRect().width; // 获取最后一个元素距离左侧的距离
        const lastItemOffsetLeft =
            this.childrenList[this.childrenList.length - 1].offsetLeft;
        // 获取最后一个元素宽度
        const lastWidth =
            this.childrenList[
              this.childrenList.length - 1
            ].getBoundingClientRect().width; // 获取可视区域宽度
        const lookWidth = this.$refs.swiperScroll.clientWidth; //  console.log((lastItemOffsetLeft - (lastWidth + lookWidth)) < this.lastLeft)
        const num = -((lastItemOffsetLeft - lookWidth) + lastWidth);
        const num1 = this.lastLeft;
        console.log(num);
        console.log(num1);
        if (num > num1) {
          this.showRightIcon = false;
          this.is_clickNum = false;
          return;
        }
        // 如果最后一个元素距离左侧的距离+自身的宽度大于可视距离，表示最后一个元素没有出现，执行滚动效果
        if (lastItemOffsetLeft + lastWidth > lookWidth) {
          // 滚动距离（元素的magin-left值） = 负的它自己的长度 + 上一次滑动的距离
          this.$refs.swiperScrollContent.style.left = `${
              -width + this.lastLeft
          }px`;
          console.log(width);
          this.lastLeft = -(width + 1) + this.lastLeft;
          // 点击次数+1
          console.log('我進來了');
          this.clickNum++;
          // 记录到最后一个元素出现在可视区域时，点击次数的最大值。用于后面点击左侧箭头时判断右侧箭头的显示
          this.maxClickNum = this.clickNum;
        }
      }
    },
    // 点击左箭头（右侧滚动）
    handleLeftClick () {
      // 当点击次数大于0时才触发，这样当点击次数clickNum等于1的到时候，clickNum--等于0.根据计算属性的判断会隐藏掉左箭头
      if (this.clickNum > 0) {
        this.is_clickNum = true;
        // 获取当前元素宽度
        const width =
            this.childrenList[this.clickNum - 1].getBoundingClientRect().width;
        // 公示：滚动距离（元素的magin-left值） = 它自己的长度 + 上一次滑动的距离
        this.$refs.swiperScrollContent.style.left = `${
            this.lastLeft + width
        }px`;
        this.lastLeft = width + this.lastLeft;
        // 点击次数-1
        this.clickNum--;
        // 如果点击次数小于最大点击次数，说明最后一个元素已经不在可是区域内了，显示右箭头
        if (this.clickNum < this.maxClickNum) {
          this.showRightIcon = true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.left-right-swiper-scroll-box {
  width: 100%;
  overflow: hidden;
  transition: all 0.3s;
  display: flex;
  //padding: 0 60px;
  box-sizing: border-box;

  .scroll-icon {
    //width: 100%;
    height: 22px;
    z-index: 9;
    display: inline-block;
  }

  .right-icon {
    width: 20px;
    position: absolute;
    right: 0;
    div {
      width: 20px;
      height: 22px;
      background-color: #bae7ff;
      color: black;
      border: 1px solid;
    }
  }

  .left-icon {
    width: 20px;
    left: 0;
    position: absolute;
    div {
      width: 20px;
      height: 22px;
      background-color: #bae7ff;
      color: black;
      border: 1px solid;
    }
  }

  .swiper-scroll-content {
    position: relative;
    white-space: nowrap;
    //overflow: hidden;
    transition: all 0.3s;
    display: flex;
  }
}
</style>
