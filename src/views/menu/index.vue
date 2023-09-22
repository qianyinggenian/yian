<template>
  <layout>
    <div slot="left">
      <ztree
          :nodes="nodes"
          :setting="setting"
          @click="handleClick"
          ref="ztree"
      />
    </div>
    <div slot="right">
      <add-edit ref="addEdit"/>
    </div>
  </layout>
</template>

<script>
import { menuTree } from '@/common/data';
import ztree from '@/components/ztree';
import AddEdit from './comp/add-edit.vue';

export default {
  name: 'index',
  components: {
    AddEdit,
    ztree
  },
  data () {
    return {
      nodes: menuTree,
      setting: {
        check: {
          enable: false
        }
      },
      treeNode: {}
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
  },
  methods: {
    /**
     * @Description 点击触发
     * @author qianyinggenian
     * @date 2023/9/22
     */
    handleClick (treeNode) {
      this.$nextTick(() => {
        this.$refs.addEdit.getInfo(treeNode);
      });
    }
  }
};
</script>

<style scoped>

</style>
