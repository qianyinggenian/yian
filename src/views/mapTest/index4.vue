<template>
  <div class="add-edit-container">

    <div style="display: flex; height: calc(100% - 48px);">
      <div style="flex: 0 0 50%; padding-right: 6px;">
        <el-form :model="formData" ref="ctForm" label-position="right" label-width="150px" >
          <div>
            <el-row class="row">
              <el-col :span="24">
                <el-form-item label="地点坐标：" prop="locationName" >
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
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="24">
                <el-form-item label="围栏范围："  :title="formData.radius" prop="radius" >
                  <el-input placeholder="请输入" clearable v-model="formData.radius" :disabled="readonly">
                    <template slot="append">千米</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="24">
                <el-form-item label="启用状态：" prop="status" >
                  <el-select :disabled="readonly" v-model="formData.status" placeholder="请选择">
                    <el-option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="24">
                <el-form-item label="是否需要刷脸验证：" prop="faceAuthFlag" >
                  <el-select :disabled="readonly" v-model="formData.faceAuthFlag" placeholder="请选择">
                    <el-option
                        v-for="item in yesOrNoOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="24">
                <el-form-item label="启用时间：" prop="time" >
                  <el-time-picker
                      v-model="formData.time"
                      :disabled="readonly"
                      is-range
                      format="HH:mm"
                      value-format="HH:mm"
                      range-separator="——"
                      start-placeholder="开始"
                      end-placeholder="结束"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="24">
                <el-form-item label="适用人员：" prop="type">
                  <el-select :disabled="readonly" v-model="formData.type" placeholder="请选择" >
                    <el-option
                        v-for="item in userTypeOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="24">
                <el-form-item label="" prop="objectIds" >

                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <div style="flex: 0 0 50%; position: relative;">
        <div id="map-container" v-show="isShowMap" style="width: 100%; height: 100%;"></div>

        <div class="tips" v-show="!isShowMap">
          <el-empty description="地图加载失败，请刷新或清理缓存后再重试">
          </el-empty>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import AMapLoader from '@amap/amap-jsapi-loader';
// import markerUrl from '@/common/images/marker.png';
import { mk } from '@/common/js/mk';

window._AMapSecurityConfig = {
  securityJsCode: mk.s
};
let AMapCtor;
let mapInstance;
let autoComplete;
export default {
  name: 'AddEdit',
  components: {

  },
  data () {
    this.dataStore = {};
    return {
      type: '',
      params: '',
      keyword: '',
      readonly: false,
      isShowMap: true,
      radiusOptions: [],
      statusOptions: [],
      userTypeOptions: [],
      yesOrNoOptions: [],
      operateBtns: [],
      navigateMenus: [],
      showMapSearch: false,
      formData: {
        time: null,
        locationName: '',
        objectIds: []
      },
      areaData: [],
      userTree: null,
      suggestions: [],
      initialization: false,
      mapCenter: [113.264499, 23.130061],
      hadLoadMap: false,
      isFlag: false,
      validateNum: {
        validator: (rule, value, callback) => {
          setTimeout(() => {
            // eslint-disable-next-line
            const reg = /^([1-9]\d*)(\.\d*)?$|^0\.\d*?$/;
            if (!reg.test(value)) {
              callback(new Error('请输入大于0且小于100的数'));
            } else {
              if (Number(value) <= 0 || Number(value) >= 100) {
                callback(new Error('请输入大于0且小于100的数'));
              } else {
                callback();
              }
            }
          }, 500);
        },
        trigger: 'blur'
      }
    };
  },
  watch: {
    'formData.radius': {
      handler (val) {
        this.onRadiusChange();
      }
    }
  },
  async mounted () {
    await this.initAMap();
  },
  methods: {
    initAMap (item) {
      AMapLoader.load({
        key: mk.k, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Scale', 'AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.ToolBar', 'AMap.ControlBar'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          AMapCtor = AMap;
          mapInstance = new AMap.Map('map-container', {
            // 设置地图容器id
            viewMode: '3D', // 是否为3D地图模式
            zoom: 15, // 初始化地图级别
            center: this.mapCenter // 初始化地图中心点位置
          });
          mapInstance.addControl(new AMap.Scale()); // 比例尺
          mapInstance.addControl(new AMap.ToolBar()); // 缩放工具条
          mapInstance.addControl(new AMap.ControlBar()); // 控制罗盘
          const autoOptions = {
            // city 限定城市，默认全国
            city: '全国'
          };
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

    onRadiusChange () {
      const { latitude, longitude, radius } = this.formData;

      this.addCircle({
        lat: latitude,
        lng: longitude,
        radius
      });
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
      const { lat, lng } = location;

      Object.assign(this.formData, {
        locationName: name,
        latitude: lat,
        longitude: lng
      });
      this.mapCenter = [lng, lat];
      this.setMapCenter(this.mapCenter);
      this.addMarker(this.mapCenter);
      if (this.formData.radius) {
        this.addCircle({
          ...location,
          radius: Number(this.formData.radius) || 1
        });
      }
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
    /**
     * @Description 添加标记
     * @author qianyinggenian
     * @date 2024/9/26
     */
    addMarker (position) {
      if (this.marker) {
        this.marker.setMap(null);
        this.marker = null;
      }
      // 创建标注
      this.marker = new AMapCtor.Marker({
        position,
        offset: new AMapCtor.Pixel(-17, -50),
        icon: new AMapCtor.Icon({
          size: new AMapCtor.Size(34, 50), // 设置图标的大小
          image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png', // 设置自定义图标路径
          imageSize: new AMapCtor.Size(34, 50) //
        })
      });

      // 将标注添加到地图中
      mapInstance.add(this.marker);
    },
    /**
     * @Description 添加范围-圆形
     * @author wangkangzhang
     * @date 2024/9/26
     */
    addCircle (params) {
      const { radius, lng, lat } = params;
      const center = [lng, lat];
      if (this.circle) {
        // 如果已经有圆形，则先从地图上移除
        mapInstance.remove(this.circle);
      }
      if (!AMapCtor) {
        return;
      }

      if (!(params.lat || params.lng || radius)) {
        return;
      }
      this.circle = new AMapCtor.Circle({
        center: center,
        radius: radius * 1000, // 半径，单位为米
        borderWeight: 3,
        strokeColor: '#0051ff', // 轮廓线颜色
        strokeWeight: 3, // 轮廓线宽度
        strokeOpacity: 0.2, // 轮廓线透明度
        fillOpacity: 0.25, // 填充透明度
        strokeStyle: 'solid', // 轮廓线样式，实线:solid，虚线:dashed
        fillColor: '#0051ff', // 填充颜色
        zIndex: 50
      });

      mapInstance.add(this.circle);
      mapInstance.setFitView([this.circle]);
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
    },

    getAreaLabels () {
      const cascaderRef = this.$refs.cascaderRef;

      if (cascaderRef) {
        const nodes = cascaderRef.getCheckedNodes(true);

        if (nodes.length) {
          return nodes[0].pathNodes.map(value => value.label);
        }
      }
      return [];
    },

    /** 返回 */
    returnFn () {
      this.$emit('toList');
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
.select-unit-group {
  display: flex;

  .unit {
    display: block;
    width: 60px;
    height: 32px;
    line-height: 30px !important;
    text-align: center;
    border: 1px solid #d9d9d9;
    background-color: #f5f5f5;
  }
}
.el-autocomplete {
  width: 100%;
}

.tips {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f5f5f5;
}
</style>
