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
          unique-opened
          menu-trigger="hover"
          @select="handleSelect"
      >
        <!-- 使用 MenuNode 组件渲染菜单项 -->
        <template  v-for="item in menuItems">
          <el-menu-item class="first-menu" :index="item.id" :key="item.id"  v-if="!item.children || (item.children && item.children.length <= 0)">
            <span >
              {{item.name }}
            </span>
          </el-menu-item>
          <el-submenu :index="item.id" class="first-submenu-menu" popper-class="custom-menu-popper" :key="`1-${item.id}`" v-else>
            <template v-slot:title>
              {{ item.name }}
            </template>
            <MenuNode
                :activeIndex="activeIndex"
                :is-nest="true"
                customClass="second-menu"
                :routes="item.children"
                class="nest-menu"
            ></MenuNode>
          </el-submenu>
        </template>
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
import MenuNode from './MenuNode.vue';

export default {
  name: 'ScrollableElMenu',
  components: {
    MenuNode
  },
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
      buttonWidth: 32,
      expandedSubmenu: null
    };
  },
  computed: {
    showLeftButton () {
      return this.scrollPosition > 0;
    },
    showRightButton () {
      return this.scrollPosition < this.maxScroll;
    },
    visibleWidth () {
      const menuWrapper = this.$refs.menuWrapper;
      return menuWrapper ? menuWrapper.clientWidth : 0;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.updateScrollState();
      window.addEventListener('resize', this.handleResize);

      // 监听子菜单展开/收起事件
      this.$el.addEventListener('mouseenter', this.onMenuHover);
      this.$el.addEventListener('mouseleave', this.onMenuLeave);
    });
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize);
    this.$el.removeEventListener('mouseenter', this.onMenuHover);
    this.$el.removeEventListener('mouseleave', this.onMenuLeave);
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

      // 获取最后一个菜单项
      const lastItem = menuEl.lastElementChild;
      if (!lastItem) {
        this.maxScroll = 0;
        return;
      }

      // 计算最大滚动距离
      const lastItemRight = lastItem.offsetLeft + lastItem.offsetWidth;
      const effectiveVisibleWidth = this.visibleWidth - this.buttonWidth;
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
      this.scrollPosition = Math.max(0, this.scrollPosition - this.scrollStep);
      this.applyScrollPosition();
    },
    scrollRight () {
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
    },
    onMenuHover (event) {
      const submenuEl = event.target.closest('.el-submenu');
      if (submenuEl) {
        this.expandedSubmenu = submenuEl;
        this.$nextTick(() => this.updateScrollState());
      }
    },
    onMenuLeave () {
      this.expandedSubmenu = null;
      this.$nextTick(() => this.updateScrollState());
    }
  }
};
</script>

<style scoped lang="scss">
$color-white: #fff;
.scrollable-menu-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.menu-wrapper {
  flex: 1;
  overflow: hidden;
  //margin: 0 8px;
  white-space: nowrap;

}
$border-radius: 4px;
$menu-height: 48px;
.first-menu {

  margin-right:10px;
  font-size: 18px;
  height: $menu-height !important;
  line-height: $menu-height !important;
  border-radius: $border-radius;
  &:hover {
    border-radius: $border-radius;
    background: #0051FF !important;
    color: $color-white !important;
    font-weight: bold !important;
  }
  &.is-active {
    background: #0051FF !important;
    color: $color-white !important;
    font-weight: bold !important;
  }
}
.first-submenu-menu {
  margin-right:10px;
  &:last-child {
    margin-right: 0;
  }
  ::v-deep .el-submenu__title {
    border-radius:$border-radius;
    font-size: 18px;
    height: $menu-height !important;
    line-height: $menu-height !important;
    &:hover {
      border-radius: $border-radius;
      background: #0051FF;
      color: $color-white !important;
      font-weight: bold !important;
      i {
        color: $color-white !important;
        font-weight: bold !important;
      }
    }
  }
  &.el-submenu.is-active ::v-deep  .el-submenu__title {
    background: #0051FF !important;
    color: $color-white !important;
    font-weight: bold !important;
    border-bottom-color: transparent !important;
    i {
      color: $color-white !important;
      font-weight: bold !important;
    }
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
li:not(:nth-last-of-type(1)):before {
  border-bottom: 0 !important;
}
.scroll-btn {
  background-color: transparent;
  border: none;
  color: #909399;
  cursor: pointer;
  padding: 8px;
  z-index: 10;
  transition: color 0.2s;
  min-width: 32px;
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

.el-menu--horizontal > .el-menu-item,
.el-menu--horizontal > .el-submenu {
  float: none !important;
  display: inline-block !important;
}

/* 调整下拉菜单样式 */
.el-submenu .el-menu {
  min-width: 100%;
}

/* 确保多级子菜单正确定位 */
.el-submenu .el-submenu__popper {
  //left: 100% !important;
  //top: 0 !important;
  //margin-left: -1px;
}
</style>
<style lang="scss">
$bgColor: rgba(0, 81, 255, 0.2);
.custom-menu-popper {
  li+li{
    margin-top: 5px;
  }
  li {

    height: 48px !important;
    line-height: 48px !important;
    font-size: 20px !important;
    >.el-submenu__title {
      height: 48px !important;
      line-height: 48px !important;
      font-size: 20px !important;
    }
  }
  .el-menu-item.is-active {
    background: $bgColor !important;
    color: #0051FF !important;
  }
  .el-submenu.is-active {
    >.el-submenu__title {
      background: $bgColor !important;
      color: #0051FF !important;
    }
  }
  .el-menu-item.second-menu,.el-submenu.second-menu {
    height: 48px !important;
    line-height: 48px !important;
  }
  .el-menu-item {
    &:hover {
      background: $bgColor !important;
    }
  }
  .el-submenu.second-menu {
    >.el-submenu__title {
      height: 48px !important;
      line-height: 48px !important;
      &:hover {
        background: $bgColor !important;
      }
    }
  }
}
</style>
