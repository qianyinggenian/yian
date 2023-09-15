<template>
  <layout>
    <div slot="left">
      <tree ref="tree"></tree>
    </div>
    <div slot="right"></div>
  </layout>
</template>

<script>
import tree from '@/components/el-tree/index.vue';

export default {
  name: 'index',
  components: {
    tree
  },
  data () {
    return {};
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
  },
  methods: {}
};
</script>

<style scoped>

</style>
