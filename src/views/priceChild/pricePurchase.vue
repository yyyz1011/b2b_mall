<template>
  <div class="price-purchase">
    <div class="title"><span>询价单</span></div>
    <div class="content">
      <div class="content-list">
        <div class="content-title">物料清单</div>
        <div class="list-form">
          <el-form
            :model="listForm"
            label-position="top"
            :inline="false"
            ref="listForm"
            label-width="100px"
            class="form-dynamic"
          >
            <el-form-item
              prop="email"
              label="商品名称"
              :rules="[
                { required: true, message: '请填写商品名称', trigger: 'blur' },
                {
                  type: 'email',
                  message: '请填写商品名称',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="listForm.email"
                placeholder="请填写商品名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              label="数量"
              :rules="{
                required: true,
                message: '数量不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                v-model="listForm.email"
                placeholder="请填数量"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email" label="单位"
              ><el-select
                v-model="value"
                class="form-select"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="email" label="品牌"
              ><el-input
                v-model="listForm.email"
                placeholder="无要求可不填"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email" label="备注">
              <el-input
                v-model="listForm.email"
                placeholder="如：型号、性能、用途等"
              ></el-input
            ></el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="submitForm('listForm')"
                >提交</el-button
              >
              <el-button @click="addDomain">新增域名</el-button>
              <el-button @click="resetForm('listForm')">重置</el-button>
            </el-form-item> -->
          </el-form>
          <span class="form-add">+添加一项</span>
        </div>
      </div>
      <div class="content-require">
        <div class="content-title">采购要求</div>
        <div class="require-form">
          <el-form
            :model="listForm"
            label-position="top"
            :inline="true"
            ref="listForm"
            label-width="100px"
            class="form-dynamic"
          >
            <el-form-item
              prop="email"
              label="发票要求"
              :rules="[
                { required: true, message: '请填写发票要求', trigger: 'blur' },
                {
                  type: 'email',
                  message: '请填发票要求',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="listForm.email"
                class="require-form-item"
                placeholder="是否需要发票 及税率"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="require"
              label="报价要求"
              :rules="{
                required: true,
                message: '要求不能为空',
                trigger: 'blur',
              }"
              ><el-select
                v-model="requireValue"
                class="require-form-item"
                multiple
                placeholder="多选（包含税、包含运费、不允许部分物料报价）"
              >
                <el-option
                  v-for="item in require"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="email"
              label="交易方式"
              :rules="{
                required: true,
                message: '交易方式不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                v-model="listForm.email"
                class="require-form-item"
                placeholder="账期支付（在结算对账后60天内付款）"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              label="支付方式"
              :rules="{
                required: true,
                message: '支付方式不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                v-model="listForm.email"
                class="require-form-item"
                placeholder="网商银行融易收（对公转账）、银行电子承兑汇票（付款期限6个月）多选"
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="email"
              label="供应商所在地"
              :rules="{
                required: true,
                message: '地址不能为空',
                trigger: 'blur',
              }"
              ><el-select
                class="require-form-item"
                v-model="value"
                placeholder="省 市"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="email"
              label="供应商资质"
              :rules="{
                required: true,
                message: '选项不能为空',
                trigger: 'blur',
              }"
              ><el-select
                v-model="value"
                class="require-form-item"
                placeholder="不限（营业执照、税务登记证、组织机构代理）"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="email" label="补充说明">
              <el-input
                v-model="listForm.email"
                type="textarea"
                class="require-form-item0"
                :autosize="{ minRows: 4, maxRows: 4 }"
              ></el-input
            ></el-form-item>
          </el-form>
        </div>
      </div>
      <div class="content-contact">
        <div class="content-title">联系方式</div>
        <div class="contact-form">
          <el-form
            :model="listForm"
            label-position="top"
            :inline="true"
            ref="listForm"
            label-width="100px"
            class="form-dynamic"
          >
            <el-form-item
              prop="email"
              label="联系人"
              :rules="[
                { required: true, message: '请填写联系人', trigger: 'blur' },
                {
                  type: 'email',
                  message: '请填写联系人',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="listForm.email"
                class="contact-form-item"
                placeholder="您的称呼"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              label="手机号"
              :rules="{
                required: true,
                message: '手机号不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                v-model="listForm.email"
                class="contact-form-item"
                placeholder="请填写手机号"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              label="短信验证码"
              class="contact-item-msg"
              :rules="{
                required: true,
                message: '验证码不能为空',
                trigger: 'blur',
              }"
            >
              <div>
                <el-input
                  v-model="listForm.email"
                  class="contact-form-item"
                  placeholder="输入验证码"
                ></el-input>
              </div>
              <el-button type="info">获取验证码</el-button>
            </el-form-item>
            <el-form-item prop="email" label="公司名称"
              ><el-input
                v-model="listForm.email"
                class="contact-form-item"
                placeholder="请填写公司名称"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email" label="收货地址"
              ><el-select
                class="contact-form-item"
                v-model="value"
                placeholder="请选择收货地址"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="email"
              label="询价名称"
              :rules="{
                required: true,
                message: '询价名称不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                v-model="listForm.email"
                class="contact-form-item"
                placeholder="请填写询价名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              label="报价截至时间"
              :rules="{
                required: true,
                message: '时间不能为空',
                trigger: 'blur',
              }"
            >
              <el-date-picker
                v-model="contancTime"
                class="contact-form-item"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker
            ></el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="bottom">
      <el-button size="large" type="primary">发布询价</el-button>
      <el-button size="large">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "pricePurchase",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "件",
        },
        {
          value: "选项2",
          label: "条",
        },
        {
          value: "选项3",
          label: "匹",
        },
      ],
      value: "",
      listForm: {
        domains: [
          {
            value: "",
          },
        ],
        email: "",
      },

      require: [
        {
          value: "选项1",
          label: "包含税",
        },
        {
          value: "选项2",
          label: "包含运费",
        },
        {
          value: "选项3",
          label: "不允许部分物料报价",
        },
      ],
      requireValue: [],

      contancTime: "",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.listForm.domains.indexOf(item);
      if (index !== -1) {
        this.listForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.listForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
  },
};
</script>

