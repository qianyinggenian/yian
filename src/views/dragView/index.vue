<template>
  <div class="drag" :style="divStyle">
    <div class="drag-wrapper animate__animated animate__fadeInLeft "
         :class="clicked ? 'moveCursorStyle' : ''"
         :style="dragStyle"  @mousedown.self="draggableFn"
         @click="handleClick"
    >
    </div>
  </div>
</template>

<script>
// import props from './props';
import { inRange } from './util';

export default {
  name: 'index',
  data () {
    return {
      // visible: true,
      position: { // 弹窗相对于左上角的位置
        left: window.innerWidth - 70 - 10,
        top: -(window.innerHeight * 0.5) + 90 // 初始距离顶部50，计算方法：-0.5x+y+(x-80)*0.5=50, 求y值
      },
      windowObj: {
        height: 0,
        width: 0
      },
      clicked: false,
      minWidth: 70,
      minHeight: 70,
      dragEl: {}
    };
  },
  props: {
    // ...props
  },
  computed: {
    divStyle () {
      return {
        height: `${this.windowObj.height}px`,
        width: `${this.windowObj.width}px`
      };
    },
    dragPosition () {
      const {
        position
      } = this;
      const {
        windowObj
      } = this;
      const maxLeft = windowObj.width - 70 - 10; // 减去div宽度70，减去滚动条10
      const maxTop = windowObj.height - 70 - 10; // 减去div高度70，减去滚动条10
      const left = position.left;
      const top = position.top;
      return {
        left: parseInt(inRange(0, maxLeft, left)),
        top: parseInt(inRange(0, maxTop, top))
      };
    },
    /**
     * @Description 弹窗样式
     * @author qianyinggenian
     * @date 2021/12/30
     */
    dragStyle () {
      return {
        top: `${this.dragPosition.top}px`,
        left: `${this.dragPosition.left}px`
      };
    }
  },
  mounted () {
    this.windowObj.width = window.innerWidth;
    this.windowObj.height = window.innerHeight;
    // 监听浏览器窗口变化
    window.onresize = () => {
      return (() => {
        this.windowObj.width = window.innerWidth;
        this.windowObj.height = window.innerHeight;
      })();
    };
  },
  methods: {
    handleClick () {
      console.log(111111);
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
        this.clicked = true;
        e.preventDefault();
        const moveX = e.clientX - startX; // 计算从开始的位置到现在移动到的位置的x、y轴的距离
        const moveY = e.clientY - startY;
        this.position.top = cachedPositionY + moveY;
        this.position.left = cachedPositionX + moveX; // 算出的距离再加上之前的位置得到新的位置
      };
      document.onmouseup = e => { // 鼠标左键弹起事件，说明此时已结束拖拽
        this.clicked = false;
        document.onmousemove = document.onmouseup = null;
        e.preventDefault();
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.drag {
  position: fixed;
  z-index: 1999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.drag-wrapper {
  pointer-events: auto;
  height: 70px;
  width: 70px;
  border-radius: 10px;
  z-index: 2020;
  background: #42b983;
  position: relative;
}
.moveCursorStyle {
  cursor: move !important;
}

// 弹窗出现时间
::v-deep .animate__animated {
  animation-duration: 0.5s !important;
}
</style>
