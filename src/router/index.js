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

export default router;
