<template>
  <div>
<!--    <div class="info">该示例实现基于JSAPI GL版的开源工具库，详情可查看<a href="https://github.com/huiyan-fe/BMapGLLib" target="_blank">GitHub</a></div>-->
    <ul class="drawing-panel">
      <li :class="['bmap-btn', 'bmap-marker', {active: activeTool === 'marker'}]" @click="draw('marker')"></li>
      <li :class="['bmap-btn', 'bmap-polyline', {active: activeTool === 'polyline'}]" @click="draw('polyline')"></li>
      <li :class="['bmap-btn', 'bmap-rectangle', {active: activeTool === 'rectangle'}]" @click="draw('rectangle')"></li>
      <li :class="['bmap-btn', 'bmap-polygon', {active: activeTool === 'polygon'}]" @click="draw('polygon')"></li>
      <li :class="['bmap-btn', 'bmap-circle', {active: activeTool === 'circle'}]" @click="draw('circle')"></li>
    </ul>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      map: null,
      drawingManager: null,
      activeTool: null,
      styleOptions: {
        strokeColor: '#5E87DB',
        fillColor: '#5E87DB',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillOpacity: 0.2
      },
      labelOptions: {
        borderRadius: '2px',
        background: '#FFFBCC',
        border: '1px solid #E1E1E1',
        color: '#703A04',
        fontSize: '12px',
        letterSpacing: '0',
        padding: '5px'
      }
    };
  },
  mounted () {
    setTimeout(() => {
      /* eslint-disable-next-line no-undef */
      if (typeof BMapGL !== 'undefined') {
        this.initMap();
      } else {
        console.error('百度地图API加载失败');
      }
    }, 3000); // 延迟1秒确保百度地图API已加载
  },
  methods: {
    initMap () {
      // 初始化地图实例
      /* eslint-disable-next-line no-undef */
      this.map = new BMapGL.Map('container', { enableMapClick: false });
      /* eslint-disable-next-line no-undef */
      this.map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);
      this.map.enableScrollWheelZoom(true);

      // 实例化鼠标绘制工具
      /* eslint-disable-next-line no-undef */
      this.drawingManager = new BMapGLLib.DrawingManager(this.map, {
        // isOpen: true,        // 是否开启绘制模式
        enableCalculate: false, // 绘制是否进行测距测面
        enableSorption: true, // 是否开启边界吸附功能
        sorptiondistance: 20, // 边界吸附距离
        circleOptions: this.styleOptions, // 圆的样式
        polylineOptions: this.styleOptions, // 线的样式
        polygonOptions: this.styleOptions, // 多边形的样式
        rectangleOptions: this.styleOptions, // 矩形的样式
        labelOptions: this.labelOptions // label样式
      });
      console.log('this.drawingManager', this.drawingManager);
      // this.drawingManager.addEventListener('polygoncomplete', function (e) {
      //   console.log('e', e);
      //   console.log('getPath1', e.overlay.getPath());
      // });
      // 完成后触发
      this.drawingManager.addEventListener('overlaycomplete', function (e) {
        console.log(e.drawingMode);
        // 获取绘制结果
        console.log('getPath2', e.overlay.getPath());
        console.log(e.calculate);
        console.log(e.label);
      });
    },
    draw (tool) {
      console.log('this.drawingManager', this.drawingManager);
      const tools = ['marker', 'polyline', 'rectangle', 'polygon', 'circle'];
      tools.forEach(t => (this.activeTool = t === tool ? tool : null));
      let drawingType;
      switch (tool) {
        case 'marker': drawingType = window.BMAP_DRAWING_MARKER; break;
        case 'polyline': drawingType = window.BMAP_DRAWING_POLYLINE; break;
        case 'rectangle': drawingType = window.BMAP_DRAWING_RECTANGLE; break;
        case 'polygon': drawingType = window.BMAP_DRAWING_POLYGON; break;
        case 'circle': drawingType = window.BMAP_DRAWING_CIRCLE; break;
      }
      if (this.drawingManager._isOpen && this.drawingManager.getDrawingMode() === drawingType) {
        this.drawingManager.close();
      } else {
        this.drawingManager.setDrawingMode(drawingType);
        this.drawingManager.open();
      }
    }
  }
};
</script>

<style scoped>
body, html, #container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}
.info {
  z-index: 999;
  width: auto;
  min-width: 22rem;
  padding: .75rem 1.25rem;
  margin-left: 1.25rem;
  position: fixed;
  top: 1rem;
  background-color: #fff;
  border-radius: .25rem;
  font-size: 14px;
  color: #666;
  box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
}
.drawing-panel {
  z-index: 999;
  position: fixed;
  bottom: 3.5rem;
  margin-left: 2.5rem;
  padding-left: 0;
  border-radius: .25rem;
  height: 47px;
  box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
}
.bmap-btn {
  border-right: 1px solid #d2d2d2;
  float: left;
  width: 64px;
  height: 100%;
  background-image: url(//api.map.baidu.com/library/DrawingManager/1.4/src/bg_drawing_tool.png);
  cursor: pointer;
}
.drawing-panel .bmap-marker {
  background-position: -65px 0;
}
.drawing-panel .bmap-polyline {
  background-position: -195px 0;
}
.drawing-panel .bmap-rectangle {
  background-position: -325px 0;
}
.drawing-panel .bmap-polygon {
  background-position: -260px 0;
}
.drawing-panel .bmap-circle {
  background-position: -130px 0;
}
.active {
  background-position-y: -52px !important;
}
</style>
