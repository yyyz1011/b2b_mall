<template>
  <h2>安全设置</h2>
  <el-row :gutter="20">
    <el-col :span="8">
      <p>账户密码</p>
      <p>当前密码强度：强</p>
    </el-col>
    <el-col :span="4" :offset="12">
      <el-button size="large" type="text">
        <p style="font-size: 15px">修改</p>
      </el-button>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8">
      <p>密保手机</p>
      <p v-if="bindPhone">已绑定手机：{{bindPhone}}</p>
      <p v-else>未绑定手机号</p>
    </el-col>
    <el-col :span="4" :offset="12">
      <el-button size="large" type="text">
        <p style="font-size: 15px">修改</p>
      </el-button>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="10">
      <p>密保问题</p>
      <p>未设置密保问题，密保问题可有效保护账户安全</p>
    </el-col>
    <el-col :span="4" :offset="10">
      <el-button size="large" type="text">
        <p style="font-size: 15px">设置</p>
      </el-button>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8">
      <p>备用邮箱</p>
      <p>已绑定邮箱：aant***sign.com</p>
    </el-col>
    <el-col :span="4" :offset="12">
      <el-button size="large" type="text">
        <p style="font-size: 15px">修改</p>
      </el-button>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8">
      <p>支付方式</p>
      <p>已绑定银行卡：160******888</p>
    </el-col>
    <el-col :span="4" :offset="12">
      <el-button size="large" type="text">
        <p style="font-size: 15px">绑定</p>
      </el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from "vue";
import lof from "localforage";
import router from "../../router";
import { SecurityInfo, SECURITY_SETTING } from "../../constants/me";
import { STORAGE_USER } from "../../constants/user";
import { hyphenate } from "@vue/shared";

let loginInfo = {
  is_login: true,
  username: "",
  password: "",
  phone: "",
  login_type: "",
  role: "",
};
const phone = ref("");
async function getLoginData() {
  await lof.getItem(STORAGE_USER).then(async (value: any) => {
    loginInfo = value;
  });
}

onBeforeMount(async function () {
  await lof.getItem(STORAGE_USER).then(async (value: any) => {
    loginInfo = value;
    phone.value = loginInfo.phone;
  });
});
const bindPhone = computed(() => {
  if (phone.value != "") {
    return phone.value.slice(0, 3) + "****" + phone.value.slice(8, 12);
  }
});
</script>

<style scoped>
.el-row {
  border-bottom: solid 1px #dddbdb;
}
.el-col p:nth-child(2) {
  color: #919191;
}
</style>