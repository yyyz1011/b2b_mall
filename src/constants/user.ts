// 用户登录信息
export const STORAGE_USER = "b2b-storage-user";

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
