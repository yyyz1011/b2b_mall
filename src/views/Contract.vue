<template>
  <div class="contract-wrapper" style="margin-bottom: 20px; justify-content: space-between;" @change="filterStatus">
    <el-radio-group v-model="fileRadio">
      <el-radio-button label="全部文件" />
      <el-radio-button label="待我签" />
      <el-radio-button label="待他人签" />
      <el-radio-button label="已完成" />
      <el-radio-button label="已拒签" />
      <el-radio-button label="待我发起" />
    </el-radio-group>
    <el-button type="primary">签署合同</el-button>
  </div>
  <div style="margin-bottom: 20px">
    <el-select v-model="fileType" class="m-2" placeholder="文件类型" style="width: 120px">
      <el-option
        v-for="item in fileOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <span style="margin-left: 30px">发起时间：</span> 
    <el-date-picker v-model="startTime" type="date" placeholder="开始时间" />
    ---
    <el-date-picker v-model="endTime" type="date" placeholder="结束时间" />
    <el-button type="text" style="margin-left: 30px" >一周内</el-button>
    <el-button type="text">一月内</el-button>
    <el-button type="text">半年内</el-button>
    <span style="margin-left: 30px">合同标题：</span> 
    <el-input v-model="input" placeholder="请输入合同标题" style="width: 250px" />
    <el-button type="warning" plain style="margin-left: 30px" @click="handlerSearch">查询</el-button>
  </div>
  <div style="margin-bottom: 20px">
    已选择{{selectedFile}}份文件
    <el-button-group class="ml-4">
      <el-button type="primary">下载所选</el-button>
      <el-button type="primary">删除所选</el-button>
  </el-button-group>
  </div>
  <div>
  <el-table
    ref="multipleTableRef"
    :data="showData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="filename" label="文件名称" width="120" />
    <el-table-column property="recipient" label="收件人" width="180" />
    <el-table-column property="fileType" label="文件类型" width="120" />
    <el-table-column property="sender" label="发件人" width="180" />
    <el-table-column property="status" label="状态" width="120" />
    <el-table-column property="orderId" label="订单编号" width="180" />
    <el-table-column property="createTime" label="发起时间" show-overflow-tooltip />
    <el-table-column>
      <template #header>
        操作
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        <el-button size="small" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
        <el-button size="small" @click="handleSign(scope.$index, scope.row)">签署</el-button>
     </template>
    </el-table-column>
  </el-table>
  </div>
  <div style="margin-top: 20px">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      :small="small"
      :background="background"
      layout="sizes, prev, pager, next, jumper"
      :total="dataLength"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang='ts' setup>
import { computed, ref } from "vue";

// 选中的表格数据大小
const selectedFile = computed(() => 10);
// 根据状态过滤（查询）数据
function filterStatus(radioVale: string){

}
// 根据选中条件查询数据
function handlerSearch(){

}

const fileRadio = ref("全部文件");
const fileType = ref('');
const startTime = ref('');
const endTime = ref(new Date());
const dataLength = ref(100)

const fileOptions = [
  {
    value: "pdf",
    label: "pdf",
  },
  {
    value: "pic",
    label: "照片",
  },
  {
    value: "doc",
    label: "word文档",
  },
];
const showData = [
  {
    filename:"",
    recipient:"", 
    fileType:"", 
    sender:"", 
    status:"", 
    orderId:"", 
    createTime:""
  },
];
</script>

<style scoped>
.contract-wrapper{
    display: flex;
  flex-wrap: wrap;
}
</style>