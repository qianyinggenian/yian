<template>
  <proxyCarousel
      ref="proxyCarousel"
      :carouselList="carouselList"
      :autoplay="true"
      arrow="always"
      active-color="#CB4042"
  >
    <template v-slot:slotName="{row}">
      <div class="div-box">
        <div class="left">
          <img :src="row" alt="">
        </div>
      </div>
    </template>
  </proxyCarousel>
</template>
<script>
import proxyCarousel from '@/components/proxyCarousel/index.vue';
export default {
  components: {
    proxyCarousel
  },
  data () {
    return {
      transitionName: 'slide-left',
      carouselList: [
        require('../../assets/45.jpg'),
        require('../../assets/56.jpeg'),
        require('../../assets/login.jpg'),
        require('../../assets/55.jpeg'),
        require('../../assets/广州塔.jpg')
      ]
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
  },
  methods: {
  }
};
</script>
<style scoped lang="scss">
.div-box {
  display: flex;
  width: 100%;
  height: 100%;
  > div {
    height: 100%;
    flex: 1;
    flex-shrink: 0;
  }
}
</style>
