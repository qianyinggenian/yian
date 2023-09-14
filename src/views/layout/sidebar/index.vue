<template>
  <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
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
import { config } from '@/router/config';

export default {
  name: 'indexView',
  components: {
    submenu
  },
  data () {
    return {
      authRoutes: config
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
