
<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <el-menu-item :class="customClass" :index="item.id" :key="item.id"  v-if="!item.children || (item.children && item.children.length <= 0)">
        <template  #title>
          <div class="ct-el-menu-content">
            <div class="icon"  v-if="!isNext">
              <svg-icon v-if="item.svg" fill="#0051FF" :fontSize="40" :iconClass="item.svg"></svg-icon>
              <svg-icon v-else fill="#0051FF" :fontSize="40" iconClass="默认图标"></svg-icon>
            </div>
            <div class="label">{{item.name }}</div>
          </div>
        </template>
      </el-menu-item>
      <el-submenu  :class="customClass" :index="item.id" :key="`1-${item.id}`" v-else>
        <template #title>
          <div class="ct-el-submenu-content">
            <div class="icon" v-if="!isNext">
              <svg-icon v-if="item.svg" fill="#0051FF" :fontSize="40" :iconClass="item.svg"></svg-icon>
              <svg-icon v-else fill="#0051FF" :fontSize="40" iconClass="默认图标"></svg-icon>
            </div>
            <div class="label"> {{ item.name }}</div>
          </div>
        </template>
        <menu-node
            :activeIndex="activeIndex"
            :is-next="true"
            :routes="item.children"
            class="nest-menu"
        ></menu-node>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuNode',
  components: {
  },
  props: {
    routes: {
      type: Array
    },
    isNext: {
      type: Boolean,
      default: false
    },
    activeIndex: {
      type: String
    },
    isCollapse: {
      // 折叠时隐藏名称
      type: Boolean,
      default: false
    },
    customClass: {
      type: String
    }
  },
  watch: {
    activeIndex: {
      handler (val) {
        // console.log(val);
      }
    }
  },
  methods: {
    hasActiveChild (item) {
      let active = 0;
      const probe = (it) => {
        for (const child of it.children) {
          if (child.path === this.activeIndex) active = 1;
          else if (child.children) {
            probe(child);
          }
        }
      };
      probe(item);
      return active;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">

.ct-el-submenu-content, .ct-el-menu-content {
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 25px;
  .icon {
    width: 40px;
    height: 100%;
    margin-right: 8px;
    display: inline-flex;
    align-items: center;
  }
}
</style>
