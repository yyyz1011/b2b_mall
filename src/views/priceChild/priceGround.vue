<template>
  <div class="price-ground">
    <div class="tips">
      <div class="tips-title">中标成交公告</div>
      <div class="tips-item">
        <span>【成交】恭喜永年县铁西凯盛紧因件厂</span>
        <span>【成交】恭喜武汉兴伟翔科技有眼责任公司</span>
      </div>
    </div>
    <div class="operate">
      <el-card class="card">
        <div class="operate-item1">
          <div>
            <span class="span-text">商机标签:</span>
            <el-checkbox
              v-model="checked"
              label="生产制造"
              border
              size="small"
            ></el-checkbox>
          </div>
          <el-tag type="info">多选</el-tag>
        </div>
        <div class="operate-item2">
          <div>
            <span class="span-text">物料行数:</span>
            <el-radio-group v-model="radio" size="small">
              <el-radio label="1" border>1行</el-radio>
              <el-radio label="2" border>2~5行</el-radio>
              <el-radio label="3" border>6行及以上</el-radio>
            </el-radio-group>
          </div>
          <el-tag type="info">单选</el-tag>
        </div>
        <div class="operate-item3">
          <div class="item3-left">
            <el-form
              label-position="top"
              label-width="80px"
              :inline="true"
              :model="searchForm"
            >
              <el-form-item label="关键词搜索">
                <el-input
                  size="medium"
                  v-model="searchForm.text"
                  placeholder="卖家名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="发布时间">
                <el-input
                  size="medium"
                  v-model="searchForm.name"
                  placeholder="请输入关键词"
                ></el-input>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-date-picker
                  v-model="searchForm.time"
                  type="daterange"
                  size="small"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <div class="item3-right">
            <el-button size="small">重置</el-button>
            <el-button size="small" type="warning">查询</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div class="info">
      <div class="info-item">
        <div
          class="item-items"
          v-for="item in infoList"
          :key="item.id"
          @click="planClick"
        >
          <div v-show="item.tips !== ''">
            <el-tag type="warning">{{ item.tips }}</el-tag>
          </div>
          <div class="items-name">{{ item.name }}</div>
          <div class="items-nav">{{ item.nav }}</div>
          <div class="items-quantity">
            <span>采购数量：</span>
            <span>{{ item.quantity }}</span>
          </div>
          <div class="items-addtime">
            <span>{{ item.address }}</span>
            <span>{{ item.time }}</span>
          </div>
          <div class="items-company">{{ item.company }}</div>
        </div>
      </div>
      <div class="info-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 25, 30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="20"
        >
        </el-pagination>
      </div>
    </div>
    <div class="btn">
      <el-button class="btn-button" type="primary">我要询价</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "priceGround",
  data() {
    return {
      radio: "1",
      checked: true,
      searchForm: {
        name: "",
        text: "",
        time: "",
      },
      currentPage: "5",
      infoList: [
        {
          id: 1,
          tips: "优质采购商两年零投诉",
          name: "中国纸业-广东冠豪-溢流阀-4项",
          nav: "#溢流阀、减压阀",
          quantity: "4000种",
          address: "广东湛江",
          time: "剩余1天",
          company: "中国纸业投资有限公司",
        },
        {
          id: 2,
          tips: "优质采购商一年零投诉",
          name: "中国纸业-广东冠豪-溢流阀-2项",
          nav: "#杀虫剂（黑...、背负式割草..）",
          quantity: "200种",
          address: "广东湛江",
          time: "剩余2天",
          company: "中国机械投资有限公司",
        },
        {
          id: 3,
          tips: "优质采购商三年零投诉",
          name: "中国纸业-青岛冠豪-4项",
          nav: "#减压阀",
          quantity: "4000种",
          address: "山东青岛",
          time: "剩余1天",
          company: "中国纸业投资有限公司",
        },
        {
          id: 4,
          tips: "优质采购商一年零投诉",
          name: "中国纸业-广东冠豪-溢流阀-1项",
          nav: "#杀虫剂（黑...）",
          quantity: "1500种",
          address: "广东湛江",
          time: "剩余6天",
          company: "中国纸业投资有限公司",
        },
        {
          id: 5,
          tips: "优质采购商一年零投诉",
          name: "中国纸业-广东冠豪-溢流阀-4项",
          nav: "#溢流阀、减压阀",
          quantity: "4000种",
          address: "广东湛江",
          time: "剩余3天",
          company: "中国纸业投资有限公司",
        },
        {
          id: 6,
          tips: "优质采购商一年零投诉",
          name: "中国纸业-广东冠豪-溢流阀-2项",
          nav: "#杀虫剂（黑...、背负式割草..）",
          quantity: "4000种",
          address: "广东湛江",
          time: "剩余3天",
          company: "中国纸业投资有限公司",
        },
        {
          id: 7,
          tips: "优质采购商两年零投诉",
          name: "中国纸业-广东冠豪-溢流阀-2项",
          nav: "#溢流阀、减压阀",
          quantity: "5600种",
          address: "广东湛江",
          time: "剩余3天",
          company: "中国纸业投资有限公司",
        },
        {
          id: 8,
          tips: "优质采购商一年零投诉",
          name: "中国纸业-陕西冠豪-溢流阀-2项",
          nav: "#杀虫剂（黑...、背负式割草..）",
          quantity: "4000种",
          address: "山西",
          time: "剩余5天",
          company: "中国纸业投资有限公司",
        },
      ],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    planClick() {
      this.$router.push("/price/priceGround/groundPlan");
    },
  },
};
</script>

