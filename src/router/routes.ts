import { type RouteRecordRaw } from "vue-router";

const mainRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    name: "home",
    path: "/home",
    component: () => import("../views/DownloadView.vue"),
  },
  {
    name: "table",
    path: "/table",
    component: () => import("../views/table/TableView.vue")
  },
  {
    name: "about",
    path: "/about",
    component: () => import("../views/AboutView.vue"),
  },
];

const routes: RouteRecordRaw[] = [
  {
    name: "not-found",
    path: "/:path*",
    component: () => import("../views/ErrorPage.vue"),
  },
  {
    name: "layout",
    path: "/",
    component: () => import("../layout/index.vue"),
    children: [...mainRoutes],
  },
];

export default routes;
