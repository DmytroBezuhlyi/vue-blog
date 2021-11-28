import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {
    async login({ dispatch }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
        console.log(err);
      }
    },
    getUID() {
      const user = firebase.auth()?.currentUser;
      return user.uid || null;
    },
    async logout({ dispatch }) {
      await firebase.auth().signOut();
    },
  },
  modules: {},
});
