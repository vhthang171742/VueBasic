import axios from "axios";

export default {
  namespaced: true,

  state: {
    students: [],
  },

  getters: {
    students(store) {
      return store.students;
    },
  },

  mutations: {
    setList(store, students) {
      store.students = students;
    },
  },

  actions: {
    getList({ commit }) {
      axios
        .get(`http://localhost:3000/students`)
        .then((response) => {
          // JSON responses are automatically parsed.
          var students = response.data;
          commit("setList", students);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
