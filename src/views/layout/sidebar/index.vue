<template>
  <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <submenu
        ref="submenu"
        v-for="menu in authRoutes"
        :key="menu.path"
        :base-path="menu.path"
        :menu="menu"></submenu>
  </el-menu>
</template>

<script>
import submenu from './submenu.vue';

export default {
  name: 'indexView',
  components: {
    submenu
  },
  data () {
    return {
      authRoutes: [
        {
          path: '/test',
          meta: {
            title: '测试1'
          },
          id: '测试1',
          children: [
            {
              path: '/test1-1',
              id: '测试1-1',
              meta: {
                title: '测试1-1'
              }
            }
          ]
        },
        {
          path: '/test2',
          id: '测试2',
          meta: {
            title: '测试2'
          }
        },
        {
          path: '/test3',
          id: '测试3',
          meta: {
            title: '测试3'
          }
        },
        {
          path: '/test4',
          id: '测试4',
          meta: {
            title: '测试4'
          }
        }
      ]
    };
  },
  props: {},
  watch: {},
  computed: {
    activeMenu () {
      console.log('$route', this.$route);
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  },
  mounted () {
    console.log('$route', this.$route);
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      const a = 1;
      console.log(a);
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
</style>
