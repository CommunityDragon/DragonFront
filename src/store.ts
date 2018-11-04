import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showSidebar: false,
    activeRoute: 'Home',
    endpoints: [],
    urls: {
      cdn: 'https://cdn.communitydragon.org',
    },
    modalShown: false,
  },
  getters: {
    endpointsByCategory: state => (category: string = 'All') => {
      return JSON.parse(JSON.stringify(category === 'All'
        ? state.endpoints
        : state.endpoints.filter(
          (endpoint: any) => endpoint.category === category)));
    },
    endpointCategories: state => {
      return state.endpoints
        .map(({ category }: any) => category)
        .filter((v, i, a) => a.indexOf(v) === i);
    },
  },
  mutations: {
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    changeRoute(state, route) {
      state.activeRoute = route;
    },
    async loadEndpoints(state) {
      setTimeout(async () => {
        state.endpoints = (await Axios.get(`${state.urls.cdn}/endpoints/categorized`)).data;
      }, 1000);
    },
    toggleModal(state, show) {
      if (typeof(show) === 'boolean') state.modalShown = show;
      else state.modalShown = !state.modalShown;
    },
  },
  actions: {
    toggleSidebar({ commit }) {
      commit('toggleSidebar');
    },
    async loadEndpoints({ commit }) {
      commit('loadEndpoints');
    },
  },
});
