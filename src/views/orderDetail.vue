<template>
  <el-steps class="order-detail-step" :active="currentStep" align-center>
    <el-step title="1" description="等待买家付款" />
    <el-step title="2" description="等待卖家发货" />
    <el-step title="3" description="等待买家确认收货" />
    <el-step title="4" description="交易成功" />
  </el-steps>
  <div class="order-detail-status">
    <div class="order-detail-status-label">当前交易状态:</div>
    <div class="order-detail-status-value">{{ currentStatus }}</div>
  </div>
  <el-descriptions class="order-detail-descriptions" title="订单信息-收货信息">
    <el-descriptions-item label="订单号">{{
      orderInfo.order_id ?? ""
    }}</el-descriptions-item>
    <el-descriptions-item label="收货人">收货人A</el-descriptions-item>
    <el-descriptions-item label="收货地址"
      >浙江省杭州市浙江传媒学院</el-descriptions-item
    >
    <el-descriptions-item label="手机">13887241749</el-descriptions-item>
    <el-descriptions-item label="电话">-</el-descriptions-item>
    <el-descriptions-item label="备注"
      >预计最晚发货完成时间：支付成功后两天</el-descriptions-item
    >
  </el-descriptions>
  <el-descriptions
    class="order-detail-descriptions"
    title="订单信息-供应商信息"
  >
    <el-descriptions-item label="供应商">{{
      orderInfo.order_user_id ?? ""
    }}</el-descriptions-item>
    <el-descriptions-item label="手机">12381823942</el-descriptions-item>
    <el-descriptions-item label="电话">-</el-descriptions-item>
  </el-descriptions>
  <el-table :data="[orderInfo]" stripe style="width: 100%">
    <el-table-column prop="order_id" label="货品" width="350">
      <template #default="scope">
        <div class="order_product_info">
          <img class="order_product_info_img" :src="scope.row.cover_url" />
          <div class="order_product_info_content">
            <div class="order_product_info_content_title">
              {{ scope.row.product_name }}
            </div>
            <div class="order_product_info_content_type">
              {{ scope.row.type }}
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="order_price" label="发布价" />
    <el-table-column prop="order_num" label="数量" />
  </el-table>
  <div class="order-yunfei">
    运费：<b>{{ orderInfo.order_yunfei }}</b
    >元
  </div>
  <div class="order-all-price">
    已付款：<span class="order-all-price-num">{{ currentPay }}</span
    >元
  </div>
</template>

<script setup lang="ts" >
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { STORAGE_ORDER } from "../constants/order";
import MockOrderList from "../mock/mock-order-list.json";
import lof from "localforage";
const router = useRouter();
const orderId = router.currentRoute.value.params.id;

const orderInfo: any = ref({});
const currentStep = computed(() => (orderInfo.value?.status === 1 ? 0 : 3));
const currentStatus = computed(() =>
  orderInfo.value?.status === 1 ? "等待买家付款" : "交易成功"
);
const currentPay = computed(() =>
  orderInfo.value?.status === 1 ? 0 : orderInfo.value?.all_price
);

getOrderInfo();
async function getOrderInfo() {
  const storageList: any = (await lof.getItem(STORAGE_ORDER)) ?? [];
  const allList = [...storageList, ...MockOrderList.list];
  const info = allList.find((item) => item.order_id == orderId);
  orderInfo.value = info;
  console.log(info);
}
</script>

<style scoped>
.order-detail-step {
  margin-top: 16px;
}
.order-detail-status {
  background: rgb(250, 246, 241);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;
}
.order-detail-status-label {
  font-weight: bold;
}
.order-detail-status-value {
  font-weight: bold;
  color: rgb(255, 115, 0);
  margin-left: 8px;
}
.order-detail-descriptions {
  margin-top: 16px;
}
.order_product_info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.order_product_info_img {
  height: 100px;
  width: 100px;
  object-fit: cover;
  margin-right: 8px;
}
.order_product_info_content_title {
  font-size: 16px;
}
.order-yunfei {
  font-size: 14px;
  text-align: right;
  margin-top: 8px;
}
.order-all-price {
  margin-top: 8px;
  text-align: right;
  font-size: 16px;
}
.order-all-price-num {
  color: tomato;
  font-weight: bold;
}
</style>