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
</template>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import lodash from "lodash";
import lof from "localforage";
import { ElMessage } from "element-plus";
import { STORAGE_ORDER } from "../../constants/order";
import { STORAGE_USER } from "../../constants/user";
const props = defineProps(["type", "info"]);
const skuInfo = computed(() => props.info.detail.sku[props.type] ?? {});
const isEmptySku = computed(() => lodash.isEmpty(skuInfo.value));
const currentSkuNum: Ref<any> = ref({});

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
  const hasOrderList: any = (await lof.getItem(STORAGE_ORDER)) ?? [];
  const newOrderList = [...hasOrderList, ...orderList];
  await lof.setItem(STORAGE_ORDER, newOrderList);
  ElMessage({
    message: "下单成功",
    type: "success",
    offset: 80,
  });
  setTimeout(() => location.reload(), 1000);
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
</style>

<style>
.el-descriptions__label {
  color: rgb(119, 137, 153) !important;
  font-size: 16px;
  padding-left: 8px;
}
</style>