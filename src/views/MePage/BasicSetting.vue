<template>
  <div class="setting-wrapper">
    <h2>基本设置</h2>
    <p>邮箱</p>
    <el-input v-model="email" placeholder="请输入绑定邮箱" style="width: 40%" />
    <p>昵称</p>
    <el-input v-model="nickname" placeholder="请输入昵称" style="width: 40%" />
    <p>个人简介</p>
    <el-input
      v-model="describe"
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
import { ref, onBeforeMount, onMounted } from "vue";
import router from "../../router";
import areaData from "../../mock/pca-code.json";
import { UserInfo, BASIC_SETTING } from "../../constants/me";
import lof from "localforage";
import { STORAGE_USER } from "../../constants/user";

const email = ref("");
const nickname = ref("");
const describe = ref("");
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
const areaOptions = [
  {
    value: "CN",
    label: "中国",
  },
];
const props = {
  value: "code",
  label: "name",
};
// 初始化信息
async function init() {
  if (loginInfo !== null) {
    switch (loginInfo.login_type) {
      case "username":
        lof
          .getItem(BASIC_SETTING + loginInfo.username)
          .then((userInfo: any) => {
            if (userInfo === null) return;
            email.value = userInfo.email;
            nickname.value = userInfo.nickname;
            describe.value = userInfo.describe;
            city.value = JSON.parse(userInfo.city);
            address.value = userInfo.address;
            phone.value = userInfo.phone;
          });
        break;
      case "phone":
        lof.getItem(BASIC_SETTING + loginInfo.phone).then((userInfo: any) => {
          if (userInfo === null) return;
          email.value = userInfo.email;
          nickname.value = userInfo.nickname;
          describe.value = userInfo.describe;
          city.value = JSON.parse(userInfo.city);
          address.value = userInfo.address;
          phone.value = userInfo.phone;
        });
        break;
    }
  }
}

onBeforeMount(async function () {
  await lof.getItem(STORAGE_USER).then(async (value: any) => {
    loginInfo = value;
    console.log(value);

    phone.value = loginInfo.phone;
  });
  await init();
});
// 保存数据
function handleSave() {
  const userInfo: UserInfo = {
    email: email.value,
    nickname: nickname.value,
    describe: describe.value,
    country: country.value,
    city: JSON.stringify(city.value),
    address: address.value,
    account: loginInfo.username,
    phone: phone.value,
  };
  switch (loginInfo.login_type) {
    case "username":
      lof.setItem(BASIC_SETTING + loginInfo.username, userInfo);
      break;
    case "phone":
      lof.setItem(BASIC_SETTING + loginInfo.phone, userInfo);
      break;
  }
}
// 取消更改
async function handleCancel() {
  email.value = "";
  nickname.value = "";
  describe.value = "";
  country.value = "CN";
  city.value = "";
  address.value = "";
  phone.value = loginInfo.phone;
  await init();
}
</script>

<style>
.setting-wrapper {
  width: 50%;
}
</style>