import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    usersPageTitle: "Список пользователей",
    indexPageTitle: "Main page"
  },
  mutations: {
    changeIndexTitle(state, payload) {
      state.indexPageTitle = payload;
    }
  }
});

export default store;
