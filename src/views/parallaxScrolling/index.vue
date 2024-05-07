<template>
<div class="scroll-container">
</div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      imgList: [
        require('../../assets/45.jpg'),
        require('../../assets/56.jpeg'),
        require('../../assets/login.jpg'),
        require('../../assets/55.jpeg'),
        require('../../assets/广州塔.jpg')
      ]
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.fn();
  },
  methods: {
    fn () {
      let curIndex = 0;
      const container = document.querySelector('.scroll-container');
      const that = this;
      function prevIndex () {
        return curIndex === 0 ? that.imgList.length - 1 : curIndex - 1;
      }
      function nextIndex () {
        return curIndex === that.imgList.length - 1 ? 0 : curIndex + 1;
      }
      function createImg (index) {
        const img = document.createElement('img');
        img.src = that.imgList[index];

        const div = document.createElement('div');
        div.className = 'item';
        div.appendChild(img);
        container.appendChild(div);
        return div;
      }
      function resetElement () {
        container.innerHTML = '';
        const prevInd = prevIndex();
        const nextInd = nextIndex();
        createImg(prevInd).classList.add('prev');
        createImg(curIndex).classList.add('cur');
        createImg(nextInd).classList.add('next');
      }
      resetElement();
      window.addEventListener('wheel', (e) => {
        if (!e.deltaY) return;
        if (e.deltaY > 0) {
          container.className = 'scroll-container scroll-down';
        } else {
          container.className = 'scroll-container scroll-up';
        }
      });
      container.addEventListener('animationend', () => {
        if (container.classList.contains('scroll-down')) {
          curIndex = nextIndex();
        } else if (container.classList.contains('scroll-up')) {
          curIndex = prevIndex();
        }
        container.className = 'scroll-container';
        resetElement();
      });
    }
  }
};
</script>
<style lang="scss">
.scroll-container {
  position: relative;
  overflow: hidden;
  .item {
    width: 100%;
  }
  img {
    width: 100%;
    height: 825px;
  }
}
.prev {
  margin-top: -825px;
}
.cur {
  margin-top: 0;
}
.next {
  margin-top: 825px;
}
.scroll-down {
  position: relative;
  overflow: hidden;
  .prev {
    animation: downPrev 2.5s;
  }
  .next {
    animation: downNext 2.5s;
  }
}
/* 定义动画 */
@keyframes downPrev {
  0% {
    height: 825px;
  }
  100% {
    height: 0;
  }
}
/* 定义动画 */
@keyframes downNext {
  0% {
    margin-top: 825px;
  }
  100% {
    margin-top: 0;
  }
}
.scroll-up {
  overflow: hidden;
  position: relative;
  .prev {
    animation: upPrevTop 2.5s;
  }
  .cur {
    animation: upCurTop 2.5s;
  }
}
/* 定义动画 */
@keyframes upPrevTop {
  0% {
    margin-top: -825px;
  }
  100% {
    margin-top: 0;
  }
}
/* 定义动画 */
@keyframes upCurTop {
  0% {
    margin-top: 0;
  }
  100% {
    margin-top: 825px;
  }
}
</style>
