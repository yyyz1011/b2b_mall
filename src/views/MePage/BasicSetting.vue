<template>
  <div class="setting-wrapper">
    <h2>基本设置</h2>
    <p>邮箱</p>
    <el-input v-model="email" placeholder="请输入绑定邮箱" style="width: 40%" />
    <p>昵称</p>
    <el-input v-model="nickname" placeholder="请输入昵称" style="width: 40%" />
    <p>个人简介</p>
    <el-input
      v-model="introduction"
      :rows="3"
      placeholder="请输入个人简介"
      type="textarea"
    />
    <p>国家/地区</p>
    <el-select v-model="country" class="m-2" placeholder="选择地区">
      <el-option
        v-for="item in areaOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <p>所在省市</p>
    <el-cascader :options="areaData" :props="props" v-model="city">
      <template #default="{ node, data }">
        <span>{{ data.name }}</span>
        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
      </template>
    </el-cascader>
    <p>详细地址</p>
    <el-input
      v-model="address"
      placeholder="请输入详细地址"
      style="width: 40%"
      clearable
    />
    <p>联系电话</p>
    <el-input
      v-model="phone"
      placeholder="请输入联系电话"
      style="width: 40%"
      clearable
    />
    <div style="margin-top: 10px">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onBeforeMount } from "vue";
import areaData from "../../mock/pca-code.json";
import { UserInfo, SecurityInfo, CompanyInfo } from "../../constants/me";
import lof from "localforage";

const email = ref("");
const nickname = ref("");
const introduction = ref("");
const country = ref("CN");
const city = ref("");
const address = ref("");
const phone = ref("");
let loginInfo = {
  is_login: true,
  username: "",
  password: "",
  phone: "",
  login_type: "",
  role: "",
};

async () => {
  await lof.getItem("b2b-storage-user").then(async (value: any) => {
    loginInfo = value;
  });
};

onBeforeMount(async () => {
  if (loginInfo !== null) {
    switch (loginInfo.login_type) {
      case "username":
        await lof.getItem(loginInfo.username).then((userInfo: any) => {
          email.value = userInfo.email;
          nickname.value = userInfo.nickname;
          introduction.value = userInfo.describe;
          city.value = JSON.parse(userInfo.city);
          address.value = userInfo.address;
          phone.value = userInfo.phone;
        });
        break;
      case "phone":
        await lof.getItem(loginInfo.phone).then((userInfo: any) => {
          email.value = userInfo.email;
          nickname.value = userInfo.nickname;
          introduction.value = userInfo.describe;
          city.value = JSON.parse(userInfo.city);
          address.value = userInfo.address;
          phone.value = userInfo.phone;
        });
        break;
    }
  }
});
// 保存数据
function handleSave() {
  const userInfo: UserInfo = {
    id: 0,
    email: email.value,
    nickname: nickname.value,
    describe: introduction.value,
    country: country.value,
    city: JSON.stringify(city.value),
    address: address.value,
    account: "123",
    phone: phone.value,
  };
}
// 取消更改
function handleCancel() {}
</script>

<style>
.setting-wrapper {
  width: 50%;
}
</style>