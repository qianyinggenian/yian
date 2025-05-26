<script>
import ScrollableElMenu from './ScrollableElMenu.vue';

export default {
  name: 'index',
  components: { ScrollableElMenu },
  data () {
    return {
      activeIndex: '2-1-1-3',
      menuItems: [
        {
          index: '1',
          id: '1',
          name: '首页'
        },
        {
          index: '2',
          id: '2',
          name: '产品中心',
          children: [
            {
              index: '2-1',
              id: '2-1',
              name: '产品分类1',
              children: [
                {
                  index: '2-1-1',
                  id: '2-1-1',
                  name: '产品分类2-1-1',
                  children: [
                    {
                      index: '2-1-1-1',
                      id: '2-1-1-1',
                      name: '产品分类2-1-1-1'
                    },
                    {
                      index: '2-1-1-2',
                      id: '2-1-1-2',
                      name: '产品分类2-1-1-2'
                    },
                    {
                      index: '2-1-1-3',
                      id: '2-1-1-3',
                      name: '产品分类2-1-1-3'
                    }
                  ]
                },
                {
                  index: '2-1-2',
                  id: '2-1-2',
                  name: '产品分类2-1-2'
                },
                {
                  index: '2-1-3',
                  id: '2-1-3',
                  name: '产品分类2-1-3'
                }
              ]
            },
            {
              index: '2-2',
              id: '2-2',
              name: '产品分类2'
            },
            {
              index: '2-3',
              id: '2-3',
              name: '产品分类3'
            }
          ]
        },
        {
          index: '3',
          id: '3',
          name: '解决方案',
          children: [
            {
              index: '3-1',
              id: '3-1',
              name: '方案一',
              children: [
                { index: '3-1-1', id: '3-1-1', name: '方案一3-1-1' },
                { index: '3-1-1', id: '3-1-2', name: '方案二3-1-2' },
                { index: '3-1-3', id: '3-1-3', name: '方案三3-1-3' }
              ]
            },
            { index: '3-2', id: '3-2', name: '方案二' },
            { index: '3-3', id: '3-3', name: '方案三' }
          ]
        },
        {
          index: '4',
          id: '4',
          name: '案例展示',
          children: [
            { index: '4-1', id: '4-1', name: '案例展示1' },
            { index: '4-2', id: '4-2', name: '案例展示2' },
            { index: '4-3', id: '4-3', name: '案例展示3' },
            { index: '4-4', id: '4-4', name: '案例展示4' }
          ]
        },
        {
          index: '5',
          id: '5',
          name: '关于我们',
          children: [
            { index: '5-1', id: '5-1', name: '公司简介' },
            { index: '5-2', id: '5-2', name: '发展历程' },
            { index: '5-3', id: '5-3', name: '企业文化' },
            { index: '5-4', id: '5-4', name: '团队介绍' }
          ]
        },
        { index: '6', id: '6', name: '联系我们6' },
        { index: '7', id: '7', name: '联系我们7' },
        { index: '8', id: '8', name: '联系我们8' },
        { index: '9', id: '9', name: '联系我们9' },
        { index: '10', id: '10', name: '联系我们10' },
        { index: '11', id: '11', name: '联系我们11' },
        { index: '12', id: '12', name: '联系我们12' },
        { index: '13', id: '13', name: '联系我们13' },
        { index: '14', id: '14', name: '联系我们14' },
        { index: '15', id: '15', name: '联系我们15' },
        { index: '16', id: '16', name: '联系我们16' },
        { index: '17', id: '17', name: '联系我们17' },
        { index: '18', id: '18', name: '联系我们18' },
        { index: '19', id: '19', name: '联系我们19' },
        { index: '20', id: '20', name: '联系我们20' },
        { index: '21', id: '21', name: '联系我们21' },
        { index: '22', id: '22', name: '联系我们22' },
        { index: '23', id: '23', name: '联系我们23' },
        { index: '24', id: '24', name: '联系我们24' },
        { index: '25', id: '25', name: '联系我们25' },
        { index: '26', id: '26', name: '联系我们26' },
        { index: '27', id: '27', name: '联系我们27' },
        { index: '28', id: '28', name: '联系我们28' },
        { index: '29', id: '29', name: '联系我们29' },
        { index: '30', id: '30', name: '联系我们30' },
        { index: '31', id: '31', name: '联系我们31' },
        { index: '32', id: '32', name: '联系我们32' },
        { index: '33', id: '33', name: '联系我们33' },
        { index: '34', id: '34', name: '联系我们34' },
        { index: '35', id: '35', name: '联系我们35' }
      ]
    };
  },
  methods: {
    handleMenuSelect (index) {
      this.activeIndex = index;
      console.log('index', index);
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
