import { de, pa } from "element-plus/lib/locale";

// 绑定邮箱
export const STORAGE_EMAIL = "b2b_storage_email";
// 昵称
export const STORAGE_NICK_NAME = "b2b_storage_nick_name";
// 个人简介
export const STORAGE_DESCRIBE = "b2b_storage_describe";
// 国家地区
export const STORAGE_COUNTRY = "b2b_storage_country";
// 所在省市
export const STORAGE_CITY = "b2b_storage_city";
// 详细地址
export const STORAGE_ADDRESS = "b2b_storage_address";
// 联系电话
export const STORAGE_PHONE = "b2b_storage_phone";

// 用户信息对象
export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  describe: string;
  country: string;
  city: string;
  address: string;
  account: string;
  phone: string;
}
// 安全信息对象
export interface SecurityInfo {
  userId: number;
  password: string;
  question: string[];
  email: string;
  // 支付方式，银行卡，支付宝
  paymentMethod: string;
  // 支付方式对应账号，银行卡账号，支付宝账号昵称
  paymentAccount: string;
}
// 企业信息对象
export interface CompanyInfo {
  userId: number;
  name: string;
  businessLicenseCode: string;
  legalPerson: string;
  // 营业执照照片路径
  businessLicense: string;
  // 身份证复印件头像面路径
  positiveIDCard: string;
  // 国徽面路径
  oppositeIDCard: string;
}
