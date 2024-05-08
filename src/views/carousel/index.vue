<template>
  <proxyCarousel
      ref="proxyCarousel"
      :carouselList="carouselList"
      :autoplay="true"
      arrow="always"
      direction="horizontal"
      dot-position="bottom"
  >
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
::v-deep .active-indicator {
  background: #CB4042 !important;
}
</style>