<style scoped>
.price-purchase {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
  height: calc(100vh - 140px);
  background-color: #f2f2f2;

  overflow-x: hidden;
}

.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 8%;
}
.title span {
  margin-left: 2.5%;

  color: #596164;
  font-size: 1rem;
  font-weight: 550;
}

.content {
  width: 97.5%;
  min-height: 84%;
  background-color: #ffffff;

  overflow: scroll;
  overflow-x: hidden;
}
.content-title {
  margin: 0.5rem 0;
  width: 100%;
  height: auto;

  font-size: 0.8rem;
  font-weight: 550;
  color: black;
}
.content-list {
  padding: 0 0 1% 2%;
  width: 100%;
  height: 30%;
  border-bottom: #f1f1f1 0.05rem solid;
}
.list-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  height: 82%;
}
.form-dynamic {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 99%;
  height: 65%;
}
:deep(.form-select) {
  width: 5.5rem;
}
:deep(.el-input__wrapper) {
  width: 11rem;
}
.form-add {
  height: auto;
  font-size: 0.8rem;
  color: #ef2629;

  cursor: pointer;
}

.content-require {
  padding: 0 0 1% 2%;

  width: 100%;
  height: 63%;
  border-bottom: #f1f1f1 0.05rem solid;
}
:deep(.require-form-item .el-input__wrapper) {
  width: 15rem;
}
:deep(.require-form-item0 .el-textarea__inner) {
  width: 58rem;
}
.content-contact {
  margin-bottom: 0.5rem;
  padding: 0 0 1% 2%;
  width: 100%;
  height: 50%;
  border-bottom: #f1f1f1 0.05rem solid;
}
.contact-item-msg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45%;
}
:deep(.contact-form-item .el-input__wrapper) {
  width: 12rem;
}

.bottom {
  padding-right: 5%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 8%;
  background-color: #ffffff;
}
</style>