<template>
  <div class="contract-wrapper">
    <div class="filter-wrapper" @change="filterStatus">
      <el-radio-group v-model="fileRadio">
        <el-radio-button label="全部文件" />
        <el-radio-button label="待我签" />
        <el-radio-button label="待他人签" />
        <el-radio-button label="已完成" />
      </el-radio-group>
      <!-- <el-button type="primary" @click="handlerContract">签署合同</el-button> -->
    </div>
    <div>
      <el-select
        v-model="filterType"
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
      <span style="margin-left: 30px">发起时间：</span>
      <el-date-picker v-model="startTime" type="date" placeholder="开始时间" />
      ---
      <el-date-picker v-model="endTime" type="date" placeholder="结束时间" />
      <el-button type="text" style="margin-left: 30px">一周内</el-button>
      <el-button type="text">一月内</el-button>
      <el-button type="text">半年内</el-button>
      <span style="margin-left: 30px">合同标题：</span>
      <el-input
        v-model="input"
        placeholder="请输入合同标题"
        style="width: 250px"
      />
      <el-button
        type="warning"
        plain
        style="margin-left: 30px"
        @click="handlerSearch"
        >查询</el-button
      >
    </div>
    <div>
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
        :default-sort="{ prop: 'createTime', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="filename" label="文件名称" width="120" />
        <el-table-column property="recipient" label="收件人" width="180" />
        <el-table-column property="fileType" label="文件类型" width="120" />
        <el-table-column property="sender" label="发件人" width="180" />
        <el-table-column property="status" label="状态" width="120" />
        <el-table-column property="orderId" label="订单编号" width="180" />
        <el-table-column
          property="date"
          label="发起时间"
          sortable
          show-overflow-tooltip
        />
        <el-table-column>
          <template #header> 操作 </template>
          <template #default="scope">
            <el-button
              size="small"
              @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-button size="small" @click="handleSign(scope.$index, scope.row)"
              >签署</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
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
  </div>
  <!-- 合同详情预览 -->
  <el-drawer v-model="drawer" :direction="direction">
    <template #default>
      <h3>签署前留档</h3>
      <el-image
        style="width: 100%; height: 95%"
        :src="contractDetail1"
        :fit="fit"
      />
      <el-button>删除</el-button>

      <h3>签署后合同</h3>
      <el-image
        style="width: 100%; height: 95%"
        :src="contractDetail2"
        :fit="fit"
      />
      <el-button>删除</el-button>
    </template>
  </el-drawer>
  <!-- 签署合同浮窗 -->
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
          :auto-upload="false"
          accept="pdf,doc,png,jpg"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload"
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

<script lang='ts' setup>
import { computed, ref, onBeforeMount } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import {
  STORAGE_CONTRACT,
  Contract,
  contractList,
} from "../constants/contract";
import { dayjs, UploadFile, UploadRawFile } from "element-plus";
import lof from "localforage";

// 选中的表格数据大小
const selectedFile = computed(() => 10);

// 根据状态过滤（查询）数据
function filterStatus(radioVale: string) {}
function handlerContract() {
  dialogVisible.value = true;
}
// 根据选中条件查询数据
function handlerSearch() {}
// 上传文件处理函数
function handleSuccess(response: any, uploadFile: UploadFile) {
  contractDetail2.value = response;
}
const handleContractSubmit = () => {};
const handleBeforeUpload = (rawFile: UploadRawFile) => {
  rawFile.name;
};

const drawer = ref(false);
const fileRadio = ref("全部文件");
const filterType = ref("");
const fileType = ref("");
const startTime = ref("");
const endTime = ref(new Date());
const dialogVisible = ref(false);
const contractData = ref([]);
const contractDetail1 = ref("");
const contractDetail2 = ref("");
const showData = computed(() => {
  switch (fileRadio.value) {
    case "待我签":
      return contractData.value.filter(function (value: Contract) {
        return value.status === "待我签";
      });
      break;
    case "待他人签":
      return contractData.value.filter(function (value: Contract) {
        return value.status === "待他人签";
      });
      break;
    case "已完成":
      return contractData.value.filter(function (value: Contract) {
        return value.status === "已完成";
      });
      break;
  }
  return contractData.value;
});
const dataLength = ref(showData.value.length);
onBeforeMount(async () => {
  await init();
});
const init = async () => {
  contractData.value.push(contractList);
  lof.getItem(STORAGE_CONTRACT).then((contracts: any) => {
    if (contracts !== null) {
      contractData.value.push(...contracts);
      contractData.value.map((record) => {
        record.date = new dayjs(record.createTime).format(
          "YYYY-MM-DD hh:mm:ss"
        );
      });
    }
  });
};
// 签署合同
const sender = ref("");
const recipient = ref("");
const orderId = ref("");
const handleSign = (index: number, row: Contract) => {
  dialogVisible.value = true;
  sender.value = row.sender;
  recipient.value = row.recipient;
  orderId.value = row.orderId;
};
const handleDetail = (index: number, row: Contract) => {
  console.log(index, row);
  contractDetail1.value = row.contractFile;
  drawer.value = true;
};
const handleDownload = (index: number, row: Contract) => {
  let image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.src = row.contractFile;
  image.onload = () => {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height);
    canvas.toBlob((blob) => {
      let url = URL.createObjectURL(blob);
      let eleLink = document.createElement("a");
      eleLink.download = "pic.jpeg";
      eleLink.href = url;
      eleLink.click();
      eleLink.remove();
      // 用完释放URL对象
      URL.revokeObjectURL(url);
    });
  };
};

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
.contract-wrapper div {
  margin-bottom: 4px;
}
.filter-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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