import test2 from '@/views/test2/index.vue';
import redirectComp from '../views/redirect';

export const config = [
  {
    path: '/test1',
    name: 'test1',
    component: test2,
    meta: {
      title: '测试1'
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
    path: '/test3',
    name: 'test3',
    component: test2,
    meta: {
      title: '测试3'
    }
  },
  {
    path: '/test4',
    name: 'test4',
    component: test2,
    meta: {
      title: '测试4'
    }
  },
  {
    path: '/test5',
    name: 'test5',
    component: test2,
    meta: {
      title: '测试5'
    }
  },
  {
    path: '/test6',
    name: 'test6',
    component: test2,
    meta: {
      title: '测试6'
    }
  },
  {
    path: '/test7',
    name: 'test7',
    component: test2,
    meta: {
      title: '测试7'
    }
  },
  {
    path: '/test8',
    name: 'test8',
    component: test2,
    meta: {
      title: '测试8'
    }
  },
  {
    path: '/test9',
    name: 'test9',
    component: test2,
    meta: {
      title: '测试9'
    }
  },
  {
    path: '/test10',
    name: 'test10',
    component: test2,
    meta: {
      title: '测试10'
    }
  },
  {
    path: '/test11',
    name: 'test11',
    component: test2,
    meta: {
      title: '测试11'
    }
  },
  {
    path: '/test12',
    name: 'test12',
    component: test2,
    meta: {
      title: '测试12'
    }
  },
  {
    path: '/test13',
    name: 'test13',
    component: test2,
    meta: {
      title: '测试13'
    }
  },
  {
    path: '/test14',
    name: 'test14',
    component: test2,
    meta: {
      title: '测试14'
    }
  },
  {
    path: '/test15',
    name: 'test15',
    component: test2,
    meta: {
      title: '测试15'
    }
  },
  {
    path: '/test16',
    name: 'test16',
    component: test2,
    meta: {
      title: '测试16'
    }
  },
  {
    path: '/test17',
    name: 'test17',
    component: test2,
    meta: {
      title: '测试17'
    }
  },
  {
    path: '/test18',
    name: 'test18',
    component: test2,
    meta: {
      title: '测试18'
    }
  },
  {
    path: '/test19',
    name: 'test19',
    component: test2,
    meta: {
      title: '测试19'
    }
  },
  {
    path: '/test20',
    name: 'test20',
    component: test2,
    meta: {
      title: '测试20'
    }
  },
  {
    path: '/test21',
    name: 'test21',
    component: test2,
    meta: {
      title: '测试21'
    }
  },
  {
    path: '/test22',
    name: 'test22',
    component: test2,
    meta: {
      title: '测试22'
    }
  },
  {
    path: '/test23',
    name: 'test23',
    component: test2,
    meta: {
      title: '测试23'
    }
  },
  {
    path: '/test24',
    name: 'test24',
    component: test2,
    meta: {
      title: '测试24'
    }
  },
  {
    path: '/test25',
    name: 'test25',
    component: test2,
    meta: {
      title: '测试25'
    }
  },
  {
    path: '/test26',
    name: 'test26',
    component: test2,
    meta: {
      title: '测试26'
    }
  },
  {
    path: '/test27',
    name: 'test27',
    component: test2,
    meta: {
      title: '测试27'
    }
  },
  {
    path: '/test28',
    name: 'test28',
    component: test2,
    meta: {
      title: '测试28'
    }
  },
  {
    path: '/test29',
    name: 'test29',
    component: test2,
    meta: {
      title: '测试29'
    }
  },
  {
    path: '/test230',
    name: 'test30',
    component: test2,
    meta: {
      title: '测试30'
    }
  },
  {
    path: '/test31',
    name: 'test31',
    component: test2,
    meta: {
      title: '测试31'
    }
  },
  {
    path: '/test32',
    name: 'test32',
    component: test2,
    meta: {
      title: '测试32'
    }
  },
  {
    path: '/test33',
    name: 'test33',
    component: test2,
    meta: {
      title: '测试32测试32测试33'
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
  }
];
