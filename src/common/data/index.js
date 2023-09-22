export const menuTree = [
  {
    id: 'root',
    parentId: 'root',
    parentIds: 'root',
    text: '系统设置',
    code: 'setting',
    actionUrl: '',
    type: 'DeptRoot',
    showOperatePrivilege: true,
    effectiveFlag: '1',
    iconSkin: 'el-icon-s-home',
    chkDisabled: false,
    checked: false,
    open: true,
    nocheck: false
  },
  {
    id: '8a7480426fa34894016fa721b5c000f1',
    parentId: 'root',
    parentIds: 'root',
    text: '基础设置',
    code: 'BasicSettings',
    actionUrl: '',
    type: 'DeptRoot',
    showOperatePrivilege: true,
    effectiveFlag: '1',
    iconSkin: 'el-icon-s-home',
    chkDisabled: false,
    checked: false,
    open: true,
    nocheck: false
  },
  {
    id: '8a7480426fa34894016fa721b5c000f2',
    parentId: '8a7480426fa34894016fa721b5c000f1',
    parentIds: 'root,8a7480426fa34894016fa721b5c000f1',
    text: '导航设置',
    code: 'menuSetting',
    actionUrl: '',
    type: 'DeptRoot',
    showOperatePrivilege: true,
    effectiveFlag: '1',
    iconSkin: 'el-icon-s-home',
    chkDisabled: false,
    checked: false,
    open: true,
    nocheck: false
  },
  {
    id: '8a7480426fa34894016fa721b5c000f3',
    parentId: '8a7480426fa34894016fa721b5c000f1',
    parentIds: 'root,8a7480426fa34894016fa721b5c000f1',
    text: '权限设置',
    code: 'permission',
    actionUrl: '',
    type: 'DeptRoot',
    showOperatePrivilege: true,
    effectiveFlag: '1',
    iconSkin: 'el-icon-s-home',
    chkDisabled: false,
    checked: false,
    open: true,
    nocheck: false
  },
  {
    id: '8a7480426fa34894016fa721b5c000f4',
    parentId: '8a7480426fa34894016fa721b5c000f1',
    parentIds: 'root,8a7480426fa34894016fa721b5c000f1',
    text: '用户管理',
    code: 'user',
    actionUrl: '',
    type: 'DeptRoot',
    showOperatePrivilege: true,
    effectiveFlag: '1',
    iconSkin: 'el-icon-s-home',
    chkDisabled: false,
    checked: false,
    open: true,
    nocheck: false
  }
];
export const menuData = [
  {
    id: 'root',
    code: 'setting',
    type: 'menu',
    name: '系统设置',
    permission: 'sys_setting',
    path: '',
    comp: '',
    sort: '0'
  },
  {
    id: '8a7480426fa34894016fa721b5c000f1',
    code: 'BasicSettings',
    type: 'menu',
    name: '基础设置',
    permission: 'sys_basic_setting',
    path: '',
    comp: '',
    sort: '0'
  },
  {
    id: '8a7480426fa34894016fa721b5c000f2',
    code: 'menu',
    type: 'menu',
    name: '导航设置',
    permission: 'sys_menu',
    path: '/menu',
    comp: '/views/menu/index',
    sort: '0'
  },
  {
    id: '8a7480426fa34894016fa721b5c000f3',
    code: 'permission',
    type: 'menu',
    name: '权限设置',
    permission: 'sys_permission',
    path: '/permission',
    comp: '/views/permission/index',
    sort: '1'
  },
  {
    id: '8a7480426fa34894016fa721b5c000f4',
    code: 'user',
    type: 'menu',
    name: '用户管理',
    permission: 'sys_user',
    path: '/user',
    comp: '/views/user/index',
    sort: '2'
  }
];
