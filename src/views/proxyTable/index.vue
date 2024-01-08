<template>
  <layout :is-show-left="false">
    <div slot="right">
      <proxy-table/>
      <proxyDialog></proxyDialog>
    </div>
  </layout>
</template>

<script>
// import proxyTable from '@/components/proxyTable/index.vue';
import proxyTable from '@/components/proxyTable/demo.vue';
import proxyDialog from '@/components/proxyDialog';

export default {
  name: 'index',
  components: {
    proxyTable,
    proxyDialog
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

<style lang="scss" scoped>

</style>
