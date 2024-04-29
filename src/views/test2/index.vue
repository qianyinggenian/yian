
<template>
  <div>

    <div class="test2">
      <div class="left">
        <el-button @click="add">新增</el-button>
        <el-button @click="subtract">删除</el-button>
        <div class="item" v-for="item in count" :key="item"></div>
      </div>
      <div class="right">

        <div class="item2" v-for="item in 50" :key="item"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      count: 2
    };
  },
  mounted () {},
  methods: {
    add () {
      this.count += 1;
    },
    subtract () {
      if (this.count > 0) {
        this.count -= 1;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.item {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  background: #4ade80;
  &:last-child {
    margin-bottom: 0;
  }
}
.item2 {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  background: #4fcbf0;
  &:last-child {
    margin-bottom: 0;
  }
}
/* 隐藏默认的滚动条 */
.test2 {
  position: relative;
  .left {
    width: calc(100% - 200px - 16px);
    margin-right: 16px;
  }
  .right {
    overflow-y: auto;
    width: 200px;
    //background: #4fcbf0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
  }
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
