<template>
  <layout>
    <div slot="left">
      <ztree
          :nodes="nodes"
          :setting="setting"
          ref="ztree"
      />
    </div>
    <div slot="right">
      <add-edit ref="addEdit"/>
    </div>
  </layout>
</template>

<script>
import { menuData } from '@/common/data';
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
      nodes: menuData,
      setting: {
        check: {
          enable: false
        }
      }
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
  },
  methods: {
    /**
     * @Description
     * @author wangkangzhang
     * @date 2023/9/20
     */
    diyBeforeClick (treeId, treeNode, clickFlag) {
      console.log();
      return treeNode.text === '研发部-技术部';
    }
  }
};
</script>

<style scoped>

</style>
