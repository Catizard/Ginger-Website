import { type RouteRecordRaw } from "vue-router";

const mainRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/download/list"
  },
  {
    name: "missing",
    path: "/missing",
    component: () => import("../views/MissingSabunsView.vue")
  },
  {
    name: "about",
    path: "/about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    name: "download-list",
    path: "/download/list",
    component: () => import("../views/download/DownloadListView.vue"),
  },
  {
    name: "download-select",
    path: "/download/select/:type",
    component: () => import("../views/download/DownloadSelect.vue"),
  },
  {
    name: "download-table",
    path: "/download/table/:id",
    component: () => import("../views/download/DownloadTableView.vue")
  }
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
