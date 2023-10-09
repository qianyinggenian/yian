<template>
  <!--  封装后的使用demo-->
  <proxySelect
      multiple
      v-model="value"
      :options="options"
      clearable>
  </proxySelect>
</template>

<script>
import proxySelect from './index.vue';

export default {
  name: 'dome',
  components: {
    proxySelect
  },
  data () {
    return {

      value: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    };
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
