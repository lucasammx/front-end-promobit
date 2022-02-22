const routes = [
  {
    path: "/login",
    name: "auth@login",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/",
    component: () => import("../layout/Layout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "products",
        name: "product@home",
        component: () => import("../views/product/Home.vue"),
      },
      {
        path: "tags",
        name: "tag@home",
        component: () => import("../views/tag/Home.vue"),
      },
    ],
  },
];

export default routes;
