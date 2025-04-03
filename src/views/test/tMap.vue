
<template>
  <proxy-dialog
      :visible.sync="isShow"
    :title="title"
    :z-index="2000"
    height="90%"
    width="90%"
    @close="closeFn"
  >
    <div class="container">
      <el-form :model="formData" ref="ctForm" label-position="right"  label-width="70px">
        <el-row class="row">
          <el-col :span="24">
            <el-form-item label="地点：" prop="locationName" >
              <el-select
                v-model="formData.locationName"
                filterable
                remote
                reserve-keyword
                clearable
                :disabled="readonly"
                placeholder="请输入关键字搜索"
                :remote-method="remoteMethod"
                @change="handleChangeSelect"
              >
                <el-option
                  v-for="item in suggestions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="map-container">
        <div class="toolControl" id="toolControl">
          <div class="toolItem active" id="polygon"></div>
        </div>
        <div id="map" v-show="isShowMap"></div>
        <div class="tips" v-show="!isShowMap">
          <el-empty description="地图加载失败，请刷新或清理缓存后再重试">
          </el-empty>
        </div>
      </div>
<!--      <div class="btns-box">-->
<!--        <el-button class="btn" type="primary">确定</el-button>-->
<!--        <el-button class="btn" plain>重画</el-button>-->
<!--      </div>-->
    </div>
    <div slot="footer">

        <el-button  size="small"  type="primary">确定</el-button>
        <el-button   size="small" plain @click="handleRedraw">重画</el-button>
        <el-button   size="small" plain @click="handleRemove">删除</el-button>
    </div>
  </proxy-dialog>
