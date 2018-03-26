const store = {
  state: {
    manager: null,
  },
  mutations: {
    updateManager (state, payload) {
      state.manager = payload.data;
    }
  },
};

export default store;
