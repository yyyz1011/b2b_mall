<template>
  <div class="price">
    <el-container>
      <el-main class="admin-main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "price",
};
</script>

<style scoped>
.price {
  width: 100%;
  height: auto;
  background-color: antiquewhite;
}
</style>