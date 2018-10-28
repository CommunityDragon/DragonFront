import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showSidebar: false,
    activeRoute: 'Home',
  },
  mutations: {
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    changeRoute(state, route) {
      state.activeRoute = route;
    },
  },
  actions: {
    toggleSidebar({ commit }) {
      commit('toggleSidebar');
    },
  },
});
