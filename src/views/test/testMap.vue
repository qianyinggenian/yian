//下面是vue文件
<template>
  <div class="body">
    <!-- <div>
      <input v-model="address" placeholder="请输入"/>
      <button type="primary" size="medium " @click="getCenter"
        >查询</button
      >
    </div> -->
    <div id="toolControl">
      <button size="medium" type="primary" @click="Edit()">编辑</button>
      <button size="medium" type="primary" @click="Add()">绘画</button>
      <button
          type="danger"
          @click="Delete('delete')"
          v-if="EditFlag"
      >删除</button
      >
      <!-- <button size="small" type="danger" @click="get()">获取</button> -->
    </div>
    <div id="map" style="height: 85vh"></div>
  </div>
</template>

<script>
let map = ''; // 地图
let editor; // 编辑器

export default {
  props: ['parentmsg'],
  data () {
    return {
      arr: [],
      longitude: '',
      latitude: '',
      lngLatData: [], // 绘制多边形坐标点
      address: '', // 详细地址
      LatLng: [],
      zoom: 8,
      EditFlag: false
    };
  },
  mounted () {
    this.initMap();
  },
  methods: {
    // 父子传值
    sendMsg (e) { // 获取父组件传过来的值  数据类型[[{经度，维度}],[{经度，维度}]]
      console.log(e);
      this.LatLng = e;
      const geometries = [];
      let i = 1;
      if (e != null && e.length !== 0) {
        this.LatLng.forEach((item) => {
          const path = [];
          console.log(item);
          item.forEach((v) => {
            path.push(new TMap.LatLng(v.lat, v.lng));
          });
          geometries.push({ paths: path, id: i++ });
        });
        this.LatLng = geometries;
        this.initMap();
      } else {
        this.LatLng = [];
        this.initMap();
      }
    },
    // 初始化地图
    initMap () {
      // 初始化地图
      map = new TMap.Map('map', {
        zoom: this.zoom, // 设置地图缩放级别
        center: new TMap.LatLng(32.061627, 118.795166) // 设置地图中心点坐标, // 设置地图中心点坐标
      });

      editor = new TMap.tools.GeometryEditor({
        map: map, // 编辑器绑定的地图对象
        overlayList: [
          {
            overlay: new TMap.MultiPolygon({
              map,
              styles: {
                highlight: new TMap.PolygonStyle({
                  color: 'rgba(255, 255, 0, 0.6)'
                })
              },
              geometries: this.LatLng
            }),
            id: 'polygon',
            selectedStyleId: 'highlight'
          }
        ],
        actionMode:
            this.EditFlag == true
              ? TMap.tools.constants.EDITOR_ACTION.INTERACT // 编辑
              : TMap.tools.constants.EDITOR_ACTION.DRAW, // 初始化 // 编辑器的工作模式
        activeOverlayId: 'polygon', // 激活图层
        snappable: true, // 开启吸附
        selectable: true // 开启点选功能
      });

      // 监听删除、修改、拆分、合并完成事件
      const evtList = ['delete', 'adjust', 'split', 'union', 'draw'];
      evtList.forEach((evtName) => {
        editor.on(evtName + '_complete', (evtResult) => {
          console.log(evtName, evtResult);
          if (evtName == 'draw') {
            // 增加
            evtResult.id = this.LatLng.length + 1;
            this.LatLng.push(evtResult);
          } else if (evtName == 'adjust') {
            // 拖动修改
            const LatLng = this.LatLng;
            LatLng.forEach((item) => {
              if (item.id == evtResult.id) {
                console.log(item);
                item.paths = evtResult.paths;
              }
            });
          } else if (evtName == 'delete') {
            // 删除
            this.LatLng = this.LatLng.filter(
              (item) => item.id != evtResult[0].id
            );
          }
          this.LatLng = Array.from(
            new Set(this.LatLng.map((item) => item.id))
          ).map((id) => this.LatLng.find((item) => item.id === id));

          const arr = [];
          if (this.LatLng.length != 0) {
            this.LatLng.forEach((item) => {
              arr.push(item.paths);
            });
            console.log(arr);
          }
          this.$emit('map', arr);
        });
      });
    },
    getCenter () {
      console.log(777);

      const geocoder = new qq.maps.Geocoder({
        complete: function (result) {
          map.setCenter(result.detail.location);
          console.log(result);
        }
      });
      geocoder.getLocation(this.address);
    },
    // 编辑
    Edit () {
      this.zoom = map.getZoom(); // 获取地图缩放比例
      map.destroy(); // 销毁地图
      this.EditFlag = true;
      this.initMap();
    },
    // 绘画
    Add () {
      this.zoom = map.getZoom();
      map.destroy();
      this.EditFlag = false;
      this.initMap();
    },
    // 删除
    Delete () {
      editor.delete();
    },
    // 销毁地图
    destroy () {
      map.destroy();
    },
    get () {
      console.log(this.LatLng);
      const arr = [];
      if (this.LatLng.length != 0) {
        this.LatLng.forEach((item) => {
          arr.push(item.paths);
        });
        console.log(arr);
      }
      this.$emit('map', arr);

      return;
      new TMap.tools.GeometryEditor(options);
    }
  }
};
</script>
<style scoped>
.body {
  position: relative;
}
#toolControl {
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 1001;
  top: 10px;
}
::v-deep .button {
  z-index: 1001 !important;
}
</style>
