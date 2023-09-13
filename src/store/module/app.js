export default {
  namespaced: true,
  state: {
    systemName: '浅影歌年', // 系统标题
    // 个人信息
    personalMsg: JSON.parse(sessionStorage.getItem('personalMsg')) || {
      username: '',
      userId: ''
    },
    // 是否显示水印， 1-是，0-否
    isShowWaterMark: sessionStorage.getItem('waterMark') || '1',
    // 水印显示区域， system-系统，module-模块
    waterMarkArea: sessionStorage.getItem('waterMarkArea') || 'system',
    // logo url
    logoUrl: require('@/assets/小猫6.png'),
    // 头像url
    avatarUrl: require('@/assets/45.jpg')
  },
  mutations: {
    SET_COLLAPSE: (state, value) => {
      state.isCollapse = value;
    },
    SET_USER_MSG: (state, value) => {
      state.personalMsg = value;
      sessionStorage.setItem('personalMsg', JSON.stringify(value));
    },
    SET_WATER_MARK: (state, value) => {
      state.isShowWaterMark = value;
      sessionStorage.setItem('waterMark', value);
    },
    SET_WATER_MASK_AREA: (state, value) => {
      state.waterMarkArea = value;
      sessionStorage.setItem('waterMarkArea', value);
    },
    SET_MOVE_LEN: (state, value) => {
      state.moveLen = value;
    },
    SET_LOGOUT: (state, value) => {
      state.isLogout = value;
    }
  },
  actions: {},
  getters: {}
};
