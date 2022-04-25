// 是否登录
export const STORAGE_IS_LOGIN = "b2b-storage-is-login";
// 账号密码登录
export const STORAGE_USERNAME = "b2b-storage-username";
export const STORAGE_PASSWORD = "b2b-storage-password";
// 手机号登录
export const STORAGE_PHONE = "b2b-storage-phone";
// 登录类型 账号密码登录/手机号登录
export const STORAGE_LOGIN_TYPE = "b2b-storage-login-type";
// 登录权限 企业用户/管理员
export const STORAGE_LOGIN_ROLE = "b2b-storage-login-role";

interface LoginType {
  id: number;
  label: string;
  key: string;
}
export const loginTypeList: LoginType[] = [
  { id: 1, label: "账号密码登录", key: "username" },
  { id: 2, label: "手机号登录", key: "phone" },
];

interface LoginRole {
  id: number;
  label: string;
  key: string;
}
export const loginRoleList: LoginRole[] = [
  { id: 1, label: "企业用户", key: "user" },
  { id: 2, label: "管理员", key: "admin" },
];
