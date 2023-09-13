export default {
  namespaced: true,
  state: {
    systemName: '浅影歌年', // 系统标题
    // 个人信息
    personalMsg: JSON.parse(sessionStorage.getItem('personalMsg')) || {
      username: '',
      userId: ''
    },
    isShowWaterMask: '1', // 是否显示水印， 1-是，0-否
    logoUrl: require('@/assets/小猫6.png'),
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
    SET_WATER_MASK: (state, value) => {
      state.isShowWaterMask = value;
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
