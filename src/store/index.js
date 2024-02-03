import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    isDarkMode: false,
  },
  getters: {
    getUser: (state) => state.user,
    getIsDarkMode: (state) => state.isDarkMode,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsDarkMode(state, isDarkMode) {
      state.isDarkMode = isDarkMode;
    },
  },
  actions: {
    loginUser({ commit }, user) {
      commit('setUser', user);
    },
    toggleDarkMode({ commit, state }) {
      commit('setIsDarkMode', !state.isDarkMode);
    },
  },
  modules: {
  }
})
