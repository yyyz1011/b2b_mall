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
  position: absolute;
  top: 60px;
  left: 200px;

  width: 87%;
  /* height: auto; */
  min-height: 91%;
  /* background-color: antiquewhite; */
}
.admin-main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>