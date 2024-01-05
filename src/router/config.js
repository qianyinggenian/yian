import test from '@/views/test/index.vue';
import redirectComp from '../views/redirect';

export const config = [
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '基础设置'
    },
    component: redirectComp,
    children: [
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/index.vue'),
        meta: {
          title: '导航设置'
        }
      },
      {
        path: '/permission',
        name: 'permission',
        component: () => import('@/views/permission/index.vue'),
        meta: {
          title: '权限设置'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '用户管理'
        }
      }
    ]
  },
  {
    path: '/table',
    name: '表格',
    component: () => import('@/views/proxyTable/index.vue'),
    meta: {
      title: '表格'
    }
  },
  {
    path: '/test',
    name: 'test',
    component: test,
    meta: {
      title: '测试'
    }
  },
  {
    path: '/animation',
    name: 'animation',
    component: () => import('@/views/animation/index.vue'),
    meta: {
      title: '动画'
    }
  },
  {
    path: '/Excel',
    name: 'Excel',
    component: () => import('@/views/excelJs/index.vue'),
    meta: {
      title: 'Excel'
    }
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('@/views/echarts/index.vue'),
    meta: {
      title: 'echarts'
    }
  },
  {
    path: '/formatConversion',
    name: 'formatConversion',
    component: () => import('@/views/formatConversion/index.vue'),
    meta: {
      title: '直播源格式转化'
    }
  }
];
