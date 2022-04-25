<template>
  <el-dialog
    v-model="visible"
    :title="confirmText + 'B2B线上采购平台'"
    width="40%"
  >
    <div class="dialog-content">
      <div class="dialog-content--title">B2B线上采购平台</div>
      <div>
        <el-tabs v-model="currentLoginType">
          <el-tab-pane
            v-for="item in loginTypeList"
            :key="item.key"
            :label="item.label"
            :name="item.key"
          />
        </el-tabs>
        <el-form v-model="form">
          <template v-if="isLoginByUsername">
            <el-form-item>
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
                clearable
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="form.password"
                placeholder="请输入密码"
                clearable
                show-password
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><Key /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item>
              <el-input
                v-model="form.phone"
                placeholder="请输入手机号"
                clearable
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><Iphone /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </template>
          <el-form-item align="center">
            <el-radio-group v-model="form.role">
              <el-radio-button
                v-for="item in loginRoleList"
                :key="item.key"
                :label="item.key"
                >{{ item.label }}</el-radio-button
              >
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleSubmit(false)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(true)">
          {{ confirmText }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, Ref, computed, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import { User, Key, Iphone } from "@element-plus/icons-vue";
import {
  loginTypeList,
  loginRoleList,
  STORAGE_IS_LOGIN,
  STORAGE_USERNAME,
  STORAGE_PASSWORD,
  STORAGE_PHONE,
  STORAGE_LOGIN_TYPE,
  STORAGE_LOGIN_ROLE,
} from "../constants/user";

const { proxy } = getCurrentInstance() as any;
const emit = defineEmits(["close"]);
const props = defineProps({
  visible: {
    required: true,
    type: Boolean,
  },
  isLogin: {
    required: true,
    type: Boolean,
  },
  confirmText: {
    required: true,
    type: String,
  },
});

const currentLoginType: Ref<string> = ref(loginTypeList[0].key);
const isLoginByUsername = computed(
  () => currentLoginType.value === loginTypeList[0].key
);
const form = ref({
  username: "",
  password: "",
  phone: "",
  role: loginRoleList[0].key,
});

const validateUsername = () => {
  const username = form.value.username;
  if (isLoginByUsername.value && username === "") return false;
  return true;
};
const validatePassword = () => {
  const password = form.value.password;
  if (isLoginByUsername.value && password === "") return false;
  return true;
};
const validatePhone = () => {
  const phone = form.value.phone;
  if (!isLoginByUsername.value && phone === "") return false;
  return true;
};
const validateList = [validateUsername, validatePassword, validatePhone];

async function handleSubmit(isSubmit: boolean) {
  if (!isSubmit) {
    emit("close");
    resetForm();
    return;
  }
  // NOTE: 通过REF获取dom调用validate有问题，空了可以研究下
  const data = await Promise.all(validateList.map((item) => item()));
  if (data.every((item) => item)) {
    if (props.isLogin) {
      const { username, password, phone, role } = form.value;
      sessionStorage.setItem(STORAGE_IS_LOGIN, "true");
      sessionStorage.setItem(STORAGE_USERNAME, username);
      sessionStorage.setItem(STORAGE_PASSWORD, password);
      sessionStorage.setItem(STORAGE_PHONE, phone);
      sessionStorage.setItem(STORAGE_LOGIN_TYPE, currentLoginType.value);
      sessionStorage.setItem(STORAGE_LOGIN_ROLE, role);
      ElMessage.success("登录成功");
      location.reload();
    } else {
      ElMessage.success("注册成功");
    }

    emit("close");
    resetForm();
  } else {
    proxy.$catch("校验出错，请检查表单信息");
  }
}

function resetForm() {
  form.value = {
    username: "",
    password: "",
    phone: "",
    role: loginRoleList[0].key,
  };
}
</script>

<style scoped>
.dialog-content--title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>