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
      v-show="item.children.length === 0"
    >
      <template #title>
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.label }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu
      v-for="item in NavAsideList"
      :key="item.id"
      v-show="item.children.length !== 0"
    >
      <template #title>
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(itemChild, indexChild) in item.children"
        :key="itemChild.id"
      >
        <router-link :key="indexChild" :to="itemChild.path">
          <el-menu-item :index="itemChild.path">{{
            itemChild.label
          }}</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-sub-menu>
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
