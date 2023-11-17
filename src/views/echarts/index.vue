<template>
  <div class="echarts-container">
    <div class="map" ref="map">1111</div>
  </div>
</template>

<script>
// import axios from 'axios';
// import
// const mapJson = '/static/Json/China.json;
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
    this.init();
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
          series: [
            {
              type: 'map',
              map: 'China',
              name: '中国',
              left: '10px',
              right: '10px',
              top: '10px',
              bottom: '20px',
              label: {
                show: true
              },
              emphasis: {
                label: {
                  show: true
                },
                itemStyle: {
                  // areaColor: '#FF7401'
                }
              },
              select: {
                itemStyle: {
                  areaColor: '#FFC837'
                }
              },
              roam: false,
              data: []
              // data: list.map(item => {
              //   item.name = item.name.replace('市', '');
              //   item.value = item.unitNum;
              //   return item;
              // })
            }
          ]
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
