<script>
import { DrawScene, PolygonDraw } from 'bmap-draw';
export default {
  components: {},
  data () {
    return {
      setDrawStatus: null,
      setScene: null
    };
  },
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {
    setTimeout(() => {
      if (typeof BMapGL !== 'undefined') {
        this.initMap();
      } else {
        console.error('百度地图API加载失败');
      }
    }, 3000); // 延迟1秒确保百度地图API已加载
  },
  methods: {
    initMap () {
      /* eslint-disable-next-line no-undef */
      const map = new BMapGL.Map(this.$refs.mapRef);
      /* eslint-disable-next-line no-undef */
      map.centerAndZoom(new BMapGL.Point(116.291, 39.993), 13);
      // map.setMapStyleV2({ styleJson: customStyleJSON });
      map.enableScrollWheelZoom();

      const scene = new DrawScene(map, {
        noLimit: true
      });
      const polygon = new PolygonDraw(scene, {
        hideTip: false, // 隐藏绘制提示
        isSeries: true, // 是否开启批量绘制
        isOpen: true,
        labelOptions: {
          borderRadius: '2px',
          background: '#FFFBCC',
          border: '1px solid #b5d3fb',
          color: '#333',
          fontSize: '12px',
          letterSpacing: '0',
          padding: '5px'
        },
        baseOpts: {
          strokeColor: '#5E87DB',
          fillColor: '#5E87DB',
          strokeWeight: 2,
          strokeOpacity: 1,
          fillOpacity: 0.2
        }
      });
      console.log(polygon);
      this.setDrawStatus = polygon;
      // 监听多边形绘制完成事件
      scene.addEventListener('operate-ok', e => {
        console.log('完成');
        console.log('operate-ok', e.target);
      });
      scene.addEventListener('operate-cancel', e => {
        console.log('取消');
        console.log('operate-cancel', e.target);
      });
      this.setScene = scene;
    },
    openDraw () {
      this.setDrawStatus.open();
    },
    closeDraw () {
      this.setDrawStatus.closeAll();
    },
    clearData () {
      this.setScene.clearData();
    }
  }
};
</script>

<template>
  <div>
    <div style="padding: 8px;">
      <el-button @click="openDraw">开启</el-button>
      <el-button @click="closeDraw">禁用</el-button>
      <el-button @click="clearData">清除</el-button>
    </div>
    <div ref="mapRef" style="width:auto;height:450px;position:relative;"></div>
  </div>
</template>

<style scoped lang="scss">

</style>
