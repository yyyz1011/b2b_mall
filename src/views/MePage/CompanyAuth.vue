<template>
  <h2>企业营业执照</h2>
  <div class="company">
    <p>公司名称</p>
    <el-input v-model="name" placeholder="影响后续认证" style="width: 40%" />
    <p>营业执照注册号/统一社会信用代码</p>
    <el-input
      v-model="businessLicenseCode"
      placeholder="必须与营业执照上的代码一致"
      style="width: 40%"
    />
    <p>法定代表人</p>
    <el-input
      v-model="legalPerson"
      placeholder="影响后续认证"
      style="width: 40%"
    />
    <p>营业执照</p>
    <el-upload
      drag
      accept="image/png,image/jpeg"
      action="http://119.91.204.169:8080/b2b/file"
      :on-success="handleSuccess1"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">单击或者拖动文件到此区域进行上传</div>
      <template #tip>
        <div class="el-upload__tip">请上传大小不超过5M的JPG、PNG图片</div>
      </template>
    </el-upload>
    <el-image :src="businessLicense" />
    <p>管理员省份证复印件</p>
    <el-upload
      drag
      accept="image/png,image/jpeg"
      action="http://119.91.204.169:8080/b2b/file"
      :on-success="handleSuccess2"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">上传身份证头像面</div>
      <template #tip>
        <div class="el-upload__tip">请上传大小不超过5M的文件</div>
      </template>
    </el-upload>
    <el-image :src="positiveIDCard" />
    <el-upload
      drag
      accept="image/png,image/jpeg"
      action="http://119.91.204.169:8080/b2b/file"
      :on-success="handleSuccess3"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">上传身份证国徽面</div>
      <template #tip>
        <div class="el-upload__tip">请上传大小不超过5M的文件</div>
      </template>
    </el-upload>
    <el-image :src="oppositeIDCard" />
    <div style="margin-top: 10px">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { ref, onBeforeMount, onMounted } from "vue";
import { CompanyInfo, COMPANY_AUTH } from "../../constants/me";
import lof from "localforage";
import type { UploadFile, UploadProps } from "element-plus";
import { STORAGE_USER } from "../../constants/user";
const name = ref("");
const businessLicenseCode = ref("");
const legalPerson = ref("");
const businessLicense = ref("");
const positiveIDCard = ref("");
const oppositeIDCard = ref("");
let loginInfo = {
  is_login: true,
  username: "",
  password: "",
  phone: "",
  login_type: "",
  role: "",
};
onBeforeMount(async function () {
  await lof.getItem(STORAGE_USER).then(async (value: any) => {
    loginInfo = value;
  });
  await init();
});
const handleSuccess1: UploadProps["onSuccess"] = (
  response: any,
  uploadFile: UploadFile
) => {
  businessLicense.value = response;
};
const handleSuccess2: UploadProps["onSuccess"] = (
  response: any,
  uploadFile: UploadFile
) => {
  positiveIDCard.value = response;
};
const handleSuccess3: UploadProps["onSuccess"] = (
  response: any,
  uploadFile: UploadFile
) => {
  oppositeIDCard.value = response;
};

function handleSave() {
  const companyInfo: CompanyInfo = {
    name: name.value,
    businessLicenseCode: businessLicenseCode.value,
    legalPerson: legalPerson.value,
    businessLicense: businessLicense.value,
    positiveIDCard: positiveIDCard.value,
    oppositeIDCard: oppositeIDCard.value,
  };
  switch (loginInfo.login_type) {
    case "username":
      lof.setItem(COMPANY_AUTH + loginInfo.username, companyInfo);
      break;
    case "phone":
      lof.setItem(COMPANY_AUTH + loginInfo.phone, companyInfo);
      break;
  }
}
// 初始化信息
async function init() {
  if (loginInfo !== null) {
    switch (loginInfo.login_type) {
      case "username":
        lof
          .getItem(COMPANY_AUTH + loginInfo.username)
          .then((companyInfo: any) => {
            if (companyInfo === null) return;
            name.value = companyInfo.name;
            businessLicenseCode.value = companyInfo.businessLicenseCode;
            legalPerson.value = companyInfo.legalPerson;
            businessLicense.value = companyInfo.businessLicense;
            positiveIDCard.value = companyInfo.positiveIDCard;
            oppositeIDCard.value = companyInfo.oppositeIDCard;
          });
        break;
      case "phone":
        lof.getItem(COMPANY_AUTH + loginInfo.phone).then((companyInfo: any) => {
          if (companyInfo === null) return;
          name.value = companyInfo.name;
          businessLicenseCode.value = companyInfo.businessLicenseCode;
          legalPerson.value = companyInfo.legalPerson;
          businessLicense.value = companyInfo.businessLicense;
          positiveIDCard.value = companyInfo.positiveIDCard;
          oppositeIDCard.value = companyInfo.oppositeIDCard;
        });
        break;
    }
  }
}
</script>

<style>
.company {
  margin: 0 auto;
}
</style>