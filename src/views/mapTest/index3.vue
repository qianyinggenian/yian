<template>
  <div class="add-edit-container">
<!--    <el-button @click="startDrawing">绘制</el-button>-->
    <div class="tool-bar">
      <el-select
          v-model="formData.locationName"
          filterable
          remote
          reserve-keyword
          clearable
          size="small"
          :disabled="readonly"
          placeholder="请输入关键字搜索"
          :remote-method="remoteMethod"
          @change="handleChangeSelect"
      >
        <el-option
            v-for="item in suggestions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div id="map-container" v-show="isShowMap" style="width: 100%; height: 100%;"></div>
  </div>
</template>
<script>

import AMapLoader from '@amap/amap-jsapi-loader';
// import markerUrl from '@/common/images/marker.png';
import { mk } from '@/common/js/mk';

window._AMapSecurityConfig = {
  securityJsCode: mk.s
};
let AMap;
let mapInstance;
let autoComplete;
let mouseTool;
export default {
  name: 'AddEdit',
  components: {
  },
  data () {
    return { // 地
      type: '',
      params: '',
      keyword: '',
      currentPolygon: null,
      readonly: false,
      showDialog: false,
      isShowMap: true,
      formData: {
        time: null,
        locationName: '',
        objectIds: []
      },
      suggestions: [],
      mapCenter: [113.264499, 23.130061]
    };
  },
  watch: {
  },
  async mounted () {
    await this.initAMap();
  },
  methods: {
    initAMap () {
      AMapLoader.load({
        key: mk.k, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.Scale',
          'AMap.AutoComplete',
          'AMap.PlaceSearch',
          'AMap.ToolBar',
          'AMap.ControlBar',
          'AMap.PolygonEditor',
          'AMap.MouseTool'
        ] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((GDMap) => {
          AMap = GDMap;
          mapInstance = new AMap.Map('map-container', {
          // 设置地图容器id
            resizeEnable: true,
            expandZoomRange: true,
            viewMode: '3D', // 是否为3D地图模式
            zoom: 15, // 初始化地图级别
            center: this.mapCenter // 初始化地图中心点位置
          });
          // mapInstance.addControl(new AMap.Scale()); // 比例尺
          // mapInstance.addControl(new AMap.ToolBar()); // 缩放工具条
          // mapInstance.addControl(new AMap.ControlBar({
          //   position: 'RB', // 右下角定位
          //   offset: new AMap.Pixel(20, 60), // 像素级微调
          //   showAngle: true // 显示旋转角度
          // })); // 控制罗盘
          const autoOptions = {
          // city 限定城市，默认全国
            city: '全国'
          };
          // mouseTool = new AMap.MouseTool(mapInstance);
          // console.log(mouseTool);
          // 实例化AutoComplete
          autoComplete = new AMap.AutoComplete(autoOptions);
          console.log('加载完成');
          this.addMarker(this.mapCenter);
        // this.getInfo(item);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    resetMap (position) {
      this.clearResources(); // 清理旧资源
      mapInstance.setCenter(position);
      this.addMarker(position);

      this.activateDrawing();
    },
    // 获取最终围栏坐标
    handlePolygonUpdate (e) {
      console.log(111111);
      const paths = this.currentPolygon.getPath();
      console.log('电子围栏坐标:', paths);
    },
    // 清理资源
    clearResources () {
      if (this.currentMarker) {
        mapInstance.remove(this.currentMarker);
        this.currentMarker = null;
      }
      if (this.currentPolygon) {
        mapInstance.remove(this.currentPolygon);
        this.currentPolygon.close();
        this.currentPolygon = null;
      }
      if (this.polygonEditor) {
        this.polygonEditor.close();
        this.polygonEditor = null;
      }
    },

    /**
     * @Description 选择地点时触发
     * @author wangkangzhang
     * @date 2024/9/26
     */
    handleChangeSelect (id) {
      const result = this.suggestions.find(value => value.id === id);
      if (result) {
        this.handleSelect(result);
      }
    },
    handleSelect (item) {
      const { location, name } = item;
      console.log(name);
      this.resetMap(location);
    },
    /**
     * @Description 重置中心点
     * @author wangkangzhang
     * @date 2024/9/26
     */
    setMapCenter (position) {
      if (mapInstance) {
        mapInstance.setCenter(position);
      }
    },
    // 添加标记点
    addMarker (position) {
      this.currentMarker = new AMap.Marker({
        position: position,
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
      });
      mapInstance.add(this.currentMarker);
    },

    activateDrawing () {
    // 创建新多边形并加入地图
      mouseTool.polygon({
        strokeColor: '#1791fc',
        strokeOpacity: 0.5,
        strokeWeight: 6,
        fillColor: '#1791fc',
        fillOpacity: 0.4,
        strokeStyle: 'solid'
      });
      mouseTool.on('draw', (event) => {
      // event.obj 为绘制出来的覆盖物对象
        console.log('event', event);

        const getPath = event.obj.getPath();
        console.log('getPath', getPath);
        this.currentPolygon = new AMap.Polygon({
          path: getPath,
          strokeColor: 'green',
          strokeWeight: 6,
          strokeOpacity: 0.2,
          fillOpacity: 0.4,
          fillColor: '#1791fc',
          zIndex: 50,
          bubble: true

        });
        mapInstance.add(this.currentPolygon);
        this.fn();
      });
    // mouseTool.on('draw', this.handlePolygonUpdate);
    // 延迟初始化编辑器（关键修复）
    },
    remoteMethod (query) {
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timer = setTimeout(() => {
        if (query) {
          this.getSuggestions(query);
        }
        this._timer = null;
      }, 500);
    },
    getSuggestions (keyword) {
      if (autoComplete) {
        autoComplete.search(keyword, (status, result) => {
          const { info = '', tips = [] } = result || {};
          // 搜索成功时，result 即是对应的匹配数据
          if (info === 'OK') {
            this.suggestions = tips;
          }
        });
      }
    }
  },
  beforeDestroy () {
    if (mapInstance) {
      mapInstance.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
.add-edit-container {
  width: 100%;
  height: 100%;
  position: relative;
  .tool-bar {
    width: 320px;
    height: 42px;
    background: #ffffff;
    position: absolute;
    top: 32px;
    left: 32px;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 8px;
    .el-select {
      width: 100%;
    }
  }
}
</style>
