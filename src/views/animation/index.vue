<template>
  <layout :is-show-left="false">
    <div slot="right" class="right">
      <div class="top">
        <div class="test">
          <el-image :src="randomUrl"></el-image>
        </div>
        <div class="mix-blend-mode">
          <span class="text">透明文字效果</span>
        </div>
      </div>

      <div class="adv">
        <span>这是个左右滚动,鼠标覆盖暂停</span>
      </div>
    </div>
  </layout>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      randomUrl: require('../../assets/45.jpg')
    };
  }
};
</script>

<style lang="scss" scoped>
$url: url(../../assets/45.jpg);
@mixin sizeFn {
  width: 300px;
  height: 300px;
}

@mixin flexFn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.top {
  display: flex;
  flex-wrap: wrap;
  flex-flow: row !important;

  > div {
    margin-right: 20px;
  }

  .test {
    @include sizeFn;
    margin-top: 10px;
    margin-left: 10px;

    .el-image {
      @include sizeFn;
      border-radius: 50%;
      animation: transform 10s linear infinite;
      cursor: pointer;
      animation-play-state: running; // 动画运行
      &:hover {
        animation-play-state: paused; // 动画暂停
      }
    }
  }

  @keyframes transform {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .mix-blend-mode {
    @include sizeFn;
    margin-top: 10px;
    background-image: url("../../assets/56.jpeg");
    @include flexFn;
    cursor: pointer;
    border-radius: 50%;
    animation: transform 20s linear infinite;
    animation-play-state: paused; // 动画暂停
    &:hover {
      animation-play-state: running; // 动画运行
    }

    color: initial; // 取消父级元素样式的继承

    .text {
      @include flexFn;
      padding: 10px;
      font-size: 44px;
      font-weight: 600;
      box-sizing: border-box;
      background-color: white;
      mix-blend-mode: screen;
      transition: transform .5s;
    }
  }

}

.adv {
  border: 1px solid red;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 20px;
  overflow-x: hidden;

  span {
    font-size: var(--font-size-20);
    animation: toRight 10s linear infinite;
    cursor: pointer;
    display: flex;
    width: 100%;
    animation-play-state: running; // 动画运行
    &:hover {
      animation-play-state: paused; // 动画暂停
    }
  }
}

@keyframes toRight {
  from {
    margin-left: 0px;
  }
  to {
    margin-left: 100%;
  }
}
</style>
