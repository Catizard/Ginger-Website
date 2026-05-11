import { type RouteRecordRaw } from "vue-router";

const mainRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/download/all"
  },
  {
    name: "about",
    path: "/about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    name: "download-all",
    path: "/download/all",
    component: () => import("../views/download/AllDownload.vue"),
  },
  {
    name: "download-by-table",
    path: "/download/by-table",
    component: () => import("../views/download/ByTable.vue"),
  },
  {
    name: "download-by-event",
    path: "/download/by-event",
    component: () => import("../views/download/ByEvent.vue"),
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
