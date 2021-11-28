import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "normalize.css";

import firebase from "firebase/compat";
import "firebase/compat/auth";

Vue.config.productionTip = false;

let app: any;

firebase.initializeApp({
  apiKey: "AIzaSyAE5qUHYI9C_02CtK8Is-J5ox5GX0nN8fY",
  authDomain: "blog-app-750e1.firebaseapp.com",
  projectId: "blog-app-750e1",
  storageBucket: "blog-app-750e1.appspot.com",
  messagingSenderId: "823452810138",
  appId: "1:823452810138:web:743e3ff24e1a5f7f649823",
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
