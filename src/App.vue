<template>
  <el-container>
    <el-header class="layout-header">
      <NavHeader />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <NavAside />
      </el-aside>
      <el-main>
        <div class="layout-main">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import NavHeader from "./components/NavHeader.vue";
import NavAside from "./components/NavAside.vue";
</script>

<style>
body,
html {
  margin: 0 !important;
  padding: 0 !important;
}
</style>

<style scoped>
.layout-header {
  background: rgb(45, 55, 65);
  position: sticky;
  top: 0;
  z-index: 9999;
}
.layout-main {
  width: 85%;
  margin: 0 auto;
  min-width: 1000px;
}
</style>