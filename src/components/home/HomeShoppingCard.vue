<template>
  <el-card class="home-shopping-card">
    <img class="img" :src="url" :alt="name" />
    <div class="header">
      <div>{{ name }}</div>
      <el-button
        size="small"
        type="primary"
        :disabled="!detail"
        @click="handleGoShopping"
        >查看货源</el-button
      >
    </div>
    <el-descriptions :column="2" class="content">
      <el-descriptions-item label="数量">{{ amount }}</el-descriptions-item>
      <el-descriptions-item label="类别">{{ level }}</el-descriptions-item>
      <el-descriptions-item label="出发地">{{ region }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const emit = defineEmits(["go-shopping"]);
const props = defineProps({
  id: String,
  url: String,
  name: String,
  amount: String,
  level: String,
  region: String,
  tid: String,
  tList: Array,
  detail: Object,
});

const tLabel = computed(
  // @ts-ignore
  () => props.tList.find((item) => item.id === props.tid).name
);

function handleGoShopping() {
  router.push({
    name: "shopping-detail",
    params: {
      id: props.id,
    },
  });
}
</script>

<style scoped>
.home-shopping-card {
  width: 23%;
  margin-bottom: 16px;
  height: 320px;
  margin-right: 1%;
}
.img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  border-bottom: 3px solid rgba(209, 209, 209, 0.1);
}
.content {
  padding: 4px 8px;
}
</style>

<style>
.home-shopping-card > .el-card__body {
  padding: 0 !important;
}
</style>