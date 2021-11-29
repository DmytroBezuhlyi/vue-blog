import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import ArticlePage from "@/views/ArticlePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import firebase from "firebase/compat";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "AboutPage",
    component: AboutPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/post/:id",
    name: "ArticlePage",
    component: ArticlePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/registration",
    name: "RegistrationPage",
    component: RegistrationPage,
  },
  {
    path: "/404",
    name: "404",
    component: PageNotFound,
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    const authUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const token = await firebase.auth().currentUser?.getIdToken();

    if (
      token &&
      authUser &&
      authUser.accessToken &&
      token === authUser.accessToken
    ) {
      next();
    } else {
      next({ name: "LoginPage" });
    }
  } else {
    next();
  }
});

export default router;
