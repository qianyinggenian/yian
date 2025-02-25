<template>
  <div class="map-wrapper">
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
    <div id="map-container"></div>
    <div class="draw-btn">
      <button class="" @click="startDrawing">开始绘制</button>
      <button class="" @click="resetDrawing">重画</button>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import { mk } from '@/common/js/mk';
let AMap;
let autoComplete;
export default {
  data () {
    return {
      formData: {
        time: null,
        locationName: '',
        objectIds: []
      },
      readonly: false,
      suggestions: [],
      mapCenter: [113.264499, 23.130061],
      map: null,
      currentMarker: null,
      mouseTool: null,
      editor: null,
      currentPolygon: null
    };
  },
  async mounted () {
    await this.initMap();
  },
  methods: {
    async initMap () {
      try {
        window._AMapSecurityConfig = {
          securityJsCode: mk.s
        };
        AMap = await AMapLoader.load({
          key: mk.k, // 请替换有效key
          version: '2.0',
          plugins: [
            'AMap.MouseTool', // 必须插件
            'AMap.PolyEditor',
            'AMap.AutoComplete'
          ]
        });

        this.map = new AMap.Map('map-container', {
          viewMode: '3D', // 是否为3D地图模式
          zoom: 15, // 初始化地图级别
          center: this.mapCenter, // 初始化地图中心点位置
          resizeEnable: true // 重要：适配Vue容器
        });
        const autoOptions = {
        // city 限定城市，默认全国
          city: '全国'
        };
        // 实例化AutoComplete
        autoComplete = new AMap.AutoComplete(autoOptions);
        this.addMarker(this.mapCenter);
        console.log('地图初始化完成');
      } catch (error) {
        console.error('地图初始化失败:', error);
      }
    },

    resetDrawing () {
      if (this.currentPolygon) {
        this.map.remove(this.currentPolygon); // 从地图移除
        this.currentPolygon = null; // 释放内存

        if (this.editor) {
          this.editor.close(); // 关闭编辑器
          this.editor = null;
        }
        this.startDrawing();
      }
    },
    async startDrawing () {
      try {
        // 销毁旧实例
        if (this.mouseTool) {
          this.mouseTool.close(true);
        }

        // const AMap = await AMapLoader.load();

        // 初始化新工具
        this.mouseTool = new AMap.MouseTool(this.map);

        // 多边形绘制配置
        this.mouseTool.polygon({
          strokeColor: '#1890FF',
          fillColor: '#1890FF',
          fillOpacity: 0.2,
          strokeWeight: 3
        });

        // 监听绘制完成
        this.mouseTool.on('draw', async (event) => {
          this.currentPolygon = event.obj;
          console.log('绘制完成，路径:', event.obj.getPath());

          // 自动进入编辑模式
          this.editor = new AMap.PolyEditor(this.map, this.currentPolygon);
          this.editor.open();
          this.editor.on('adjust', ({ target, lnglat, pixel }) => {
            console.log('节点调整后路径:', target.getPath().map(p => [p.lng, p.lat]));
          });
          this.editor.on('addnode', ({ target, lnglat, pixel }) => {
            console.log('增加节点调整后路径:', target.getPath().map(p => [p.lng, p.lat]));
          });
          // 销毁绘制工具
          this.mouseTool.close();
        });
      } catch (error) {
        console.error('绘制失败:', error);
      }
    },
    // 添加标记点
    addMarker (position) {
      if (this.currentMarker) {
        this.map.remove(this.currentMarker);
        this.currentMarker = null;
      }
      this.currentMarker = new AMap.Marker({
        position: position,
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
      });
      this.map.add(this.currentMarker);
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
      // this.resetMap(location);
      this.setMapCenter(location);
      this.addMarker(location);
    },
    /**
     * @Description 重置中心点
     * @author wangkangzhang
     * @date 2024/9/26
     */
    setMapCenter (position) {
      if (this.map) {
        this.map.setCenter(position);
      }
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
      console.log('keyword', keyword);
      if (autoComplete) {
        console.log(111111);
        autoComplete.search(keyword, (status, result) => {
          console.log('result', result);
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
    // 清理资源
    if (this.mouseTool) this.mouseTool.close(true);
    if (this.map) this.map.destroy();
  }
};
</script>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 600px;
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

#map-container {
  width: 100%;
  height: 100%;
}

.draw-btn {
  position: absolute;
  top: 20px;
  right: 200px;
  z-index: 999;
  padding: 8px 16px;
  background: #1890FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
