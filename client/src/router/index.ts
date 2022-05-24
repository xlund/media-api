import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/videos",
    name: "Home",
    component: Home,
  },
  {
    path: "/images",
    name: "Images",
    component: () =>
      import(/* webpackChunkName: "images" */ "../views/Images.vue"),
  },
  {
    path: "/videos",
    name: "Videos",
    component: () =>
      import(/* webpackChunkName: "videos" */ "../views/Videos.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
