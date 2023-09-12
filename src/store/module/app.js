export default {
  namespaced: true,
  state: {
    systemName: '浅影歌年', // 系统标题
    personalMsg: {
      username: '',
      userId: ''
    }, // 个人信息
    logoUrl: require('@/assets/小猫6.png'),
    avatarUrl: require('@/assets/45.jpg')
  },
  mutations: {
    SET_COLLAPSE: (state, value) => {
      state.isCollapse = value;
    },
    SET_USER_MSG: (state, value) => {
      state.personalMsg = value;
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
