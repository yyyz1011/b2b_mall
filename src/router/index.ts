import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/price",
    name: "price",
    component: () => import("../views/Price.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../views/Order.vue"),
  },
  {
    path: "/contract",
    name: "contract",
    component: () => import("../views/Contract.vue"),
  },
  {
    path: "/me",
    name: "me",
    component: () => import("../views/Me.vue"),
    redirect: "/me/basic",
    children: [
      {
        path: "/me/basic",
        name: "basicSetting",
        component: () => import("../views/MePage/BasicSetting.vue"),
      },
      {
        path: "/me/security",
        name: "securitySetting",
        component: () => import("../views/MePage/SecuritySetting.vue"),
      },
      {
        path: "/me/company",
        name: "companyAuth",
        component: () => import("../views/MePage/CompanyAuth.vue"),
      },
    ],
  },
  {
    path: "/shopping/detail/:id",
    name: "shopping-detail",
    component: () => import("../views/ShoppingDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
