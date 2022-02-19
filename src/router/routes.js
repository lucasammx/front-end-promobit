const routes = [
  {
    path: "/products",
    component: () => import("../layout/Layout.vue"),
    children: [
      {
        path: "",
        name: "product@home",
        component: () => import("../views/product/Home.vue"),
      },
    ],
  },
];

export default routes;
