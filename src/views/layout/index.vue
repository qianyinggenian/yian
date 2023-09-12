<template>
  <div class="layout-container">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <svg-icon icon-class="return"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './Header/index.vue';
export default {
  name: "indexView",
  components: {
    Header
  },
  methods:{
   init(){
     const a=1;
     console.log(a);
   }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
</style>
