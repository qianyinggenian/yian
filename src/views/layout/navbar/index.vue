<template>
  <div ref="swiperScroll" class="navbar-container">
    <i v-if="isShowIcon" class="el-icon-d-arrow-left direction" @click="scrollTab('left')"></i>
    <ul class="nav" ref="swiperScrollContent">
      <li class="nav-item"
          :class="{active: activePath === '/home'}"
          @click="handleClickMenu({label: '首页',path: '/home'})"
          @contextmenu.prevent.stop="openMenu($event,{label: '首页',path: '/home'})">
        <span>首页</span>
      </li>
      <li class="nav-item"
          v-for="item in visibleTabs"
          :ref="`li${item.name}`"
          :key="item.path"
          :class="{active: activePath === item.path}"
          @click="handleClickMenu(item,`li${item.name}`)"
          @contextmenu.prevent.stop="openMenu($event,item)">
        <span>
          {{ item.label }}<i class="el-icon-circle-close" @click="closeFn(item)"></i>
        </span>
      </li>
    </ul>
    <i v-if="isShowIcon" class="el-icon-d-arrow-right direction" @click="scrollTab('right')"></i>
    <el-card
        v-show="visible"
        class="contextmenu"
        :style="{
            top: `${top}px`,
            left: `${left}px`
         }"
        shadow="always">
      <div class="contextmenu-item" v-if="selectedTag.path !== '/home'" @click="closeFn(selectedTag)">关闭</div>
      <div class="contextmenu-item" @click="closeOther(selectedTag)">关闭其他</div>
      <div class="contextmenu-item" @click="closeAll(selectedTag)">关闭所有</div>
      <div class="contextmenu-item" @click="closeRight(selectedTag)">关闭右侧</div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'index',
  components: {},
  data () {
    return {
      top: 0,
      left: 0,
      visibleTabs: [],
      activeTab: '首页',
      activePath: '/home',
      visible: false,
      selectedTag: {},
      ulWidth: 0,
      liWidth: 0,
      offsetCount: 0,
      isShowIcon: false,
      showRightIcon: false, // 是否显示右箭头
      swiperScrollWidth: 0, // 盒子的宽度
      swiperScrollContentWidth: 0, // 内容的宽度
      maxClickNum: 0, // 最大点击次数
      lastLeft: 0, // 上次滑动距离
      clickNum: 0, // 点击次数
      childrenList: []
    };
  },
  props: {},
  watch: {
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
    $route: {
      handler (newVal) {
        this.addTags(newVal);
      },
      immediate: true
    },
    tabs: {
      handler (newVal) {
        this.visibleTabs = newVal;
        sessionStorage.setItem('tabs', JSON.stringify(newVal));
        this.$nextTick(() => {
          this.initWidth();
        });
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('navbar', ['tabs'])
  },
  mounted () {

  },
  methods: {
    initWidth () {
      // 获取 HTMLCollection 转为 数组
      this.childrenList = [...this.$refs.swiperScrollContent.children];
      // 盒子的宽度
      this.ulWidth = this.$refs.swiperScrollContent.getBoundingClientRect().width;
      // 内容的宽度
      this.liWidth = 0;
      this.childrenList.forEach(value => {
        this.liWidth += value.clientWidth;
      });
      this.isShowIcon = this.liWidth > this.ulWidth;
      if (this.isShowIcon) {
        this.scrollTab('right');
      }
    },
    scrollTab (direction) {
      if (this.liWidth < this.ulWidth) {
        return false;
      }
      let distance = this.offsetCount * 100;

      if (direction === 'left') {
        if (this.offsetCount > 0) {
          this.offsetCount = this.offsetCount - 1;
        }
      } else if (direction === 'right') {
        if ((this.ulWidth + distance) < this.liWidth) {
          this.offsetCount = this.offsetCount + 1;
        }
      }
      distance = this.offsetCount * 100;
      this.$nextTick(() => {
        this.$refs.swiperScrollContent.scrollTo({
          left: distance,
          behavior: 'smooth'
        });
      });
    },
    /**
     * @Description 添加
     * @author wangkangzhang
     * @date 2023/9/15
     */
    addTags (newVal) {
      const { path, name, meta } = newVal;
      const params = {
        path,
        name,
        meta: meta || {}
      };
      if (path !== '/home') {
        this.$_store.commit('navbar/SET_ADD_TAB', params);
      }
      const index = this.visibleTabs.findIndex(value => value.path === path);
      if (index !== -1) {
        this.$nextTick(() => {
          this.$refs[`li${name}`][0].scrollIntoView();
        });
      }
      this.activePath = path;
    },
    /**
     * @Description 关闭右键菜单
     * @author wangkangzhang
     * @date 2023/9/15
     */
    closeMenu () {
      this.visible = false;
    },
    /**
     * @Description 显示右键菜单
     * @author wangkangzhang
     * @date 2023/9/15
     */
    openMenu (e, item) {
      this.top = e.offsetY + 10;
      this.left = e.pageX - 200;
      this.visible = true;// 在这里控制右键菜单的打开
      this.selectedTag = item;
    },
    /**
     * @Description 点击触发
     * @author wangkangzhang
     * @date 2023/9/15
     */
    handleClickMenu (item, ref) {
      if (this.$route.path !== item.path) {
        this.$nextTick(() => {
          this.$router.push(item.path);
        });
      }
      if (ref) {
        this.$nextTick(() => {
          this.$refs[ref][0].scrollIntoView();
        });
      }
    },
    /**
     * @Description 关闭
     * @author qianyinggenian
     * @date 2023/9/15
     */
    closeFn (item) {
      if (this.$route.path === item.path) {
        // const length = this.visibleTabs.length;
        const index = this.visibleTabs.findIndex(value => value.path === item.path);
        if (index !== -1) {
          if (index === 0) {
            this.$router.push('/home');
          } else {
            const result = this.visibleTabs[index - 1];
            this.$router.push(result.path);
          }
        }
      }
      this.$_store.commit('navbar/SET_CLOSE_TAB', item);
    },
    /**
     * @Description 关闭其他
     * @author qianyinggenian
     * @date 2023/9/15
     */
    closeOther (item) {
      if (this.$route.path !== item.path) {
        this.$router.push(item.path);
      }
      this.$_store.commit('navbar/SET_CLOSE_OTHER_TABS', item);
    },
    /**
     * @Description 关闭所有
     * @author qianyinggenian
     * @date 2023/9/15
     */
    closeAll (item) {
      if (item.path !== '/home' && this.$route.path !== '/home') {
        this.$router.push('/home');
      }
      this.$_store.commit('navbar/SET_CLOSE_ALL_TABS', {});
    },
    /**
     * @Description 关闭右侧
     * @author qianyinggenian
     * @date 2023/9/21
     */
    closeRight (item) {
      const activePath = this.$route.path;
      if (item.path !== '/home') {
        const index = this.visibleTabs.findIndex(value => value.path === item.path);
        const activeIndex = this.visibleTabs.findIndex(value => value.path === activePath);
        const len = this.visibleTabs.length;
        if (index !== -1) {
          if (index < len - 1) {
            this.$_store.commit('navbar/SET_CLOSE_RIGHT', index);
          }
          if (activeIndex > index && item.path !== activePath) {
            this.$router.push(item.path);
          }
        }
      } else {
        if (item.path !== '/home' && activePath !== '/home') {
          this.$router.push('/home');
        }
        this.$_store.commit('navbar/SET_CLOSE_ALL_TABS', {});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-container {
  position: relative;
  display: flex;
  align-items: center;
  background: rgb(26, 16, 122);
  background: linear-gradient(90deg, rgba(26, 16, 122, 1) 7%, rgba(161, 11, 130, 1) 46%, rgba(0, 255, 248, 1) 100%);

  > i {
    color: white;
    cursor: pointer;
    margin: 0 5px;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .contextmenu {
    position: absolute;
    z-index: 3000;

    .contextmenu-item {
      cursor: pointer;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      box-sizing: border-box;
      font-size: var(--font-size-16);

      &:hover {
        color: #ffffff;
        background-color: #3a8ee6;
      }
    }
  }

  ::v-deep .el-card__body {
    padding: 0;
  }

  ul {
    list-style: none;
  }

  .nav {
    display: flex;
    height: var(--tabs-height);
    overflow: hidden;
    white-space: nowrap;
    //background: rgb(26, 16, 122);
    //background: linear-gradient(90deg, rgba(26, 16, 122, 1) 7%, rgba(161, 11, 130, 1) 46%, rgba(0, 255, 248, 1) 100%);
  }

  .nav-item {
    display: inline-block;
    //float: left;
    //display: flex;
    //flex: 0 1 auto;
    //max-width: 160px;
    min-width: 80px;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    //margin-left: -1px;

    &::before, &::after {
      position: absolute;
      top: 50%;
      height: 16px;
      border-left: 1px solid rgba(255, 255, 255, .2);
      transform: translateY(-50%);
      content: "";
    }

    &::before {
      right: 0;
    }

    &::after {
      left: 0;
    }

    span {
      //display: block;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      line-height: var(--tabs-height);
      color: var(--tabs-text-color);
      border-radius: 8px 8px 0 0;
      position: relative;
      z-index: 1;
      box-sizing: border-box;

      &::before, &::after {
        position: absolute;
        bottom: 0;
        width: 8px;
        height: 8px;
        content: "";
        pointer-events: none;
      }

      &::before {
        left: -8px;
      }

      &::after {
        right: -8px;
      }

      i {
        margin-left: 8px;
        display: none;

        &:hover {
          color: #156db9;
        }
      }

      &:hover {
        i {
          display: block;
        }
      }
    }
  }

  .nav-item.active::before,
  .nav-item.active::after {
    opacity: 0;
  }

  .nav-item.active span {
    background-color: var(--tabs-active-bgcolor);
    z-index: 3;
  }

  .nav-item.active span::before {
    background: radial-gradient(circle at left top, transparent, transparent var(--tabs-gradient-divider), var(--tabs-active-bgcolor) var(--tabs-gradient-divider), var(--tabs-active-bgcolor));
  }

  .nav-item.active span::after {
    background: radial-gradient(circle at right top, transparent, transparent var(--tabs-gradient-divider), var(--tabs-active-bgcolor) var(--tabs-gradient-divider), var(--tabs-active-bgcolor));
  }

  .nav-item:not(.active):hover {
    z-index: 2;
  }

  .nav-item:not(.active):hover::before,
  .nav-item:not(.active):hover::after {
    opacity: 0;
  }

  .nav-item:not(.active):hover span {
    background-color: var(--tabs-hover-bgcolor);
  }

  .nav-item:not(.active):hover span::before {
    background: radial-gradient(circle at left top, transparent, transparent var(--tabs-gradient-divider), var(--tabs-hover-bgcolor) var(--tabs-gradient-divider), var(--tabs-hover-bgcolor));
  }

  .nav-item:not(.active):hover span::after {
    background: radial-gradient(circle at right top, transparent, transparent var(--tabs-gradient-divider), var(--tabs-hover-bgcolor) var(--tabs-gradient-divider), var(--tabs-hover-bgcolor));
  }

}
</style>
