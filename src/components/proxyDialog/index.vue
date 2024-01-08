<template>
  <div class="dialog" :style="divStyle" v-if="visible">
    <div class="dialog-wrapper animate__animated animate__fadeInLeft" :style="dialogStyle">
      <div class="dialog-title" @mousedown.self="draggableFn">
        <div class="title" @mousedown="draggableFn" :title="title">{{ title }}</div>
        <div class="fullscreen">
          <i class="el-icon-full-screen" v-if="!fullscreen" @click="handleFullscreen('max')"></i>
          <i class="el-icon-crop" v-else @click="handleFullscreen('revert')"></i>
          <i class="el-icon-circle-close" @click="close"></i>
        </div>
      </div>
      <div class="dialog-body" ref="dialogBody">
        <div class="slotContent" :style="{height: isShowFooter ? 'calc(100% - 60px)' : 'calc(100% - 15px)'}">
          <slot></slot>
        </div>
        <div class="footer" v-if="isShowFooter">
          <slot name="footer"></slot>
        </div>
      </div>
      <div class="resize">
        <div :class="className" @mousedown="mousedown">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import props from './props';
import { inRange } from './util';

export default {
  name: 'index',
  data () {
    return {
      // visible: true,
      position: { // 弹窗相对于左上角的位置
        left: 0,
        top: 0
      },
      window: {
        height: 0,
        width: 0
      },
      modalStyle: {
        height: 0,
        width: 0
      },
      dialogBodyHeight: '',
      dialogBodyWidth: '',
      realTop: '',
      realLeft: '',
      realOffsetTop: null,
      realOffsetLeft: null,
      heightType: '',
      clicked: false,
      maxHeight: window.innerHeight - 54,
      isPercentage: false, // 是否百分比
      minWidth: 500,
      minHeight: 500,
      dialogEl: {},
      fullscreen: false // 是否全屏
    };
  },
  props: {
    ...props
  },
  computed: {
    className () {
      return { btn: true, clicked: this.clicked };
    },
    divStyle () {
      return {
        height: `${this.window.height}px`,
        width: `${this.window.width}px`
      };
    },
    dialogPosition () {
      const {
        position,
        realWidth,
        realHeight
      } = this;
      const maxLeft = window.innerWidth - realWidth;
      const maxTop = window.innerHeight - realHeight;
      const left = position.left + 0.5 * maxLeft;
      const top = position.top + 0.5 * maxTop;
      return {
        left: parseInt(inRange(0, maxLeft, left)),
        top: parseInt(inRange(0, maxTop, top))
      };
    },
    /**
     * @Description 实际高度
     * @author qianyinggenian
     * @date 2022/1/18
     */
    realHeight () {
      return this.modalStyle.height;
    },
    /**
     * @Description 实际宽度
     * @author qianyinggenian
     * @date 2022/1/18
     */
    realWidth () {
      return this.modalStyle.width;
    },
    /**
     * @Description 弹窗样式
     * @author qianyinggenian
     * @date 2021/12/30
     */
    dialogStyle () {
      return {
        width: `${this.realWidth}px`,
        height: `${this.realHeight}px`,
        top: `${this.dialogPosition.top}px`,
        left: `${this.dialogPosition.left}px`
      };
    }
  },
  watch: {
    window: {
      handler (newValue, oldValue) {
        this.initHeight(newValue.height);
        this.initWidth(newValue.width);
      },
      deep: true
    }
  },
  mounted () {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
    this.initStyle();
    // 监听浏览器窗口变化
    window.onresize = () => {
      return (() => {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
      })();
    };
  },
  methods: {
    /**
     * @Description 初始化弹出大小
     * @author qianyinggenian
     * @date 2022/1/18
     */
    initStyle () {
      this.initHeight();
      this.initWidth();
    },
    /**
     * @Description 初始化高度
     * @author qianyinggenian
     * @date 2022/1/18
     */
    initHeight (val) {
      let dialogHeight = '';
      const windowHeight = val || window.innerHeight;
      if (this.height.includes('%')) {
        // 高度为%时
        const height = Number(this.height.split('%')[0]);
        if (height === 100) {
          // 最大化, 100%时
          dialogHeight = windowHeight;
        } else {
          dialogHeight = windowHeight * (height / 100);
        }
      } else {
        dialogHeight = this.height;
      }
      this.modalStyle.height = dialogHeight;
    },
    /**
     * @Description 初始化宽度
     * @author qianyinggenian
     * @date 2022/1/18
     */
    initWidth (val) {
      this.isPercentage = this.height.includes('%');
      let dialogWidth = '';
      const windowWidth = val || window.innerWidth;
      if (this.isPercentage) {
        // 宽度为%时
        const width = Number(this.width.split('%')[0]);
        if (width === 100) {
          // 最大化, 100%时
          dialogWidth = windowWidth;
        } else {
          dialogWidth = windowWidth * (width / 100);
        }
      } else {
        dialogWidth = this.width;
      }
      this.modalStyle.width = dialogWidth;
    },
    /**
     * @Description 最大化与还原
     * @author qianyinggenian
     * @date 2021/12/28
     */
    handleFullscreen (str) {
      this.fullscreen = str === 'max';
      if (this.fullscreen) {
        this.window.height = `${window.innerHeight}px`;
        this.window.width = `${window.innerWidth}px`;
        this.modalStyle.height = window.innerHeight;
        this.modalStyle.width = window.innerWidth;
        this.position.top = 0;
        this.position.left = 0;
      } else {
        this.initStyle();
      }
    },
    /**
     * @Description 拖拽
     * @author qianyinggenian
     * @date 2021/12/29
     */
    draggableFn (e) {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const cachedPositionX = this.position.left;
      const cachedPositionY = this.position.top;
      document.onmousemove = e => { // 鼠标移动事件
        e.preventDefault();
        const moveX = e.clientX - startX; // 计算从开始的位置到现在移动到的位置的x、y轴的距离
        const moveY = e.clientY - startY;
        this.position.top = cachedPositionY + moveY;
        this.position.left = cachedPositionX + moveX; // 算出的距离再加上之前的位置得到新的位置
      };
      document.onmouseup = e => { // 鼠标左键弹起事件，说明此时已结束拖拽
        document.onmousemove = document.onmouseup = null;
        e.preventDefault();
      };
    },
    /**
     * @Description 按下鼠标
     * @author qianyinggenian
     * @date 2021/12/28
     */
    mousedown (e) {
      this.clicked = true;
      window.addEventListener('mousemove', this.move, false);
      window.addEventListener('mouseup', this.stopMove, false);
      e.preventDefault(); // 移动时禁用默认事件
    },
    /**
     * @Description 移动
     * @author qianyinggenian
     * @date 2021/12/28
     */
    move (e) {
      this.resize(e);
    },
    /**
     * @Description 停止移动
     * @author qianyinggenian
     * @date 2021/12/28
     */
    stopMove (e) {
      this.clicked = false;
      window.removeEventListener('mousemove', this.move, false);
      window.removeEventListener('mouseup', this.stopMove, false);
    },
    /**
     * @Description 关闭
     * @author qianyinggenian
     * @date 2021/12/29
     */
    close () {
      this.$emit('update:visible', false);
      this.$emit('close');
      this.$emit('closeDialog');
    },
    /**
     * @Description 放大缩小
     * @author qianyinggenian
     * @date 2021/12/29
     */
    resize (e) {
      const dialogEl = document.querySelector('.dialog-wrapper');
      let width = e.clientX - dialogEl.offsetLeft;
      let height = e.clientY - dialogEl.offsetTop;
      width = inRange(this.minWidth, window.innerWidth, width);
      height = inRange(this.minHeight, window.innerHeight, height);
      this.modalStyle.height = height;
      this.modalStyle.width = width;
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  z-index: 1999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
}

.dialog-wrapper {
  height: 100%;
  width: 100%;
  border-radius: 10px;
  z-index: 2020;
  //box-shadow: 0 0 6px #BABECC;
  background: #0A1A34;
  //box-shadow: inset 0 1px 12px 0 rgba(3, 251, 255, 0.6513);
  box-shadow: inset 0 1px 12px 0 #409EFF;
  position: relative;

  .dialog-title {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    //background-color: #e9ebec;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    //border-bottom: 1px solid #ebeef5;
    border-bottom: 1px solid #409EFF;

    .title {
      cursor: move;
      padding: 0 10px;
      width: calc(100% - 100px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .fullscreen {
      justify-content: flex-end;
      width: 60px;

      i {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  .dialog-body {
    height: calc(100% - 50px);
    overflow-y: auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    //background-color: #ffffff;
    position: relative;

    .slotContent {
      overflow: auto;
      letter-spacing: 1px;
      padding: 5px;
    }

    .footer {
      //box-shadow: 0px -3px 6px rgba(75, 75, 75, 0.16);
      box-shadow: 0px -1px 6px #409EFF;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  .resize {
    bottom: 0;
    position: absolute;
    height: 10px;
    width: 100%;
  }

  .btn {
    display: block;
    overflow: hidden;
    position: absolute;
    width: 12px;
    height: 12px;
    right: 0;
    bottom: 0;
    z-index: auto;
    background: transparent;
    cursor: se-resize;
  }

  .btn::after {
    display: block;
    position: absolute;
    content: '';
    background: transparent;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    border-bottom: 10px solid #ddd;
    border-left: 10px solid transparent;
  }

  .btn.clicked::after {
    border-bottom: 10px solid #369be9;
  }
}

// 弹窗出现时间
::v-deep .animate__animated {
  animation-duration: 0.5s !important;
}
</style>
