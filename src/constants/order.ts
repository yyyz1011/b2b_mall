export const STORAGE_ORDER: string = "b2b-storage-order";

interface OrderStatus {
  id: number;
  label: string;
  key: number;
}
export const allStatus: OrderStatus = {
  id: 0,
  label: "全部",
  key: 0,
};
export const orderStatusList: OrderStatus[] = [
  { id: 1, label: "代付款", key: 1 },
  { id: 2, label: "代发货", key: 2 },
  { id: 3, label: "待收货", key: 3 },
  { id: 4, label: "已收货", key: 4 },
  { id: 5, label: "退款退货中", key: 5 },
  { id: 6, label: "交易结束", key: 6 },
];
