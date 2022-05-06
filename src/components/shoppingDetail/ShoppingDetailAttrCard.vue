<template>
  <el-descriptions title="商品属性" :column="3" size="large">
    <el-descriptions-item label="产品">{{
      attrInfo.product_name
    }}</el-descriptions-item>
    <el-descriptions-item label="货号">{{
      attrInfo.product_id
    }}</el-descriptions-item>
    <el-descriptions-item label="材质">{{
      attrInfo.product_category
    }}</el-descriptions-item>
    <el-descriptions-item label="产地">{{
      attrInfo.product_region
    }}</el-descriptions-item>
    <el-descriptions-item label="规格">{{
      attrInfo.product_size
    }}</el-descriptions-item>
    <el-descriptions-item label="品牌">{{
      attrInfo.product_brand
    }}</el-descriptions-item>
    <el-descriptions-item label="结构形式">{{
      attrInfo.product_construction
    }}</el-descriptions-item>
    <el-descriptions-item label="换气方式">{{
      attrInfo.product_name
    }}</el-descriptions-item>
    <el-descriptions-item label="类别">{{
      attrInfo.product_type
    }}</el-descriptions-item>
    <el-descriptions-item label="是否跨境出口专供货源">{{
      attrInfo.is_export ? "是" : "否"
    }}</el-descriptions-item>
  </el-descriptions>
  <el-descriptions title="买家评价" :column="1" size="large">
    <el-descriptions-item
      v-for="(item, index) in attrInfo.comment_list"
      :key="'comment' + index"
      :label="'用户' + (index + 1)"
    >
      {{ item }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps(["info"]);
const attrInfo = computed(() => props.info.detail.attr);
console.log(attrInfo.value);
</script>