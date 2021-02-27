import Vue from "vue";
import Vuex from "vuex";
import student from "./modules/student";
import klass from "./modules/class";
import position from "./modules/position";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    student,
    klass,
    position,
  },
});
