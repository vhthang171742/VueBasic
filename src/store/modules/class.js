import axios from "axios";

export default {
  namespaced: true,

  state: {
    classes: [],
  },

  getters: {
    classes(store) {
      return store.classes;
    },
  },

  mutations: {
    setList(store, classes) {
      store.classes = classes;
    },
  },

  actions: {
    getList({ commit }) {
      axios
        .get(`http://localhost:3000/classes`)
        .then((response) => {
          // JSON responses are automatically parsed.
          var classes = response.data;
          commit("setList", classes);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
