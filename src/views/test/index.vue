<template>
  <div>
    <p>测试</p>
    <p>值： {{ value }}</p>
    <proxySelect
        multiple
        v-model="value"
        :options="options"
        clearable
        @clear="handleClear">
    </proxySelect>
  </div>
</template>

<script>
import proxySelect from '@/components/proxySelect/index.vue';

export default {
  name: 'index',
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
  methods: {
    handleClear () {
      console.log(111111);
    }
  }
};
</script>

<style scoped>

</style>