</template>
<script >
import useMap from '@/common/js/useMap';
import { mapKey } from '@/common/js/TmapKey';
import proxyDialog from '@/components/proxyDialog/index.vue';
const _Map = useMap({
  key: mapKey.key,
  sk: mapKey.sk
});
export default {
  components: {
    proxyDialog
  },
  data () {
    return {
      title: '',
      isShow: false,
      readonly: false,
      isShowMap: true,
      hadLoadMap: false,
      editor: null,
      map: null,
      TMap: null,
      activeType: 'polygon',
      row: {},
      formData: {},
      suggestions: [],
      initialization: false,
      editFlag: false,
      mapCenter: {
        lat: 23.130047,
        lng: 113.264464
      }
    };
  },
  props: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
    setTimeout(() => {
      this.initMapInfo();
    });
  },
  methods: {
    closeFn () {
      this.isShow = false;
      this.$emit('closeMap');
    },
    async getInfo (row) {
      console.log(111);
      this.isShow = true;
      this.initialization = true;
      this.row = row;
      this.title = row.name;
    },
    async initMapInfo () {
      await _Map.fetchSDK().then((TMap) => {
        this.initMap(TMap);
      });
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
      const params = {
        // keyword: querythis.formData.locationName,
        keyword: keyword,
        region: '广州',
        page_index: 1,
        page_size: 20
      };

      _Map.fetchService('suggestion', params, this.sk).then((response) => {
        const data = (response.data || []).map(item => {
          return { ...item, value: item.title };
        });

        this.suggestions = Object.freeze(data);
      });
    },

    /**
     * @Description 选择地点坐标触发
     * @author qianyinggenian
     * @date 2023/7/13
     */
    handleChangeSelect (id) {
      const result = this.suggestions.find(value => value.id === id);
      if (result) {
        this.handleSelect(result);
      }
    },
    handleSelect (item) {
      const {
        title,
        location
      } = item;

      Object.assign(this.formData, {
        locationName: title,
        latitude: location.lat,
        longitude: location.lng
      });

      const params = {
        lat: location.lat,
        lng: location.lng
      };

      /** 修改中心点 */
      this.setMapCenter(location);

      if (this.formData.radius) {
        this.addCircle({
          ...location,
          radius: Number(this.formData.radius) || 1
        });
      }

      /** 添加地点标示 */
      this.addMultiMarker(params);
    },
    /**
     * @Description 初始化
     * @author qianyinggenian
     * @date 2023/6/5
     */
    initMap (TMap) {
      /** 定义地图中心点坐标 */
      const center = new TMap.LatLng(this.mapCenter.lat, this.mapCenter.lng);
      /** 定义map变量，调用 TMap.Map() 构造函数创建地图 */
      const map = new TMap.Map(document.querySelector('#map'), {
        /** 设置地图中心点坐标 */
        center,
        /** 设置地图缩放级别 */
        zoom: 17.2,
        /** 设置俯仰角 */
        pitch: 30,
        /** 设置地图旋转角度 */
        rotation: 45,
        /** 地图显示模式为3D模式 */
        viewMode: '3D'
      });
      if (!TMap) {
        this.isShowMap = false;
      }
      this.TMap = TMap;
      this.map = map;
      this.hadLoadMap = true;

      /** 新建一个正逆地址解析类 */
      // this.geocoder = new TMap.service.Geocoder();
      // this.getPOIInfo(TMap);

      setTimeout(() => {
        // const location = {
        //   lat: this.row.latitude,
        //   lng: this.row.longitude,
        //   radius: this.row.radius
        // };
        // this.setMapCenter(location);
        // this.addCircle(location);
        // this.addMultiMarker(location);
      });
      this.polygonFn(TMap);
      // this.editorFn();
      return map;
    },
    polygonFn (TMap) {
      this.polygon = new TMap.MultiPolygon({
        map: this.map,
        styles: {
          highlight: new TMap.PolygonStyle({
            color: 'rgba(255, 255, 0, 0.6)'
          })
        }
      });
      this.editor = new TMap.tools.GeometryEditor({
        // TMap.tools.GeometryEditor 文档地址：https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocEditor
        map: this.map, // 编辑器绑定的地图对象
        overlayList: [
          // 可编辑图层 文档地址：https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocEditor#4
          {
            overlay: this.polygon,
            id: 'polygon',
            selectedStyleId: 'highlight'
          }
        ],
        actionMode:
            this.editFlag ? TMap.tools.constants.EDITOR_ACTION.INTERACT // 编辑
              : TMap.tools.constants.EDITOR_ACTION.DRAW, // 初始化 // 编辑器的工作模式
        activeOverlayId: 'polygon', // 激活图层
        snappable: true, // 开启吸附
        selectable: true
      });
      console.log('this.editor', this.editor);
      this.editor.on('draw_complete', (geometry) => {
        // 判断当前处于编辑状态的图层id是否是overlayList中id为rectangle（矩形）图层
        // 判断当前处于编辑状态的图层id是否是overlayList中id为rectangle（矩形）图层
        var id = geometry.id;
        this.geometry = geometry;
        console.log('geometry', geometry);
        if (this.editor.getActiveOverlay().id === 'polygon') {
          // 获取多边形顶点坐标
          var geo = this.polygon.geometries.filter(function (item) {
            return item.id === id;
          });
          this.paths = geo[0].paths;
          this.geos = geo;
          console.log('绘制的多边形坐标：', geo[0].paths);
          console.log('geo：', geo);
        }
      });
    },
    handleRemove () {
      this.editor.delete();
      this.editor.setActionMode(2);
      // this.editor.enable();
      console.log(656);
    },
    handleRedraw () {
      this.editor.setActionMode(1);
      // this.polygon.remove(['polygon']);
      this.polygon.remove([this.geometry.id]); // 删除
      this.editor.setActionMode(2);
      this.editor.on('select', evtResult => {
        console.log('evtName12', evtResult);
        console.log('getSelectedListgetSelectedList', this.editor.getSelectedList());
      });

      this.editor.on('delete_complete', evtResult => {
        console.log('evtName', evtResult);
      });
      // this.map.destroy(); // 销毁地图
      // this.EditFlag = true;
      // this.initMap(this.TMap);
      // this.editor.removeOverlay('polygon');
      // this.editor.setActionMode(this.TMap.tools.constants.EDITOR_ACTION.INTERACT);
    },
    setMapCenter (location) {
      if (this.map) {
        this.map.setCenter(new this.TMap.LatLng(location.lat, location.lng));
      }
    },
    /**
     * @Description 添加位置标示
     * @author qianyinggenian
     * @date 2023/6/5
     */
    addMultiMarker (params) {
      if (!this.TMap) {
        return;
      }

      if (!(params.lat || params.lng)) {
        return;
      }

      if (this.MultiMarker) {
        this.MultiMarker.setMap(null);
      }

      this.MultiMarker = new this.TMap.MultiMarker({
        map: this.map,
        styles: {
          markerStyle: new this.TMap.MarkerStyle({
            color: 'rgba(178, 208, 242, 0.5)',
            showBorder: true,
            borderColor: 'rgba(178, 208, 242, 0.4)',
            borderWidth: 2
          })
        },
        enableCollision: true,
        geometries: [{
          styleId: 'MultiMarker',
          position: new this.TMap.LatLng(params.lat, params.lng),
          rank: 1
        }]
      });
    },
    /**
     * @Description 绘制打卡范围
     * @author qianyinggenian
     * @date 2023/6/5
     */
    addCircle (params) {
      if (!this.TMap) {
        return;
      }

      if (!(params.lat || params.lng)) {
        return;
      }

      if (this.circle) {
        this.circle.setMap(null);
      }

      this.circle = new this.TMap.MultiCircle({
        map: this.map,
        styles: {
          circle: new this.TMap.CircleStyle({
            color: 'rgba(41, 91, 255, 0.16)',
            showBorder: true,
            borderColor: 'rgba(41, 91, 255, 1)',
            borderWidth: 2
          })
        },
        geometries: [{
          styleId: 'circle',
          center: new this.TMap.LatLng(params.lat, params.lng),
          // radius: Number(params.radius) * 1000
          radius: Number(params.radius)
        }]
      });
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  overflow-x: hidden;
  //.btns-box {
  //  position: absolute;
  //  bottom: 10px;
  //  display: flex;
  //  width: 100%;
  //  align-items: center;
  //  justify-content: center;
  //  .btn {
  //    margin-left: 8px;
  //  }
  //}
  .btn {
    margin-left: 8px;
  }
  .el-select {
    width: 100%;
  }

  .map-container {
    height: calc(100% - 100px);
    width: 100%;
    position: relative;

    .toolControl {
      position: absolute;
      top: 10px;
      left: 0;
      right: 0;
      margin: auto;
      width: 252px;
      z-index: 2002;
      .toolItem {
        width: 30px;
        height: 30px;
        float: left;
        margin: 1px;
        padding: 4px;
        border-radius: 3px;
        background-size: 30px 30px;
        background-position: 4px 4px;
        background-repeat: no-repeat;
        box-shadow: 0 1px 2px 0 #e4e7ef;
        background-color: #ffffff;
        border: 1px solid #ffffff;
        &:hover {
          border-color: #789cff;
        }
      }
      #polygon {

        background-image: url("./img/polygon.png");
      }
      .active {
        border-color: #d5dff2;
        background-color: #d5dff2;
      }
    }

    #map {
      height: 100%;
      width: 100%;
    }

    .panel {
      top: 40px;
      left: 30px;
      //width:350px;
      padding: 5px;
      z-index: 9999;
      background: #FFF;
      border-radius: 5px;
      position: absolute;
    }

    .tips {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #d9d9d9;
    }
  }
}
</style>
