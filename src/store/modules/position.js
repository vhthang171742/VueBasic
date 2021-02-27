import axios from "axios";

export default {
  namespaced: true,

  state: {
    positions: [],
  },

  getters: {
    positions(store) {
      return store.positions;
    },
  },

  mutations: {
    setList(store, positions) {
      store.positions = positions;
    },
  },

  actions: {
    getList({ commit }) {
      axios
        .get(`http://localhost:3000/positions`)
        .then((response) => {
          // JSON responses are automatically parsed.
          var positions = response.data;
          commit("setList", positions);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
