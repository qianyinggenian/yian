<script>
import ScrollableElMenu from './ScrollableElMenu.vue';

export default {
  name: 'index',
  components: { ScrollableElMenu },
  data () {
    return {
      activeIndex: '1',
      menuItems: [
        { index: '1', label: '首页' },
        { index: '2', label: '产品中心' },
        { index: '3', label: '解决方案' },
        { index: '4', label: '案例展示' },
        { index: '5', label: '关于我们' },
        { index: '6', label: '联系我们6' },
        { index: '7', label: '联系我们7' },
        { index: '8', label: '联系我们8' },
        { index: '9', label: '联系我们9' },
        { index: '10', label: '联系我们10' },
        { index: '11', label: '联系我们11' },
        { index: '12', label: '联系我们12' },
        { index: '13', label: '联系我们13' },
        { index: '14', label: '联系我们14' },
        { index: '15', label: '联系我们15' },
        { index: '16', label: '联系我们16' },
        { index: '17', label: '联系我们17' },
        { index: '18', label: '联系我们18' },
        { index: '19', label: '联系我们19' },
        { index: '20', label: '联系我们20' },
        { index: '21', label: '联系我们21' },
        { index: '22', label: '联系我们22' },
        { index: '23', label: '联系我们23' },
        { index: '24', label: '联系我们24' },
        { index: '25', label: '联系我们25' },
        { index: '26', label: '联系我们26' },
        { index: '27', label: '联系我们27' },
        { index: '28', label: '联系我们28' },
        { index: '29', label: '联系我们29' },
        { index: '30', label: '联系我们30' },
        { index: '31', label: '联系我们31' },
        { index: '32', label: '联系我们32' },
        { index: '33', label: '联系我们33' },
        { index: '34', label: '联系我们34' },
        { index: '35', label: '联系我们35' }
        // 可以添加更多菜单项...
      ]
    };
  },
  methods: {
    handleMenuSelect (index) {
      this.activeIndex = index;
    }
  }
};
</script>

<template>
  <div class="container">
    <ScrollableElMenu
        :menuItems="menuItems"
        :activeIndex="activeIndex"
        @select="handleMenuSelect"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
}
</style>
