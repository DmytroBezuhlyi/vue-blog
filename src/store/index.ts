import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/compat/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info: {},
    articles: [
      {
        id: 1,
        title: "Article #1",
        destination: "Europe",
        author: "John Williams Doe",
        postTime: "January 01, 2018",
        image:
          "https://c4.wallpaperflare.com/wallpaper/295/806/430/beautiful-scenery-mountains-lake-nature-wallpaper-preview.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis viverra sapien. Mauris vehicula est vitae sodales aliquam. Aliquam sem nisl, pretium et justo vitae, sagittis dictum nunc. Nulla facilisi. Sed ultrices nisl lorem, in consequat urna facilisis a. Sed eu hendrerit risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis viverra sapien. Mauris vehicula est vitae sodales aliquam. Aliquam sem nisl, pretium et justo vitae, sagittis dictum nunc. Nulla facilisi. Sed ultrices nisl lorem, in consequat urna facilisis a. Sed eu hendrerit risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis viverra sapien. Mauris vehicula est vitae sodales aliquam. Aliquam sem nisl, pretium et justo vitae, sagittis dictum nunc. Nulla facilisi. Sed ultrices nisl lorem, in consequat urna facilisis a. Sed eu hendrerit risus.",
      },
      {
        id: 2,
        title: "Article #2",
        destination: "Europe",
        author: "Added by John Williams Doe2",
        postTime: "January 02, 2019",
        image:
          "https://c4.wallpaperflare.com/wallpaper/983/716/976/mount-scenery-national-park-alberta-banff-national-park-wallpaper-preview.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis viverra sapien. Mauris vehicula est vitae sodales aliquam. Aliquam sem nisl, pretium et justo vitae, sagittis dictum nunc. Nulla facilisi. Sed ultrices nisl lorem, in consequat urna facilisis a. Sed eu hendrerit risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis viverra sapien. Mauris vehicula est vitae sodales aliquam. Aliquam sem nisl, pretium et justo vitae, sagittis dictum nunc. Nulla facilisi. Sed ultrices nisl lorem, in consequat urna facilisis a. Sed eu hendrerit risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis viverra sapien. Mauris vehicula est vitae sodales aliquam. Aliquam sem nisl, pretium et justo vitae, sagittis dictum nunc. Nulla facilisi. Sed ultrices nisl lorem, in consequat urna facilisis a. Sed eu hendrerit risus.",
      },
      {
        id: 3,
        title: "Article #3",
        destination: "Europe",
        author: "Added by John Williams Doe 3",
        postTime: "January 03, 2020",
        image:
          "https://c4.wallpaperflare.com/wallpaper/649/484/984/photography-landscape-nature-mountains-wallpaper-preview.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis viverra sapien. Mauris vehicula est vitae sodales aliquam. Aliquam sem nisl, pretium et justo vitae, sagittis dictum nunc. Nulla facilisi. Sed ultrices nisl lorem, in consequat urna facilisis a. Sed eu hendrerit risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis viverra sapien. Mauris vehicula est vitae sodales aliquam. Aliquam sem nisl, pretium et justo vitae, sagittis dictum nunc. Nulla facilisi. Sed ultrices nisl lorem, in consequat urna facilisis a. Sed eu hendrerit risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis viverra sapien. Mauris vehicula est vitae sodales aliquam. Aliquam sem nisl, pretium et justo vitae, sagittis dictum nunc. Nulla facilisi. Sed ultrices nisl lorem, in consequat urna facilisis a. Sed eu hendrerit risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis viverra sapien. Mauris vehicula est vitae sodales aliquam. Aliquam sem nisl, pretium et justo vitae, sagittis dictum nunc. Nulla facilisi. Sed ultrices nisl lorem, in consequat urna facilisis a. Sed eu hendrerit risus.",
      },
    ],
  },
  getters: {
    getArticles(state) {
      return state.articles;
    },
    getArticleByID(state, id: number) {
      return state.articles.find((article) => article.id === id);
    },
    getInfo(state) {
      return state.info;
    },
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
  },
  actions: {
    async login({ dispatch }, { email, password }: FormData) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
        console.log(err);
        if (err.code === "auth/wrong-password") {
          alert("Password is invalid");
        }
        if (err.code === "auth/user-not-found") {
          alert("User doesn't exist");
        }
        throw err;
      }
    },
    getUID() {
      const user = firebase.auth()?.currentUser;
      return user?.uid || {};
    },
    async logout() {
      await firebase.auth().signOut();
    },
    async registration({ dispatch }, { email, password }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUID");
        await firebase.database().ref(`users/${uid}/info`).set({
          userName: email,
        });
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          alert("User already exist");
        }
        throw err;
      }
    },
    async fetchInfo({ dispatch, commit }) {
      const uid = await dispatch("getUID");
      const info = (
        await firebase.database().ref(`/users/${uid}/info`).once("value")
      ).val();
      commit("setInfo", info);
    },
  },
  modules: {},
});
