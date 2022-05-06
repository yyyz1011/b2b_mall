export const STORAGE_ORDER: string = "b2b-storage-order";

interface OrderStatus {
  id: number;
  label: string;
  key: string;
}
export const allStatus: OrderStatus = {
  id: 0,
  label: "全部",
  key: "all",
};
export const orderStatusList: OrderStatus[] = [
  { id: 1, label: "代付款", key: "prepare_order" },
  { id: 2, label: "代发货", key: "prepare_send" },
  { id: 3, label: "待收货", key: "prepare_receive" },
  { id: 4, label: "已收货", key: "receive" },
  { id: 5, label: "退款退货中", key: "no_receive" },
  { id: 6, label: "交易结束", key: "end" },
];
