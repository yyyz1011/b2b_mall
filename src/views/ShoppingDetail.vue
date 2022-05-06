<template>
  <div class="detail-header">
    <div class="detail-img">
      <img :src="shoppingInfo?.url" />
    </div>
    <div class="detail-header-info">
      <div class="detail-header-info-title">
        {{ shoppingInfo?.name }}
      </div>
      <div class="detail-header-info-sub-title">
        <el-rate v-model="shoppingGrade" disabled />
        <span class="detail-header-info-sub-title-comment-num">
          <span class="active-text">{{ shoppingCommentNum }}</span
          >条评价
        </span>
        <span class="detail-header-info-sub-title-order-num">
          30天内<span class="active-text">{{ shoppingOrderNum }}+</span>个成交
        </span>
      </div>
      <el-tabs class="detail-header-tab" v-model="currentTab" type="card">
        <el-tab-pane
          v-for="item in shoppingDetailTabList"
          :key="item.key"
          :label="item.label"
          :name="item.key"
        >
          <ShoppingDetailPriceCard :type="item.key" :info="shoppingInfo" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <ShoppingDetailAttrCard :info="shoppingInfo"></ShoppingDetailAttrCard>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import HomeShoppingList from "../mock/home-shopping-list.json";
import { shoppingDetailTabList } from "../constants/shopping";
import ShoppingDetailPriceCard from "../components/shoppingDetail/ShoppingDetailPriceCard.vue";
import ShoppingDetailAttrCard from "../components/shoppingDetail/ShoppingDetailAttrCard.vue";

const router = useRouter();
const shoppingId = router.currentRoute.value.params.id;
const shoppingInfo = computed(() =>
  HomeShoppingList.shoppingList.find((item) => item.id == shoppingId)
);

const shoppingGrade = ref(shoppingInfo.value?.detail?.grade);
const shoppingCommentNum = ref(shoppingInfo.value?.detail?.comment_num);
const shoppingOrderNum = ref(shoppingInfo.value?.detail?.order_num);

const currentTab = ref(shoppingDetailTabList[0].key);
</script>

<style scoped>
.detail-header {
  display: flex;
  justify-content: flex-start;
}
.detail-img {
  margin-right: 30px;
}
.detail-img img {
  width: 300px;
}

.detail-header-info-title {
  font-size: 20px;
  font-weight: bold;
}

.detail-header-info-sub-title {
  display: flex;
  align-items: center;
}

.detail-header-info-sub-title-comment-num,
.detail-header-info-sub-title-order-num {
  margin-right: 8px;
}
.active-text {
  font-weight: bold;
}
.detail-header-tab {
  margin-top: 16px;
}
</style>

<style>
.detail-header .el-tabs__item {
  width: 300px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>