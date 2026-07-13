import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import { verify } from "@/api/admin";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function isAuthRequired(path: string) {
  return path.startsWith('/admin/') && path != "/admin/login";
}

router.beforeEach(async (to, from) => {
  if (!isAuthRequired(to.path)) {
    return true;
  }

  const token = localStorage.getItem('ginger_admin_token');
  if (!token) {
    return "/admin/login";
  }

  try {
    await verify()
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
})

export default router;
