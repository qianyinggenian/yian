export default {
  namespaced: true,
  state: {
    routers: JSON.parse(sessionStorage.getItem('routers')) || []
  },
  mutations: {
    SET_ROUTERS: (state, params) => {
      state.routers = params;
      sessionStorage.setItem('routers', params);
    }
  },
  actions: {}
};
