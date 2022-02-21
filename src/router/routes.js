const routes = [
  {
    path: "/",
    component: () => import("../layout/Layout.vue"),
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
