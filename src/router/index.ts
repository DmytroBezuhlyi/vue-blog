import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import ArticlePage from "@/views/ArticlePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";

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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((rec) => rec.meta.requiresAuth)) {
//     const authUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
//
//     if (authUser && authUser.accessToken) {
//       next();
//     } else {
//       next({ name: "LoginPage" });
//     }
//   } else {
//     next();
//   }
// });

export default router;
