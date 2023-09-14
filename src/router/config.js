import test2 from '@/views/test2/index.vue';
import redirectComp from '../views/redirect';

export const config = [
  {
    path: '/test2',
    name: 'test2',
    component: test2,
    meta: {
      title: '测试'
    }
  },
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
      }
    ]
  }
];
