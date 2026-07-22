import { type RouteRecordRaw } from "vue-router";

const mainRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/download/list"
  },
  {
    name: "missing",
    path: "/missing",
    component: () => import("../views/main/MissingSabunsView.vue")
  },
  {
    name: "faq",
    path: "/faq",
    component: () => import("../views/main/FAQ.vue"),
  },
  {
    name: "integrations",
    path: "/integrations",
    component: () => import("../views/main/Integrations.vue"),
  },
  {
    name: "download-list",
    path: "/download/list",
    component: () => import("../views/main/download/DownloadListView.vue"),
  },
  {
    name: "download-select",
    path: "/download/select/:type",
    component: () => import("../views/main/download/DownloadSelect.vue"),
  },
  {
    name: "download-table",
    path: "/download/table/:id",
    component: () => import("../views/main/download/DownloadTableView.vue")
  }
];

const adminRoutes: RouteRecordRaw[] = [
  {
    name: "admin-table-manage",
    path: "/admin/table/manage",
    component: () => import("../views/admin/table/Manage.vue")
  },
  {
    name: "admin-table-special",
    path: "/admin/table/special",
    component: () => import("../views/admin/table/Special.vue")
  },
  {
    name: "admin-table-category",
    path: "/admin/table/category",
    component: () => import("../views/admin/table/Category.vue")
  },
  {
    name: "admin-tag-manage",
    path: "/admin/tag/manage",
    component: () => import("../views/admin/tag/Manage.vue")
  },
  {
    name: "admin-files-manage",
    path: "/admin/files/manage",
    component: () => import("../views/admin/files/Manage.vue")
  },
  {
    name: "admin-files-log",
    path: "/admin/files/log",
    component: () => import("../views/admin/files/FileLogs.vue")
  }
];

const routes: RouteRecordRaw[] = [
  {
    name: "not-found",
    component: () => import("../views/ErrorPage.vue"),
    path: "/:path*",
  },
  {
    name: "main-entrance",
    path: "/",
    component: () => import("../views/main/layout/index.vue"),
    children: [...mainRoutes],
  },
  {
    name: "admin-entrance",
    path: "/admin",
    component: () => import("../views/admin/layout/index.vue"),
    children: [...adminRoutes],
  },
  {
    name: "admin-login",
    path: "/admin/login",
    component: () => import("../views/admin/Login.vue")
  }
];

export default routes;
