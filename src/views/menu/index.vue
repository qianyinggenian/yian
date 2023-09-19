<template>
  <layout>
    <div slot="left">
      <ztree ref="ztree"></ztree>
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
  methods: {}
};
</script>

<style scoped>

</style>
