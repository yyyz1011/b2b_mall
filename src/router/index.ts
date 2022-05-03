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
    redirect: "/price/priceGround",
    children: [
      {
        path: "/price/priceGround",
        name: "priceGround",
        component: () => import("../views/priceChild/priceGround.vue"),
      },
      {
        path: "/price/priceList",
        name: "priceList",
        component: () => import("../views/priceChild/priceList.vue"),
      },
      {
        path: "/price/pricePurchase",
        name: "pricePurchase",
        component: () => import("../views/priceChild/pricePurchase.vue"),
      },
    ],
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

  // 询价子页面
  {
    path: "/price/priceList/details",
    name: "Detail",
    component: () => import("../views/priceChild/listChild/Details.vue"),
  },
  {
    path: "/price/priceList/modify",
    name: "Modify",
    component: () => import("../views/priceChild/listChild/Modify.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
