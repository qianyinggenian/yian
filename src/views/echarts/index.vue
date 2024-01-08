<template>
  <div class="echarts-container">
    <div class="map" ref="map">1111</div>
  </div>
</template>

<script>

export default {
  name: 'index',
  components: {},
  data () {
    return {
      mapJson: require('./Json/China.json'),
      echarts: null

    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
    this.$nextTick(() => {
      this.init();
    });
    // this.chartMap();
  },
  methods: {

    init () {
      if (!this.echarts) {
        this.echarts = this.$echarts.init(this.$refs.map);
        this.echarts.hideLoading();
        this.$echarts.registerMap('China', this.mapJson);
        const option = {
          visualMap: {
            type: 'continuous',
            left: 'right',
            min: 0,
            text: ['多', '少'],
            inRange: {
              color: [
                '#d6e7fc',
                '#d1e4fb',
                '#c8dffa',
                '#bcd7f8',
                '#bbd6f8',
                '#a0c6f3',
                '#9ac2f1',
                '#7eb0ec',
                '#77aceb',
                '#70a7ea',
                '#66a2e8',
                '#5c9be6',
                '#468de2',
                '#3f89e1',
                '#3482de',
                '#2f7fde',
                '#2579dc'
              ],
              symbol: ['circle']
            },
            calculable: false,
            indicatorIcon: 'circle'
          },
          grid: {
            left: '10px',
            right: '10px',
            top: '10px',
            bottom: '10px'
          },
          geo3D: {
            show: true,
            map: 'China',
            roam: true,
            // regionHeight: 5,
            itemStyle: {
              // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
              color: '#0a599f', // 地图板块的颜色
              opacity: 1, // 图形的不透明度 [ default: 1 ]
              borderWidth: 2, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
              borderColor: '#377CC5', // 图形描边的颜色。[ default: #333 ]
              areaColor: '#fff'
            },
            label: {
              show: true,
              position: 'top',
              formatter: function ({ name }) {
                console.log(name);
                return `${name} `; // 注意name后加了空格
              },
              color: '#fff', // 地图初始化区域字体颜色
              fontSize: 14,
              lineHeight: 16
            },
            emphasis: {
              label: {
                show: true,
                color: '#fff000'
              }

            },
            postEffect: {
              enable: true,
              bloom: {
                enable: false
              },
              SSAO: {
                enable: true,
                quality: 'medium',
                radius: 10,
                intensity: 1.2
              },
              depthOfField: {
                enable: false,
                focalRange: 5,
                fstop: 1,
                blurRadius: 6
              }
            },
            groundPlane: {
              show: true,
              color: '#333'
            },
            light: {
              main: {
                intensity: 6,
                shadow: true,
                shadowQuality: 'high',
                alpha: 30
              },
              ambient: {
                intensity: 0
              },
              ambientCubemap: {
                texture: 'https://echarts.apache.org/examples/data-gl/asset/canyon.hdr',
                exposure: 2,
                diffuseIntensity: 1,
                specularIntensity: 1
              }
            },
            regions: [
              {
                label: '新疆维吾尔自治区',
                value: 1200,
                height: 5,
                regionHeight: 5,
                itemStyle: {
                  color: '#afd',
                  areaColor: '#afd'
                }
              },
              {
                label: '西藏自治区',
                value: 1200,
                height: 3,
                regionHeight: 3,
                itemStyle: {
                  color: '#afd'
                }
              },
              {
                label: '青海省',
                value: 1200,
                height: 4,
                regionHeight: 4,
                itemStyle: {
                  color: '#afd'
                }
              },
              {
                label: '四川省',
                value: 1200,
                height: 10,
                regionHeight: 10,
                itemStyle: {
                  color: '#afd'
                }
              },
              {
                label: '云南省',
                value: 1200,
                height: 6,
                regionHeight: 6,
                itemStyle: {
                  color: '#afd'
                }
              },
              {
                label: '甘肃省',
                value: 1200,
                height: 5,
                regionHeight: 5,
                itemStyle: {
                  color: '#afd'
                }
              },
              {
                label: '宁夏回族自治区',
                value: 1200,
                height: 4,
                regionHeight: 4,
                itemStyle: {
                  color: '#afd'
                }
              },
              {
                label: '贵州省',
                value: 800,
                height: 9,
                regionHeight: 9,
                itemStyle: {
                  color: '#dfb'
                }
              },
              {
                label: '重庆市',
                value: 800,
                height: 9,
                regionHeight: 9,
                itemStyle: {
                  color: '#dfb'
                }
              },
              {
                label: '陕西省',
                value: 800,
                height: 8,
                regionHeight: 8,
                itemStyle: {
                  color: '#dfb'
                }
              },
              {
                label: '陕西省',
                value: 800,
                height: 5,
                regionHeight: 5,
                itemStyle: {
                  color: '#dfb'
                }
              },
              {
                label: '海南省',
                value: 1000,
                height: 6,
                regionHeight: 6,
                itemStyle: {
                  color: '#dff'
                }
              },
              {
                label: '广东省',
                value: 2200,
                height: 15,
                regionHeight: 15,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '香港特别行政区',
                value: 2200,
                height: 8,
                regionHeight: 8,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '澳门特别行政区',
                value: 2200,
                height: 7,
                regionHeight: 7,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '台湾省',
                value: 2200,
                height: 7,
                regionHeight: 7,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '福建省',
                value: 2200,
                height: 5,
                regionHeight: 5,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '江西省',
                value: 2200,
                height: 4,
                regionHeight: 4,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '湖南省',
                value: 2200,
                height: 12,
                regionHeight: 12,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '浙江省',
                value: 2200,
                height: 10,
                regionHeight: 10,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '安徽省',
                value: 2200,
                height: 5,
                regionHeight: 5,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '湖北省',
                value: 2200,
                height: 7,
                regionHeight: 7,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '河南省',
                value: 2200,
                height: 6,
                regionHeight: 6,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '江苏省',
                value: 2200,
                height: 11,
                regionHeight: 11,
                itemStyle: {
                  color: '#fdf'
                }
              },
              {
                label: '北京市',
                value: 1200,
                height: 11,
                regionHeight: 11,
                itemStyle: {
                  color: '#afd'
                }
              },
              {
                label: '上海市',
                value: 1200,
                height: 9,
                regionHeight: 9,
                itemStyle: {
                  color: '#ffd'
                }
              },
              {
                label: '山东省',
                value: 1200,
                height: 6,
                regionHeight: 6,
                itemStyle: {
                  color: '#afd'
                }
              },
              {
                label: '山西省',
                value: 1200,
                height: 4,
                regionHeight: 4,
                itemStyle: {
                  color: '#ffd'
                }
              },
              {
                label: '河北省',
                value: 1200,
                height: 3,
                regionHeight: 3,
                itemStyle: {
                  color: '#ffd'
                }
              },
              {
                label: '内蒙古自治区',
                value: 1200,
                height: 2,
                regionHeight: 2,
                itemStyle: {
                  color: '#ffd'
                }
              },
              {
                label: '天津市',
                value: 1200,
                height: 8,
                regionHeight: 8,
                itemStyle: {
                  color: '#ffd'
                }
              },
              {
                label: '辽宁省',
                value: 1200,
                height: 7,
                regionHeight: 7,
                itemStyle: {
                  color: '#ffd'
                }
              },
              {
                label: '吉林省',
                value: 1200,
                height: 9,
                regionHeight: 9,
                itemStyle: {
                  color: '#ffd'
                }
              },
              {
                label: '黑龙江省',
                value: 1200,
                height: 5,
                regionHeight: 5,
                itemStyle: {
                  color: '#ffd'
                }
              }
            ]
          }
          // geo3D: {
          //   map: 'China',
          //   roam: true,
          //   itemStyle: {
          //     color: '#0a599f',
          //     borderWidth: 0.4,
          //     borderColor: '#000'
          //     // color: '#fff'
          //   },
          //   viewControl: {
          //     autoRotate: false,
          //     autoRotateAfterStill: 3,
          //     distance: 120,
          //     minAlpha: 5, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
          //     maxAlpha: 90, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
          //     minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
          //     maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
          //     animation: true, // 是否开启动画。[ default: true ]
          //     animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
          //     animationEasingUpdate: 'cubicInOut' // 过渡动画的缓动效果。[ default: cubicInOut ]
          //   },
          //
          //   emphasis: {
          //     disabled: true, // 是否可以被选中
          //     label: {
          //       // 移入时的高亮文本
          //       show: true,
          //       color: '#333', // 显示字体颜色变淡
          //       fontSize: 18 // 显示字体变大
          //     },
          //     itemStyle: {
          //       color: '#ff7aff' // 显示移入的区块变粉色
          //     }
          //   },
          //   label: {
          //     show: true,
          //     formatter: function ({ name }) {
          //       console.log(name);
          //       return `${name} `; // 注意name后加了空格
          //     },
          //     // position: 'top',
          //     // color: '#fff', // 地图初始化区域字体颜色
          //     // fontSize: 14,
          //     // lineHeight: 16,
          //     textStyle: {
          //       color: '#fff', // 地图初始化区域字体颜色
          //       fontSize: 12,
          //       opacity: 1,
          //       backgroundColor: 'rgba(0,23,11,0)'
          //     }
          //   },
          //   shading: 'lambert',
          //   light: {
          //     // 光照阴影
          //     main: {
          //       // color: "#fff", //光照颜色
          //       intensity: 1, // 光照强度
          //       // shadowQuality: 'high', //阴影亮度
          //       shadow: true, // 是否显示阴影
          //       shadowQuality: 'medium', // 阴影质量 ultra //阴影亮度
          //       alpha: 55,
          //       beta: 10
          //     },
          //     ambient: {
          //       intensity: 0.7
          //     }
          //   },
          //   regions: [
          //     {
          //       name: '北京',
          //       value: 1200,
          //       label: {
          //         show: true
          //       }
          //     },
          //     {
          //       name: '上海市',
          //       value: 1200
          //     }
          //   ]
          // },
        };
        this.echarts.setOption(option);
        window.addEventListener('resize', () => {
          this.echarts.resize();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.echarts-container {
  width: 100%;
  height: 100%;
  //background-color: white;

  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
