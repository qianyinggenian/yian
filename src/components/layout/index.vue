<template>
  <div class="layout">
    <div class="layout-left" v-if="isShowLeft"
         :class="isDrag ? '' : (isExpand ? 'expand layout-left-border': 'collapse')"
         :style="{width: `${customWidth}px`}">
      <div class="layout-left-content">
        <slot name="left"></slot>
      </div>
      <div class="layout-left-bottom">
        <div v-if="isExpand">
          <img src="../../assets/折叠.png" alt="" title="折叠" @click="handleClick('折叠')">
        </div>
        <div v-else>
          <img src="../../assets/展开.png" alt="" title="展开" @click="handleClick('展开')">
        </div>
      </div>
    </div>
    <div class="y-resize" title="拖拽" v-if="isShowLeft && isExpand"/>
    <div class="layout-center" v-if="isShowLeft">
      <div class="expand-btn"  title="折叠" v-if="isExpand" @click="handleClick('折叠')">
        <i class="el-icon-d-arrow-left"></i>
      </div>
      <div class="expand-btn"  title="展开" v-else @click="handleClick('展开')">
        <i class="el-icon-d-arrow-right"></i>
      </div>
    </div>
    <div class="layout-right"
         :class="rightClass">
      <div class="layout-right-container">
        <div class="slot-right-container">
          <slot name="right"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isExpand: true,
      isDrag: false,
      customWidth: 0
    };
  },
  name: 'layout',
  props: {
    width: {
      type: Number,
      default: 256
    },
    isShowLeft: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    rightClass () {
      return !this.isShowLeft ? 'just-right' : (this.isExpand ? 'expand-right' : 'collapse-right');
    }
  },
  mounted () {
    // 重置为0
    // store.commit('SET_MOVE_LEN', 0);
    this.customWidth = this.width;
    this.handleYResize();
  },
  methods: {
    /**
     * @Description 点击展开或折叠触发
     * @author qianyinggenian
     * @date 2023/9/15
     */
    handleClick (flag) {
      this.isExpand = !this.isExpand;
      if (flag === '折叠') {
        this.customWidth = 0;
      } else {
        this.customWidth = this.width;
      }
      this.$emit('moveLen', 0);
      // store.commit('SET_MOVE_LEN', 0);
    },
    /**
     * @Description 拖拽
     * @author qianyinggenian
     * @date 2023/9/15
     */
    handleYResize () {
      const box = document.getElementsByClassName('layout');
      const left = document.getElementsByClassName('layout-left');
      const resize = document.getElementsByClassName('y-resize');
      const right = document.getElementsByClassName('layout-right');
      const that = this;
      // const _store = store;
      for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function (e) {
          // 颜色改变提醒
          resize[i].style.background = '#818181';
          const startX = e.clientX;
          resize[i].left = resize[i].offsetLeft;
          if (that.isExpand) {
            // 鼠标拖动事件
            document.onmousemove = function (e) {
              that.isDrag = true;
              const endX = e.clientX;
              let moveLen = resize[i].left + (endX - startX); // （endX-startX）=移动的距离。resize[i].left+移动的距离=左侧最终的高度
              // const maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
              if (moveLen < that.width) moveLen = that.width; // left最小宽度度为256px
              // if (moveLen > maxT - that.width) moveLen = maxT - that.width; // right最小宽度度为256px
              if (moveLen > that.width * 2) moveLen = that.width * 2; // right最小宽度度为512px

              resize[i].style.left = moveLen; // 设置left区域的宽度
              that.customWidth = moveLen;
              let treeNodeWidth = 0;
              if (treeNodeWidth < 0) {
                treeNodeWidth = that.width;
              }
              if (moveLen > that.width) {
                // treeNodeWidth = moveLen - that.width - 50;
                treeNodeWidth = moveLen - that.width;
              }
              that.$emit('moveLen', treeNodeWidth);
              // _store.commit('SET_MOVE_LEN', treeNodeWidth);
              for (let j = 0; j < left.length; j++) {
                left[j].style.width = moveLen + 'px';
                right[j].style.width = (box[i].clientWidth - moveLen - 3) + 'px';
              }
            };
          }
          // 鼠标松开事件
          document.onmouseup = function (evt) {
            // 颜色恢复
            resize[i].style.background = '#51D1FF';
            document.onmousemove = null;
            document.onmouseup = null;
            that.isDrag = false;
            resize[i].releaseCapture && resize[i].releaseCapture(); // 当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          };
          resize[i].setCapture && resize[i].setCapture(); // 该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false;
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$color: #51D1FF;
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;

  .layout-left, .y-resize, .layout-right {
    float: left;
    overflow: hidden;
  }

  .layout-left {
    width: 256px;
    height: 100%;
    background: #0A1A34;
    box-shadow: inset 0 1px 12px 0 rgba(81, 209, 255, 0.302);
    border-radius: 0 0 0 0;
    opacity: 1;
    box-sizing: border-box;
    position: relative;
    .layout-left-content {
      height: calc(100% - 43px);
      width: 100%;
      overflow: auto;
    }

    .layout-left-bottom {
      height: 43px;
      width: 100%;
      border: 1px solid;
      border-image: linear-gradient(180deg, rgba(81.01349964737892, 209.00092989206314, 255, 0.30000001192092896), rgba(81.01349964737892, 209.00092989206314, 255, 0.5), rgba(81.01349964737892, 209.00357455015182, 255, 0.30000001192092896)) 1 1;

      > div {
        margin-top: 12px;
        width: 22px;
        height: 22px;
        margin-left: 16px;

        img {
          cursor: pointer;
        }
      }
    }
  }
  .layout-left-border {
    border-top: 1px solid $color;
    border-left: 1px solid $color;
    border-bottom: 1px solid $color;
  }
  .layout-center {
    height: 100%;
    display: flex;
    width: 20px;
    align-items: center;
    justify-content: center;
    .expand-btn {
      height: 100px;
      width: 20px;
      cursor: pointer;
      background: $color;
      position: relative;
      border-top-right-radius: 11px;
      border-bottom-right-radius: 11px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 16px;
      }
      &::before,&::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
      }
      &::before {
        top: -20px;
        right: 0;
        background: radial-gradient(
                circle at 100% 0%,
                transparent 21px,
                $color 23px
        );
      }
      &::after {
        bottom: -20px;
        right: 0;
        background: radial-gradient(
                circle at 100% 100%,
                transparent 21px,
                $color 23px
        );
      }
    }
  }
  .y-resize {
    width: 2px;
    height: 100%;
    background: $color;
    cursor: w-resize;
  }

  .layout-right {
    width: calc(100% - 256px - 3px);
    height: 100%;
    background: #060d24;

    .layout-right-container {
      overflow: hidden;
      height: 100%;
      background: #060d24;
      opacity: 1;
      padding: 20px;
      box-sizing: border-box;

      .slot-right-container {
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: inset 0 1px 12px 0 rgba(3, 251, 255, 0.3);
        border: 1px solid rgba(81, 209, 255, 0.7);
        background-color: #0a1a34;
        border-radius: 8px;

        > div {
          height: 100%;
          display: flex;
          flex-flow: column;
        }
      }
    }
  }

  .collapse {
    width: 100px;
    transition: all 0.5s;
  }

  .expand {
    width: 256px;
    transition: all 0.5s;
  }

  .expand-right {
    transition: all 0.5s;
    width: calc(100% - 256px - 3px) !important;
  }

  .collapse-right {
    transition: all 0.5s;
    width: calc(100% - 3px) !important;
  }

  .just-right {
    transition: all 0.5s;
    width: 100% !important;
  }
}
</style>
