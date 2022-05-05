import { de, pa } from "element-plus/lib/locale";

// 基础信息
export const BASIC_SETTING = "b2b_basic_setting_";
// 安全信息
export const SECURITY_SETTING = "b2b_security_setting_";
// 认证信息
export const COMPANY_AUTH = "b2b_company_auth_";

// 用户信息对象
export interface UserInfo {
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
  // 支付方式对应账号，银行卡账号，支付宝账号昵称
  paymentAccount: string;
}
// 企业信息对象
export interface CompanyInfo {
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
