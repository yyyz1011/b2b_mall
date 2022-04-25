<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#2D3741"
    class="nav-aside-wrapper"
    :default-active="currentPath"
    text-color="#fff"
    router
  >
    <el-menu-item
      v-for="item in NavAsideList"
      :key="item.id"
      :index="item.path"
    >
      <el-icon><component :is="item.icon" /></el-icon>
      <span>{{ item.label }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { NavAsideList } from "../constants/nav";
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const currentPath = computed(() => router.currentRoute.value.path);
</script>

<style scoped>
.nav-aside-wrapper {
  height: calc(100vh - 60px);
  position: fixed;
  width: 200px;
}
</style>
