import { HomeFilled, PriceTag, Management, Checked, UserFilled } from "@element-plus/icons-vue";

interface NavAsideItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  children: Array<Object>;
}

export const NavAsideList: NavAsideItem[] = [
  {
    id: "0",
    label: "首页",
    icon: HomeFilled,
    path: "/",
    children: [],
  },
  {
    id: "1",
    label: "询价",
    icon: PriceTag,
    path: "/price",
    children: [
      {
        id: "10",
        label: "询价广场",
        path: "/price/priceGround",
      },
      {
        id: "11",
        label: "我的询价单",
        path: "/price/priceList",
      },
      {
        id: "12",
        label: "询价采购",
        path: "/price/pricePurchase",
      },
    ],
  },
  {
    id: "2",
    label: "订单",
    icon: Management,
    path: "/order",
    children: [],
  },
  {
    id: "3",
    label: "合同",
    icon: Checked,
    path: "/contract",
    children: [],
  },
  {
    id: "4",
    label: "我的",
    icon: UserFilled,
    path: "/me",
    children: [
      {
        id: "40",
        label: "基本设置",
        path: "/me/basic",
      },
      {
        id: "41",
        label: "安全设置",
        path: "/me/security",
      },
      {
        id: "42",
        label: "企业认证",
        path: "/me/company",
      },
    ],
  },
];
