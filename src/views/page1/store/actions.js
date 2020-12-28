export default {
  async addCount({ state, commit }) {
    const count = state.count + 1;
    commit('updateCount', count);
  },
};
