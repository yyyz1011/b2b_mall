import {
  HomeFilled,
  PriceTag,
  Management,
  Checked,
  UserFilled,
} from "@element-plus/icons-vue";

interface NavAsideItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

export const NavAsideList: NavAsideItem[] = [
  {
    id: "0",
    label: "首页",
    icon: HomeFilled,
    path: "/",
  },
  {
    id: "1",
    label: "询价",
    icon: PriceTag,
    path: "/price",
  },
  {
    id: "2",
    label: "订单",
    icon: Management,
    path: "/order",
  },
  {
    id: "3",
    label: "合同",
    icon: Checked,
    path: "/contract",
  },
  {
    id: "4",
    label: "我的",
    icon: UserFilled,
    path: "/me",
  },
];
