import test from '@/views/test/index.vue';
import test2 from '@/views/test2/index.vue';
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
    path: '/test2',
    name: 'test2',
    component: test2,
    meta: {
      title: '测试2'
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
  },
  {
    path: '/proxy-layout',
    name: 'proxy-layout',
    component: () => import('@/views/proxy-layout/index.vue'),
    meta: {
      title: 'proxy-layout'
    }
  },

  {
    path: '/watermark',
    name: 'watermark',
    meta: {
      title: '图片水印'
    },
    component: redirectComp,
    children: [
      {
        path: '/image-watermark',
        name: '/image-watermark',
        component: () => import('@/views/imageWatermark/index.vue'),
        meta: {
          title: '图片水印1'
        }
      },
      {
        path: '/watermark',
        name: 'watermark',
        component: () => import('@/views/imageWatermark/index2.vue'),
        meta: {
          title: '图片水印2'
        }
      }
    ]
  },

  {
    path: '/pdf',
    name: 'pdf',
    meta: {
      title: 'PDF'
    },
    component: redirectComp,
    children: [
      {
        path: '/pdfWatermark',
        name: 'pdfWatermark',
        component: () => import('@/views/pdfWatermark/index.vue'),
        meta: {
          title: 'pdf水印'
        }
      },
      {
        path: '/PDFMerge',
        name: 'PDFMerge',
        component: () => import('@/views/PDFMerge/index.vue'),
        meta: {
          title: 'pdf合并'
        }
      }
    ]
  },
  {
    path: '/novel',
    name: 'novel',
    component: () => import('@/views/novel/index.vue'),
    meta: {
      title: '阅读'
    }
  },
  {
    path: '/dragView',
    name: 'dragView',
    component: () => import('@/views/dragView/index.vue'),
    meta: {
      title: '拖拽'
    }
  },
  {
    path: '/parallaxScrolling',
    name: 'parallaxScrolling',
    component: () => import('@/views/parallaxScrolling/index.vue'),
    meta: {
      title: '视差滚动'
    }
  },
  {
    path: '/carousel',
    name: 'carousel',
    component: () => import('@/views/carousel/index.vue'),
    meta: {
      title: 'carousel走马灯'
    }
  },
  {
    path: '/videoWatermark',
    name: 'videoWatermark',
    component: () => import('@/views/videoWatermark/index.vue'),
    meta: {
      title: '视频水印'
    }
  }
];
