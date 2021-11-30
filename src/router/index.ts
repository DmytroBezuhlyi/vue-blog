import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import ArticlePage from "@/views/ArticlePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import Page404 from "@/views/Page404.vue";
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
    meta: { onlyNotAuthorized: true },
  },
  {
    path: "/registration",
    name: "RegistrationPage",
    component: RegistrationPage,
    meta: { onlyNotAuthorized: true },
  },
  {
    path: "/404",
    name: "Page404",
    component: Page404,
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
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const authUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const token = await firebase.auth().currentUser?.getIdToken();

  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
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
  } else if (to.matched.some((rec) => rec.meta.onlyNotAuthorized)) {
    if (
      !token ||
      !authUser ||
      !authUser.accessToken ||
      token !== authUser.accessToken
    ) {
      next();
    } else {
      next({ name: "HomePage" });
    }
  } else {
    next();
  }
});

export default router;
