<template>
  <div class="group-plan">
    <div class="plan-left">
      <div class="plan">
        <div class="plan-card">
          <div class="title"><span>包装部临时计划</span></div>
          <div class="plan-card-content">
            <div class="plan-item1">
              <span>发布时间</span>
              <span>2022/05/06</span>
            </div>
            <div class="plan-item2">
              <el-progress :percentage="73" status="exception"></el-progress>
            </div>
            <div class="plan-item1">
              <span>截至时间</span>
              <span>2022/05/08</span>
            </div>
          </div>
          <div class="plan-card-bottom">
            <div class="plan-bottom-left">
              距离报价结束还剩：00 天 08 时 26分
            </div>
            <div class="plan-bottom-right">
              <el-button size="large" class="btn" type="danger"
                >立即报价</el-button
              >
              <div class="plan-bottom-right-item">
                <span>已收到 2 条报价</span>
                <span>报价要求含 13% 税</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product">
        <div class="title"><span>询价产品</span></div>
        <div class="product-table">
          <el-table :data="ProductData" border style="width: 100%">
            <el-table-column prop="index" label="序号" width="120">
            </el-table-column>
            <el-table-column prop="name" label="产品名称" width="180">
            </el-table-column>
            <el-table-column prop="num" label="单位" width="180">
            </el-table-column>
            <el-table-column prop="sum" label="数量" width="180">
            </el-table-column>
            <el-table-column prop="info" label="备注信息"> </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="require">
        <div class="title"><span>询价要求</span></div>
        <div class="require-table">
          <el-descriptions title="" direction="horizontal" :column="1" border>
            <el-descriptions-item label="发票要求"
              >发票税率13%</el-descriptions-item
            >
            <el-descriptions-item label="供应商要求"
              >供应商所在地:中国<br />认证信息:不限<br />会员等级:付费会员
            </el-descriptions-item>
            <el-descriptions-item label="收货地址" :span="2"
              >中国-山东省-菏泽市
            </el-descriptions-item>
            <el-descriptions-item label="补充说明">
              报价为含税到岸价;2、货到验收合格并收到合法有效的增值税专用发票后60天后10个工作日内付款;3、请务必提供供货期，供货期未能提供的，视同不能及时供货，我公司可根据生产需要优先选择提供供货周期的供应商（供货周期指:接到订单之日起货物到达我公司的天数)﹔4、本次竞价结束后只通知竞价成功供应商，未通知的，请供应商不得备货。
            </el-descriptions-item>
            <el-descriptions-item label="附件"
              ><span class="require-text"
                >无毒夹布胶管.png</span
              ></el-descriptions-item
            >
          </el-descriptions>
        </div>
      </div>
      <div class="receive">
        <div class="title"><span>已收到的部份报价</span></div>
        <div class="receive-table">
          <el-table :data="receiveData" border style="width: 100%">
            <el-table-column prop="time" label="报价发布时间">
            </el-table-column>
            <el-table-column prop="name" label="供应商"> </el-table-column>
            <el-table-column prop="address" label="所在地区"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="plan-right">
      <div class="right-card">
        <div class="right-card-title"><span>卖家档案</span></div>
        <div class="right-card-info">
          <span class="right-card-info-title">青岛啤酒（菏泽）有限公司</span>
          <span class="right-card-info-item">注册时间：2016-03-22</span>
          <span class="right-card-info-item">所在地区：中国-山东省-菏泽市</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "groupPlan",
  data() {
    return {
      ProductData: [
        {
          index: 1,
          num: "个",
          name: "机械密封",
          sum: "4",
          info: "规格型号：机械密封 529-35W-W/AFLS不带销，双合金，氟胶。品牌：博格斯。要求正品。",
        },
        {
          index: 2,
          num: "米",
          name: "无毒胶管",
          sum: "25",
          info: "规格型号：无毒胶管内径25， 无毒夹布胶管。",
        },
      ],
      receiveData: [
        {
          time: "2022/05/06",
          name: "山东*****公司",
          address: "山东省",
        },
        {
          time: "2022/05/06",
          name: "青岛*****公司",
          address: "山东省",
        },
      ],
    };
  },
};
</script>

<style scoped>
.group-plan {
  position: absolute;
  top: 60px;
  left: 200px;

  display: flex;
  justify-content: space-around;
  align-content: center;

  width: 89.6%;
  height: 93.5%;
  background-color: #f8f8f8;
  overflow: scroll;
  overflow-x: hidden;
}
.plan-left {
  width: 75%;
  height: 100%;
}
.title {
  margin-top: 1rem;
  width: 100%;
  height: auto;
  font-size: 1rem;
  font-weight: 550;
}
.plan {
  width: 100%;
  height: 25%;
}
.plan-card {
  width: 100%;
  height: 95%;
  border-radius: 0.5rem;
  background-color: #ffffff;
}
.plan-card-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40%;
}
.plan-item1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
  color: black;
  font-size: 0.8rem;
}
.plan-item2 {
  /* display: flex; */
  align-items: center;
  width: 80%;
  height: auto;
}
.plan-card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45%;
}
.plan-bottom-left {
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: 550;
}
.plan-bottom-right {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 25%;
  height: 100%;
}
.plan-bottom-right-item {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  height: 60%;
  font-size: 0.8rem;
  color: rgb(238, 91, 91);
}
.plan-right {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  width: 20%;
  height: 100%;
}
.btn {
  width: 50%;
}
.product {
  width: 100%;
  height: 18%;
}
.require {
  width: 100%;
  height: 42%;
}
.require-text {
  color: #38a2f9;
  font-size: 0.8rem;
}
.receive {
  width: 100%;
  height: 20%;
}
.right-card {
  margin-top: 2rem;
  width: 80%;
  height: 20%;
  background-color: white;

  border-radius: 0.1rem;
}
.right-card-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 25%;
  background-color: #eeeeee;
}
.right-card-title span {
  margin-left: 1rem;
  color: black;
  font-size: 1rem;
  font-weight: 550;
}
.right-card-info {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  height: 75%;
}
.right-card-info-title {
  color: #38a2f9;
  font-size: 1rem;
}
.right-card-info-item {
  color: #888585;
  font-size: 0.8rem;
}
</style>