import userApi from '@/api/user';
import permissionApi from '@/api/permission';

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
  actions: {
    /**
     * @Description 获取相关信息
     * @author qianyinggenian
     * @date 2023/10/12 0012
     */
    async getUserInfo ({ commit }, account) {
      const data = await userApi.getUserInfo({ account });
      if (data.code === 200) {
        const result = await permissionApi.permissionInfo({
          indexName: 'id',
          indexValue: data.data.permission.permission || []
        });
        console.log('获取到了', result);
      }
    }
  }
};
