
<template>
  <proxy-dialog
      :visible.sync="isShow"
    :title="title"
    :z-index="2000"
    height="70%"
    width="70%"
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
        <el-button   size="small" plain>重画</el-button>
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
      row: {},
      formData: {},
      suggestions: [],
      initialization: false,
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
     * @author wangkangzhang
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
     * @author wangkangzhang
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
        const location = {
          lat: this.row.latitude,
          lng: this.row.longitude,
          radius: this.row.radius
        };
        this.setMapCenter(location);
        this.addCircle(location);
        this.addMultiMarker(location);
      });
      return map;
    },

    setMapCenter (location) {
      if (this.map) {
        this.map.setCenter(new this.TMap.LatLng(location.lat, location.lng));
      }
    },
    /**
     * @Description 添加位置标示
     * @author wangkangzhang
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
     * @author wangkangzhang
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
