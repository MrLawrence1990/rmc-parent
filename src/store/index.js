export default {
  state: {
    count: 1,
  },
  mutations: {
    updateCount(state, count) {
      state.count = count;
    },
  },
  actions: {
    async addCount({ state, commit }) {
      const count = state.count + 1;
      commit('updateCount', count);
    },
  },
  modules: {
  },
};