<style scoped>
.price-ground {
  width: 100%;
  height: calc(100vh - 115px);
  background-color: #f1f1f1;
}
.card {
  display: flex;
  width: 100%;
  height: 90%;
}
.span-text {
  margin-right: 1rem;
  font-size: 0.8rem;
  color: #888988;
}
.tips {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6%;
  background-color: #ffffff;
}
.tips-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  height: 100%;
  color: #ff6a00;
  font-size: 0.9rem;
}
.tips-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 88%;
  height: 100%;
  font-size: 0.9rem;
}
.operate {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35%;
}
.operate-item1 {
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 77.5rem;
  height: 25%;
  border-bottom: 0.01rem solid #dadfda;
  box-sizing: border-box;
}
.operate-item1 div {
  display: flex;
  align-items: center;
  width: auto;
  height: 100%;
}

.operate-item2 {
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 25%;
  border-bottom: 0.01rem solid #dadfda;
  box-sizing: border-box;
}
.operate-item2 div {
  display: flex;
  align-items: center;
  width: auto;
  height: 100%;
}
.operate-item3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50%;
}
.item3-left {
  padding-top: 1rem;
  width: 70%;
  height: 100%;
  /* background-color: #ff6a00; */
}
.item-right {
  height: 100%;
  padding-top: 1rem;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 110%;
  background-color: #f1f1f1;
}
.info-item {
  padding: 0.5rem 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  width: 100%;
  height: 100%;
}
.item-items {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 80%;
  height: 90%;
  cursor: pointer;
  background-color: #ffffff;
}
.items-name {
  width: 100%;
  font-size: 1rem;
}
.items-nav {
  display: flex;
  align-items: center;
  width: 100%;
  height: 10%;
  font-size: 0.8rem;
  color: #686b68;
  background-color: #ecedef;
}
.items-quantity {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.8rem;
  color: #686b68;
}
.items-addtime {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.8rem;
  color: #686b68;
}
.items-company {
  width: 100%;
  font-size: 0.8rem;
  color: #686b68;
}
.info-pagination {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.btn {
  position: sticky;
  z-index: 15;
  bottom: -20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
}
.btn-button {
  width: 20%;
}
</style>