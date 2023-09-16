export default {
  namespaced: true,
  state: {
    tabs: JSON.parse(sessionStorage.getItem('tabs')) || []
  },
  getters: {},
  mutations: {
    /**
     * @Description 关闭单个
     * @author qianyinggenian
     * @date 2023/9/15
     */
    SET_CLOSE_TAB: (state, params) => {
      state.tabs = state.tabs.filter(value => value.path !== params.path);
    },
    /**
     * @Description 关闭所有
     * @author qianyinggenian
     * @date 2023/9/15
     */
    SET_CLOSE_ALL_TABS: () => {
    },
    /**
     * @Description 关闭其他
     * @author qianyinggenian
     * @date 2023/9/15
     */
    SET_CLOSE_OTHER_TABS: () => {
    },
    /**
     * @Description 添加
     * @author qianyinggenian
     * @date 2023/9/15
     */
    SET_ADD_TAB: (state, params) => {
      const index = state.tabs.findIndex(value => value.path === params.path);
      if (index === -1) {
        const item = {
          ...params,
          label: params.meta.title
        };
        state.tabs.push(item);
      }
    }
  },
  actions: {}
};
