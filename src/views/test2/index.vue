
<template>
<div class="test2">
  <div class="item" v-for="item in 20" :key="item"></div>
</div>
</template>
<script>
export default {
  components: {},
  data () {
    return {};
  },
  computed: {},
  watch: {},
  created () {
    console.log(1111);
  },
  mounted () {
    console.log(222);
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.item {
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
  background: #4ade80;
}
/* 隐藏默认的滚动条 */
.test2 {
  overflow-y: scroll;
}

/* 定制滚动条整体外观 */
::-webkit-scrollbar {
  width: 8px; /* 滚动条宽度 */
}

/* 定制滚动条轨道（滚动条本身）的背景 */
::-webkit-scrollbar-track {
  background-color: #f0f0f0; /* 背景颜色 */
}

/* 定制滚动条滑块（当前滚动位置）的背景 */
::-webkit-scrollbar-thumb {
  background-color: #999; /* 滑块颜色 */
  border-radius: 4px; /* 滑块圆角半径 */
  background-clip: padding-box; /* 让圆角不超出滚动条区域 */
}

/* 当鼠标悬停在滚动条上时，改变滑块的颜色 */
::-webkit-scrollbar-thumb:hover {
  background-color: #666; /* 悬浮时滑块颜色 */
}
</style>
