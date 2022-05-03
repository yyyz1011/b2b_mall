<template>
  <div class="price-list">
    <h1>询价单</h1>
    <el-button @click="detailsClick">详情</el-button>
    <el-button @click="modifyClick">修改</el-button>
  </div>
</template>

<script>
export default {
  name: "priceList",
  methods: {
    detailsClick() {
      this.$router.push("/price/priceList/details");
    },
    modifyClick() {
      this.$router.push("/price/priceList/modify");
    },
  },
};
</script>

<style scoped>
.price-list {
  width: 100%;
  height: calc(100vh - 165px);
  background-color: aquamarine;
}
</style>