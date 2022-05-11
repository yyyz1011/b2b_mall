<template>
  <div class="price-card">
    <div class="price-card-header">普通用户</div>
    <div class="price-card-content">
      <div class="price-card-content-label">价格</div>
      <div class="price-card-content-price">
        ￥<span class="price">{{ skuInfo.min_price }}</span
        >-￥<span class="price">{{ skuInfo.max_price }}</span>
      </div>
    </div>
    <div class="price-card-content">
      <div class="price-card-content-label">起批量</div>
      <div class="price-card-content-num">
        {{ skuInfo.min_order_num }}个起批
      </div>
    </div>
  </div>
  <el-descriptions :column="1" class="price-descriptions">
    <el-descriptions-item label="会员">
      <el-tag type="warning">1688月卡</el-tag>
      开通月卡享更多金融权益，采满2000退卡费
    </el-descriptions-item>
    <el-descriptions-item label="服务">
      38天免除赊账·72h发货·极速退款·不支持7天无理由退货
    </el-descriptions-item>
    <el-descriptions-item label="物流">
      {{ skuInfo.logistics_city }} | 付款成功3天内安排发货
    </el-descriptions-item>
    <el-descriptions-item label="规格">
      <div class="guige">
        <div
          class="guige-content"
          v-for="(item, index) in skuInfo.size"
          :key="'guige' + index"
        >
          <span class="guige-content-label">{{ item.label }}</span>
          <span class="guige-content-price">{{ item.price }}元</span>
          <span class="guige-content-remain">{{ item.remain }}可售</span>
          <el-input-number
            v-model="currentSkuNum[item.price]"
            :min="0"
            :max="10"
            :disabled="isEmptySku"
          />
        </div>
      </div>
    </el-descriptions-item>
  </el-descriptions>
  <div class="operate">
    <el-button
      class="operate-btn"
      type="primary"
      :disabled="isEmptySku"
      @click="handleOrder"
      >立即订购</el-button
    >
    <el-button class="operate-btn" :disabled="isEmptySku">加入购物车</el-button>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="确认订单"
    width="80%"
    :before-close="handleDialogClose"
    destroy-on-close
  >
    <el-descriptions
      class="order-detail-descriptions"
      title="订单信息-收货信息"
    >
      <el-descriptions-item label="订单号">{{
        prepareOrderList[0]?.order_id ?? ""
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
        prepareOrderList[0]?.order_user_id ?? ""
      }}</el-descriptions-item>
      <el-descriptions-item label="手机">12381823942</el-descriptions-item>
      <el-descriptions-item label="电话">-</el-descriptions-item>
    </el-descriptions>
    <el-table :data="prepareOrderList" stripe style="width: 100%">
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
      运费：<b>{{ prepareOrderList[0]?.order_yunfei }}</b
      >元
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleDialogClose">取消</el-button>
        <el-button type="primary" @click="handleDialogSubmit"
          >确认订单</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, Ref, reactive } from "vue";
import lodash from "lodash";
import lof from "localforage";
import { ElMessage } from "element-plus";
import { STORAGE_ORDER } from "../../constants/order";
import { STORAGE_USER } from "../../constants/user";
const props = defineProps(["type", "info"]);
const skuInfo = computed(() => props.info.detail.sku[props.type] ?? {});
const isEmptySku = computed(() => lodash.isEmpty(skuInfo.value));
const currentSkuNum: Ref<any> = ref({});
const dialogVisible: Ref<boolean> = ref(false);
let prepareOrderListReactive = reactive([]);
const prepareOrderList = ref([]);

!lodash.isEmpty(skuInfo.value?.size) &&
  Object.values(skuInfo.value?.size).forEach((item: any) => {
    currentSkuNum.value[item.price] = 0;
  });

async function handleOrder() {
  const userInfo: any = await lof.getItem(STORAGE_USER);
  let orderList: any = [];
  Object.keys(currentSkuNum.value).forEach((item: any) => {
    if (currentSkuNum.value[item]) {
      const newOrderInfo = {
        cover_url: props.info.url,
        order_id: getUUID(),
        order_user_id: userInfo.username,
        order_time: new Date().getTime(),
        product_name: props.info.name,
        type: `${props.info.region} ${props.info.level}`,
        order_price: item,
        order_num: currentSkuNum.value[item],
        all_price: item * currentSkuNum.value[item] + 10,
        order_yunfei: 10,
        status: 1,
      };
      orderList.push(newOrderInfo);
    }
  });
  if (lodash.isEmpty(orderList)) {
    ElMessage({
      message: "下单数量不能为0",
      type: "error",
      offset: 80,
    });
    return;
  }
  prepareOrderList.value = orderList;
  prepareOrderListReactive = orderList;
  dialogVisible.value = true;
}

async function handleDialogSubmit() {
  const hasOrderList: any = (await lof.getItem(STORAGE_ORDER)) ?? [];
  const newOrderList = [...hasOrderList, ...prepareOrderListReactive];
  await lof.setItem(STORAGE_ORDER, newOrderList);
  ElMessage({
    message: "下单成功",
    type: "success",
    offset: 80,
  });
  setTimeout(() => location.reload(), 1000);
}

function handleDialogClose() {
  prepareOrderList.value = [];
  prepareOrderListReactive = [];
  dialogVisible.value = false;
}

function getUUID(tabName = "") {
  var str = [];
  var Chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 36; i++) {
    str[i] = Chars.substr(Math.floor(Math.random() * 16), 1);
  }
  str[0] = str[8] = str[13] = str[18] = str[23] = "-";
  return tabName + str.join("");
}
</script>

<style scoped>
.price-card {
  background: rgb(249, 249, 250);
}
.price-card-header {
  background: rgb(242, 242, 243);
  font-size: 20px;
  font-weight: bold;
  color: rgb(67, 77, 86);
  padding: 8px 16px;
}
.price-card-content-label {
  margin-right: 16px;
}
.price-card-content {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(119, 137, 153);
}
.price-card-content-price {
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 2px;
  color: tomato;
}
.price {
  font-size: 20px;
}
.price-descriptions {
  padding: 8px;
}
.guige {
  margin-left: 60px;
}
.guige-content {
  padding: 8px 0;
  font-size: 16px;
  color: rgb(119, 137, 153) !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operate-btn {
  width: 200px;
  height: 40px;
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
</style>

<style>
.el-descriptions__label {
  color: rgb(119, 137, 153) !important;
  font-size: 16px;
  padding-left: 8px;
}
</style>