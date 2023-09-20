<template>
  <layout>
    <div slot="left">
      <ztree
          ref="ztree"
      />
    </div>
    <div slot="right"></div>
  </layout>
</template>

<script>
import ztree from '@/components/ztree';

export default {
  name: 'index',
  components: {
    ztree
  },
  data () {
    return {};
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
