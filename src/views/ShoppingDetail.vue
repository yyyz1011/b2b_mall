<template>
  <div>shopping detail</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import HomeShoppingList from "../mock/home-shopping-list.json";

const router = useRouter();
const shoppingId = router.currentRoute.value.params.id;
const shoppingInfo = computed(() =>
  HomeShoppingList.shoppingList.find((item) => item.id == shoppingId)
);
console.log(shoppingInfo.value);
</script>