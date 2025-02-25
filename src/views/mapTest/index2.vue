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
      this.BMap = new BMapGL.Map(this.$refs.mapRef);
      /* eslint-disable-next-line no-undef */
      this.BMap.centerAndZoom(new BMapGL.Point(116.291, 39.993), 13);
      // map.setMapStyleV2({ styleJson: customStyleJSON });
      this.BMap.enableScrollWheelZoom();

      const po = [
        {
          lng: 12941275.760920327,
          lat: 4838229.842347245,
          latLng: {
            lng: 116.25219320196888,
            lat: 40.00007518540277
          }
        },
        {
          lng: 12943675.760920327,
          lat: 4835093.842613237,
          latLng: {
            lng: 116.27375253420836,
            lat: 39.97840531293305
          }
        },
        {
          lng: 12954683.760920282,
          lat: 4837045.903820169,
          latLng: {
            lng: 116.37263800474632,
            lat: 39.99189494121582
          }
        },
        {
          lng: 12948379.76092025,
          lat: 4842325.939703013,
          latLng: {
            lng: 116.31600882539703,
            lat: 40.02836893062584
          }
        },
        {
          lng: 12941275.760920327,
          lat: 4838229.842347245,
          latLng: {
            lng: 116.25219320196888,
            lat: 40.00007518540277
          }
        }
      ];
      /* eslint-disable-next-line no-undef */
      const points = po.map(p => new BMapGL.Point(p.latLng.lng, p.latLng.lat));
      // 创建多边形并应用样式
      /* eslint-disable-next-line no-undef */
      this.polygon2 = new BMapGL.Polygon(points, {
        strokeColor: '#5E87DB',
        fillColor: '#5E87DB',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillOpacity: 0.2
      });
      this.BMap.addOverlay(this.polygon2); // 添加到地图
      const scene = new DrawScene(this.BMap, {
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
      this.BMap.removeOverlay(this.polygon2);
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
