<template>
  <layout :is-show-left="false">
    <div slot="right">
      <!--      <proxyTable ref="proxyTable">-->
      <!--        <template v-slot:operation="{row}">-->
      <!--          {{ row }}-->
      <!--        </template>-->
      <!--      </proxyTable>-->
      <proxy-table/>
    </div>
  </layout>
</template>

<script>
// import proxyTable from '@/components/proxyTable/index.vue';
import proxyTable from '@/components/proxyTable/demo.vue';

export default {
  name: 'index',
  components: {
    proxyTable
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
