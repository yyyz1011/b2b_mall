<template>
  <div class="home-wrapper">
    <HomeSearch :filter-list="shoppingTypeList" @search="handleSearch" />
    <div class="home-content">
      <template v-for="item in shoppingList" :key="item.id">
        <HomeShoppingCard
          :id="item.id"
          :url="item.url"
          :name="item.name"
          :amount="item.amount"
          :level="item.level"
          :region="item.region"
          :tid="item.tid"
          :t-list="shoppingTypeList"
          @go-shopping="handleGoShopping"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import HomeSearch from "../components/home/HomeSearch.vue";
import HomeShoppingCard from "../components/home/HomeShoppingCard.vue";

// mock
import HomeShoppingType from "../mock/home-shopping-type.json";
import HomeShoppingList from "../mock/home-shopping-list.json";

const shoppingTypeList = computed(() => HomeShoppingType.shoppingTypeList);
const shoppingList = ref(HomeShoppingList.shoppingList);

function handleSearch(searchVal: string, filterId: string) {
  if (filterId === "-1") {
    shoppingList.value = HomeShoppingList.shoppingList;
  } else {
    shoppingList.value = HomeShoppingList.shoppingList.filter(
      (item) => item.tid === filterId
    );
  }
  if (!searchVal) return;
  shoppingList.value = shoppingList.value.filter((item) =>
    item.name.includes(searchVal)
  );
}

function handleGoShopping(id: string) {
  console.log(id);
}
</script>

<style scoped>
.home-content {
  display: flex;
  flex-wrap: wrap;
}
</style>