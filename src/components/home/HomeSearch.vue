<template>
  <div class="home-search-wrapper">
    <el-input class="home-search-input" v-model="searchVal" />
    <el-button class="home-search-btn" @click="handleSearch">
      <el-cion class="icon"><Search /></el-cion>
      <span class="text">立即搜索</span>
    </el-button>
  </div>
  <el-tabs v-model="currentTypeVal" class="filter" @tab-click="handleSearch">
    <el-tab-pane
      v-for="item in allFilterList"
      :key="item.id"
      :label="item.name"
      :name="item.id"
    />
  </el-tabs>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, Ref, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import type { TabsPaneContext } from "element-plus";

const emit = defineEmits(["search"]);
const props = defineProps({
  filterList: {
    required: true,
    type: Array,
  },
});
const allTypeId: string = "-1";
interface AllFilterItem {
  id: string;
  name: string;
}
// @ts-ignore
const allFilterList: ComputedRef<AllFilterItem[]> = computed(() => [
  { id: allTypeId, name: "全部类目" },
  ...props.filterList,
]);

const searchVal: Ref<string> = ref("");
const currentTypeVal: Ref<string> = ref(allTypeId);

function handleSearch() {
  emit("search", searchVal.value, currentTypeVal.value);
}
</script>

<style scoped>
.home-search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}
.home-search-input {
  width: 500px;
  margin-right: 8px;
}
.home-search-btn {
  background: rgb(45, 55, 65);
  color: #ffffff;
}
.icon {
  width: 14px;
  height: 14px;
  margin-right: 8px;
}
.filter {
  margin-top: 16px;
}
</style>