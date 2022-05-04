<template>
  <div class="nav-header">
    <template v-if="hasLogin">
      <span class="welcome-tip">欢迎你</span>
      <el-button type="text" class="register-btn" @click="handleExit">
        退出
      </el-button>
    </template>
    <template v-else>
      <el-button type="text" class="login-btn" @click="handleLogin">
        登录
      </el-button>
      <el-button type="text" class="register-btn" @click="handleRegister">
        注册
      </el-button>
    </template>
  </div>
  <DialogLoginVue
    :visible="dialogVisible"
    :is-login="isLogin"
    :confirm-text="dialogConfirmText"
    @close="dialogVisible = false"
  />
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from "vue";
import DialogLoginVue from "./DialogLogin.vue";
import lof from "localforage";
import { STORAGE_USER } from "../constants/user";

// 判断用户 登录、注册操作
const isLogin: Ref<boolean> = ref(false);
const dialogVisible: Ref<boolean> = ref(false);
const dialogConfirmText = computed(() => (isLogin.value ? "登录" : "注册"));
// 判断用户是否已经登录
const hasLogin: Ref<boolean> = ref(false);

getUser();
async function getUser() {
  const user = await lof.getItem(STORAGE_USER);
  hasLogin.value = (user as any)?.is_login ?? false;
}

function handleLogin() {
  isLogin.value = true;
  dialogVisible.value = true;
}

function handleRegister() {
  isLogin.value = false;
  dialogVisible.value = true;
}

function handleExit() {
  lof.removeItem(STORAGE_USER);
  location.reload();
}
</script>

<style scoped>
.welcome-tip {
  display: inline-block;
  margin-right: 8px;
  color: #ffffff;
  font-size: 14px;
}
.nav-header {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.register-btn {
  color: #ffffff;
  margin-right: 60px;
}
</style>