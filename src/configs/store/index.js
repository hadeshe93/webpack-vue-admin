import $auth from '@SRC/assets/scripts/auth.js';

// 全局store
const store = {
  state: {
    manager: null,
  },
  mutations: {
    delManager (state, payload) {
      state.manager = null;
      // 也清除缓存缓存
      $auth.logout();
    },
    updateManager (state, payload) {
      state.manager = payload.data;
      // 固化到缓存
      $auth.login(payload.data);
    }
  },
};
export default store;

export const resetStore = (vm)=>{
  // 防止一刷新，store中的数据全被冲掉了
  console.log('Reseting Store ...');

  // 若登陆过的，则把管理员数据恢复到 store 中
  if ($auth.isLogin()) {
    vm.$store.commit({
      type: 'updateManager',
      data: $auth.getManager()
    });
  }

}
