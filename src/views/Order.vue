<template>
  <el-tabs v-model="currentStatus">
    <el-tab-pane
      v-for="item in allStatusList"
      :key="item.key"
      :label="item.label"
      :name="item.key"
    >
      <el-table :data="currentOrderData" stripe style="width: 100%">
        <el-table-column prop="order_id" label="货品" width="350">
          <template #default="scope">
            <div class="order_product_info">
              <img class="order_product_info_img" :src="scope.row.cover_url" />
              <div class="order_product_info_content">
                <div class="order_product_info_content_title">
                  {{ scope.row.product_name }}
                </div>
                <div class="order_product_info_content_type">
                  {{ scope.row.type }}
                </div>
                <div>
                  <el-tag class="order_product_info_content_tag" type="warning"
                    >48h发货</el-tag
                  >
                  <el-tag class="order_product_info_content_tag" type="warning"
                    >破损包赔</el-tag
                  >
                  <el-tag class="order_product_info_content_tag" type="warning"
                    >15天无理由包退</el-tag
                  >
                  <el-tag class="order_product_info_content_tag" type="warning"
                    >7天包换</el-tag
                  >
                  <el-tag class="order_product_info_content_tag" type="warning"
                    >材质保障</el-tag
                  >
                  <el-tag class="order_product_info_content_tag" type="warning"
                    >少货包赔</el-tag
                  >
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="order_price" label="发布价" />
        <el-table-column prop="order_num" label="数量" />
        <el-table-column prop="all_price" label="总金额">
          <template #default="scope">
            <div class="order_all_price">{{ scope.row.all_price }}</div>
            <div class="order_all_price_yunfei">
              含运费{{ scope.row.order_yunfei }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态">
          <template #default="scope">
            <div class="order_status_content">
              <div class="order_status_content_status">
                {{ getStatusLabel(scope.row.status) }}
              </div>
              <div>
                <el-button type="text" @click="handleGoOrder(scope.row)"
                  >订单详情</el-button
                >
              </div>
              <div><el-button type="text">查看物流</el-button></div>
              <div>
                <el-button type="text" @click="handlerContract(scope.row)"
                  >合同签订</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="交易操作">
          <template #default="scope">
            <el-button
              v-if="scope.row.status === 1"
              type="primary"
              @click="handlePayOrder(scope.row)"
              >付款</el-button
            >
            <el-button v-else type="primary">评价</el-button>
          </template>
        </el-table-column>
        <el-table-column label="其他">
          <div><el-button type="text">再次购买</el-button></div>
          <div><el-button type="text">申请售后</el-button></div>
          <div><el-button type="text">申请理赔</el-button></div>
          <div><el-button type="text">投诉</el-button></div>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
  <el-dialog
    v-model="dialogVisible"
    title="合同签署"
    width="60%"
    center
    destroy-on-close
  >
    <div class="dialogBody">
      <p>签署信息</p>
      <el-divider />
      <span>发起人:</span>
      <el-input v-model="sender" class="dialogInput" />
      <span>签署对象:</span>
      <el-input v-model="recipient" class="dialogInput" />
      <span>订单编号:</span>
      <el-input v-model="orderId" class="dialogInput" />
      <span>文件类型:</span>
      <el-select
        v-model="fileType"
        class="m-2"
        placeholder="文件类型"
        style="width: 120px"
      >
        <el-option
          v-for="item in fileOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <p style="margin-top: 30px">上传合同文件</p>
      <el-divider />
      <div class="uploadArea">
        <el-upload
          drag
          accept="image/png,image/jpeg"
          action="http://119.91.204.169:8080/b2b/file"
          :on-success="handleSuccess"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">单击或者拖动文件到此区域进行上传</div>
          <template #tip>
            <div class="el-upload__tip">请上传大小不超过5M的文件</div>
          </template>
        </el-upload>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleContractSubmit">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { allStatus, orderStatusList, STORAGE_ORDER } from "../constants/order";
import MockOrderList from "../mock/mock-order-list.json";
import { useRouter } from "vue-router";
import { ElMessage, UploadFile, UploadProps } from "element-plus";
import lof from "localforage";
import { UploadFilled } from "@element-plus/icons-vue";
import { el, fa, fi } from "element-plus/lib/locale";
import {
  Contract,
  contractList,
  STORAGE_CONTRACT,
} from "../constants/contract";

const router = useRouter();

const currentStatus = ref(allStatus.key);
const allStatusList = computed(() => [allStatus, ...orderStatusList]);

const dialogVisible = ref(false);
const sender = ref("");
const recipient = ref("");
const orderId = ref("");
const fileType = ref("");
const file = ref("");
let productName = "";
function handlerContract(info: any) {
  sender.value = "测试账户1";
  recipient.value = "测试账户2";
  orderId.value = "T" + info.order_id;
  fileType.value = "图片";
  dialogVisible.value = true;
  productName = info.product_name;
}
const handleSuccess: UploadProps["onSuccess"] = (
  response: any,
  uploadFile: UploadFile
) => {
  file.value = response;
};
const handleContractSubmit = async () => {
  let data = [];
  await lof.getItem(STORAGE_CONTRACT).then((contracts: any) => {
    console.log(contracts);
    data = contracts;
  });
  const contract: Contract = {
    filename: productName,
    recipient: recipient.value,
    fileType: fileType.value,
    sender: sender.value,
    status: "待他人签",
    orderId: orderId.value,
    createTime: new Date().getTime(),
    contractFile: file.value,
  };
  console.log(data, contract);

  if (data === null) {
    await lof.setItem(STORAGE_CONTRACT, [contractList, contract]);
  } else {
    await lof.setItem(STORAGE_CONTRACT, [contract, ...data]);
  }
  await lof.getItem(STORAGE_CONTRACT).then((value: any) => {
    console.log(value);
  });
  dialogVisible.value = false;
};
const orderData: any = ref(MockOrderList.list);
const currentOrderData = computed(() => {
  if (Number(currentStatus.value) === 0) return orderData.value;
  return orderData.value.filter((item) => item.status === currentStatus.value);
});

getOrderData();
async function getOrderData() {
  const data: any = (await lof.getItem(STORAGE_ORDER)) ?? [];
  orderData.value = [...MockOrderList.list, ...data];
}

function getStatusLabel(status: number) {
  return orderStatusList.find((item) => item.id === status)?.label ?? "无状态";
}

async function handlePayOrder(info: any) {
  const orderData: any = await lof.getItem(STORAGE_ORDER);
  const newOrderData = orderData.map((item: any) => {
    if (item.order_id === info.order_id) {
      return {
        ...item,
        status: 6,
      };
    }
    return item;
  });
  await lof.setItem(STORAGE_ORDER, newOrderData);
  ElMessage({
    message: "支付成功",
    type: "success",
    offset: 80,
  });
  setTimeout(() => location.reload(), 1000);
}

function handleGoOrder(info: any) {
  router.push({
    name: "order-detail",
    params: {
      id: info.order_id,
    },
  });
}
const fileOptions = [
  {
    value: "pdf",
    label: "pdf",
  },
  {
    value: "图片",
    label: "图片",
  },
  {
    value: "word文档",
    label: "word文档",
  },
];
</script>

<style scoped>
.order_product_info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.order_product_info_img {
  height: 100px;
  width: 100px;
  object-fit: cover;
  margin-right: 8px;
}
.order_product_info_content_title {
  font-size: 16px;
}
.order_product_info_content_tag {
  margin-right: 8px;
  margin-top: 4px;
}
.order_all_price {
  font-size: 20px;
  font-weight: bold;
}
.order_status_content_status {
  color: rgb(81, 126, 12);
}
.dialogBody span {
  margin-right: 10px;
}
.dialogInput {
  width: 16%;
  margin-right: 10px;
}
.uploadArea {
  display: table;
  margin: 0 auto;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>