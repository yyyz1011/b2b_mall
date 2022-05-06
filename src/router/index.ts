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
  },
  {
    path: "/shopping/detail/:id",
    name: "shopping-detail",
    component: () => import("../views/ShoppingDetail.vue"),
  },
  {
    path: "/order/detail/:id",
    name: "order-detail",
    component: () => import("../views/OrderDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
