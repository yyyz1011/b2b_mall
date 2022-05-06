// 合同信息
export const STORAGE_CONTRACT = "b2b-contract";

// 合同信息接口
export interface Contract {
  filename: string;
  recipient: string;
  fileType: string;
  sender: string;
  status: string;
  orderId: string;
  createTime: number;
  // 合同文件地址
  contractFile: string;
}

export const contractList: Contract = {
  filename: "测试",
  recipient: "测试用户1",
  fileType: "图片",
  sender: "测试用户2",
  status: "待我签",
  orderId: "T12312312",
  createTime: 1651830358585,
  // 合同文件地址
  contractFile: "http://119.91.204.169/b2b/file/924112359ef349a58dcc0dedf015c4ca.jpeg",
};
