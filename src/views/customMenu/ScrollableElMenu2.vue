<template>
  <div class="scrollable-menu-container">
    <!-- 左滚动按钮 -->
    <button
        v-show="showLeftButton"
        class="scroll-btn scroll-left"
        @click="scrollLeft"
    >
      <i class="el-icon-arrow-left"></i>
    </button>

    <!-- 菜单容器 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <el-menu
          :class="menuClass"
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleSelect"
      >
        <el-menu-item
            v-for="item in menuItems"
            :key="item.index"
            :index="item.index"
        >
          {{ item.label }}
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右滚动按钮 -->
    <button
        v-show="showRightButton"
        class="scroll-btn scroll-right"
        @click="scrollRight"
    >
      <i class="el-icon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ScrollableElMenu',
  props: {
    menuItems: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: String,
      default: ''
    },
    menuClass: {
      type: String,
      default: ''
    },
    scrollStep: {
      type: Number,
      default: 200
    },
    animationDuration: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      scrollPosition: 0,
      maxScroll: 0,
      buttonWidth: 32 // 按钮宽度，用于计算可视区域
    };
  },
  computed: {
    showLeftButton () {
      return this.scrollPosition > 0;
    },
    showRightButton () {
      return this.scrollPosition < this.maxScroll;
    },
    // 计算实际可视区域宽度（减去按钮可能遮挡的部分）
    visibleWidth () {
      const menuWrapper = this.$refs.menuWrapper;
      return menuWrapper ? menuWrapper.clientWidth : 0;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.updateScrollState();
      window.addEventListener('resize', this.handleResize);
    });
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    menuItems: {
      handler () {
        this.$nextTick(() => {
          this.updateScrollState();
        });
      },
      deep: true
    }
  },
  methods: {
    updateScrollState () {
      const menuWrapper = this.$refs.menuWrapper;
      if (!menuWrapper) return;

      const menuEl = menuWrapper.querySelector('.el-menu');
      if (!menuEl) return;

      // 获取最后一个菜单项22
      const lastItem = menuEl.lastElementChild;
      if (!lastItem) {
        this.maxScroll = 0;
        return;
      }

      // 计算最后一个菜单项的右边界
      const lastItemRight = lastItem.offsetLeft + lastItem.offsetWidth;

      // 计算可视区域宽度（减去按钮可能遮挡的部分）
      const effectiveVisibleWidth = this.visibleWidth - this.buttonWidth;

      // 计算最大滚动距离，确保最后一个菜单项完全可见
      this.maxScroll = Math.max(0, lastItemRight - effectiveVisibleWidth);

      // 确保当前滚动位置不超过最大滚动距离
      if (this.scrollPosition > this.maxScroll) {
        this.scrollPosition = this.maxScroll;
        this.applyScrollPosition();
      }
    },
    applyScrollPosition () {
      const menuWrapper = this.$refs.menuWrapper;
      if (!menuWrapper) return;

      this.smoothScrollTo(menuWrapper, this.scrollPosition);
    },
    smoothScrollTo (element, target) {
      // 平滑滚动函数
      const start = element.scrollLeft;
      const distance = target - start;
      const duration = this.animationDuration;
      let startTime = null;

      const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      const animateScroll = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        const easePercentage = easeInOutQuad(percentage);

        element.scrollLeft = start + distance * easePercentage;

        if (percentage < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    },
    scrollLeft () {
      // 向左滚动一步
      this.scrollPosition = Math.max(0, this.scrollPosition - this.scrollStep);
      this.applyScrollPosition();
    },
    scrollRight () {
      // 向右滚动一步，确保最后一项完全可见
      const menuWrapper = this.$refs.menuWrapper;
      const menuEl = menuWrapper.querySelector('.el-menu');
      const visibleWidth = this.visibleWidth;
      const currentScroll = menuWrapper.scrollLeft;
      const visibleRight = currentScroll + visibleWidth;

      // 找到第一个不完全可见的菜单项
      let nextItem = null;
      for (let i = 0; i < menuEl.children.length; i++) {
        const item = menuEl.children[i];
        const itemRight = item.offsetLeft + item.offsetWidth;
        if (itemRight > visibleRight) {
          nextItem = item;
          break;
        }
      }

      if (nextItem) {
        // 计算滚动到该菜单项完全可见的位置
        const targetScroll = nextItem.offsetLeft - (visibleWidth - nextItem.offsetWidth);
        this.scrollPosition = Math.min(this.maxScroll, targetScroll);
      } else {
        // 如果没有找到，使用默认步长
        this.scrollPosition = Math.min(
          this.maxScroll,
          this.scrollPosition + this.scrollStep
        );
      }

      this.applyScrollPosition();
    },
    handleResize () {
      this.updateScrollState();
    },
    handleSelect (index, indexPath) {
      this.$emit('select', index, indexPath);
    }
  }
};
</script>

<style scoped>
.scrollable-menu-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.menu-wrapper {
  flex: 1;
  overflow: hidden;
  margin: 0 8px;
  white-space: nowrap;
}

.scroll-btn {
  background-color: transparent;
  border: none;
  color: #909399;
  cursor: pointer;
  padding: 8px;
  z-index: 10;
  transition: color 0.2s;
  min-width: 32px; /* 设置按钮最小宽度，用于计算 */
}

.scroll-btn:hover {
  color: #409eff;
}

.el-menu--horizontal {
  white-space: nowrap;
  overflow: visible !important;
  display: inline-block;
  width: auto;
}

.el-menu--horizontal > .el-menu-item {
  float: none !important;
  display: inline-block !important;
}
</style>
