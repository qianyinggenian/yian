<template>
  <div>
    <p>测试</p>
    <p>值： {{ value }}</p>
    <p>
      多选-禁选
      <proxySelect
          multiple
          disabled
          v-model="value"
          :options="options"
          clearable
          @clear="handleClear">
      </proxySelect>
    </p>
    <p>
      多选-可选
      <proxySelect
          ref="11"
          multiple
          v-model="value"
          :options="options"
          clearable
          @clear="handleClear">
      </proxySelect>
    </p>
    <p>
      单选-可选
      <proxySelect
          ref="11"
          v-model="value1"
          :options="options"
          clearable
          @clear="handleClear">
      </proxySelect>
    </p>
    <p>
      单选-禁选
      <proxySelect
          ref="11"
          :disabled="true"
          v-model="value1"
          :options="options"
          clearable
          @clear="handleClear">
      </proxySelect>
    </p>
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
      value1: '选项2',
      value: ['选项2', '选项1'],
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

<style lang="scss" scoped>
.el-select {
  width: 600px;
}

p {
  margin-top: 10px;
}
</style>
