import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "hash",
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach((to, from, next) => {
  // verifique se a rota requer autenticação e o usuário não está logado
  if (
    to.matched.some((route) => route.meta.requiresAuth) &&
    !localStorage.getItem("token")
  ) {
    localStorage.removeItem("token");
    next({ name: "auth@login" });
    return;
  }

  // se logado, redireciona para o dashboard
  if (to.path === "/login" && !!localStorage.getItem("token")) {
    next({ name: "product@home" });
    return;
  }
  next();
});

export default router;
