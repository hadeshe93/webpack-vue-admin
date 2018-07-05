import $auth from '@SRC/assets/scripts/auth.js';

// 全局 store
const store = {
  state: {
    manager: null,
  },
  mutations: {
    // == 删除管理员 ==
    delManager (state, payload) {
      state.manager = null;
      // 也清除缓存缓存
      $auth.logout();
    },
    // == 更新管理员 ==
    updateManager (state, payload) {
      state.manager = payload.data;
      // 固化到缓存
      $auth.login(payload.data);
    }
  },
};

// 恢复 store
const resetStore = (vm)=>{
  // 防止一刷新，store中的数据全被冲掉了
  // 若登陆过的，则把管理员数据恢复到 store 中
  if ($auth.isLogin()) {
    vm.$store.commit({
      type: 'updateManager',
      data: $auth.getManager()
    });
  }
}

// 清空 store
const clearStore = (vm)=>{
  vm.$store.commit({
    type: 'delManager'
  });
};

const storeConfig = {
  resetStore,
  clearStore,
};

export default store;
export { storeConfig };
