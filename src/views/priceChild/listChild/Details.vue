<template>
  <div class="details">
    <div class="info">
      <el-card class="card">
        <div class="info-title">
          <span>中国纸业骏泰科技-二氧化硫1项（季度采购）</span>
        </div>
        <div class="info-tag">
          <el-tag>大企业商机</el-tag>
          <el-tag type="warning">优质采购商一年零投诉</el-tag>
        </div>
        <div class="info-item">
          <div class="item-info">
            <span>询价单编号：</span>
            <span>47935672932</span>
          </div>
          <div class="item-info">
            <span>采购类型</span>
            <span>标准订单（单次采购）</span>
          </div>
          <div class="item-info">
            <span>询价时间</span>
            <span>2022年04月20日 14:51</span>
          </div>
          <div class="item-info">
            <span>联系人：</span>
            <span>× 付费后可见</span>
          </div>
          <div class="item-info">
            <span>报价截至时间：</span>
            <span>2022年04月22日 08:30</span>
          </div>
          <div class="item-info">
            <span>联系电话：</span>
            <span>47935672932</span>
          </div>
          <div class="item-info">
            <span>价格有效时期：</span>
            <span>2022年04月20日-2022年06月30日</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="require">
      <el-card class="card">
        <div class="require-title"><span>采购要求</span></div>
        <div class="require-tag">
          <span class="require-info-title">报价要求</span>
          <div>
            <el-tag class="tag-items">需要包含税价</el-tag>
            <el-tag class="tag-items">发票需要包含运费</el-tag>
            <el-tag class="tag-items">报价需要包含运费</el-tag>
            <el-tag class="tag-items">不允许对询价单部分物料报价</el-tag>
            <el-tag class="tag-items">不允许供应商报价 可改数量</el-tag>
          </div>
        </div>
        <div class="require-info">
          <div class="info-items">
            <span class="require-info-title">收货地址</span
            ><span
              >湖南 怀化 中方县
              怀化高新产业开发区湖南骏泰新材料类别材料仓库</span
            >
          </div>
          <div class="info-items">
            <span class="require-info-title">发票要求</span
            ><span>增值税专用发票（一般纳税人开具）</span>
          </div>
          <div class="info-items">
            <span class="require-info-title">交易方式</span
            ><span>到账支付（在结算对账后60天内付款）</span>
          </div>
          <div class="info-items">
            <span class="require-info-title">支付方式</span
            ><span
              >网商银行融易收(对公转账)、银行电子承兑汇票〈付款期限6个月)</span
            >
          </div>
          <div class="info-items">
            <span class="require-info-title">证照要求</span
            ><span>营业执照，税务登记证,组织机构代码证</span>
          </div>
        </div>
        <div class="reuqire-note">
          <div>
            <span class="require-info-title">补充说明描述</span>
            <span>--</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="list">
      <el-card class="card">
        <div class="list-title"><span>物料清单</span></div>
        <div class="list-operate">
          <div class="operate-left">
            <el-button>复制物料</el-button>
            <span class="require-info-title">共1个询价物料</span>
          </div>
          <div class="operate-right">
            <div>
              <el-input placeholder="请输入内容" v-model="input" clearable>
              </el-input>
            </div>
            <el-button>搜索</el-button>
          </div>
        </div>
        <div class="list-table">
          <el-table :data="listData" stripe style="width: 100%">
            <el-table-column prop="index" label="行号" width="180">
            </el-table-column>
            <el-table-column prop="num" label="物料编码" width="180">
            </el-table-column>
            <el-table-column prop="name" label="物料名称"> </el-table-column>
            <el-table-column prop="brand" label="品牌"> </el-table-column>
            <el-table-column prop="model" label="型号"> </el-table-column>
            <el-table-column prop="quantity" label="采购量"> </el-table-column>
          </el-table>
        </div>
        <div class="list-note">
          <span class="require-info-title">物料描述：张绍良13787566825</span>
        </div>
      </el-card>
    </div>
    <div class="quote">
      <el-card class="card">
        <div class="quote-title">
          <span>已收到报价</span>
        </div>
        <div class="quote-table">
          <el-table :data="quoteData" stripe style="width: 100%">
            <el-table-column prop="index" label="行号" width="120">
            </el-table-column>
            <el-table-column prop="time" label="报价时间" width="180">
            </el-table-column>
            <el-table-column prop="supplier" label="供应商"> </el-table-column>
            <el-table-column prop="address" label="所在地区"> </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
              <template v-slot="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >同意报价</el-button
                >
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      listData: [
        {
          index: "1",
          num: "1",
          name: "二氧化硫",
          brand: "--",
          model: "纯震99.9%",
          quantity: "45吨",
        },
      ],
      quoteData: [
        {
          index: "1",
          time: "2022-04-20 19:00",
          supplier: "山东xxxx公司",
          address: "山东青岛",
          price: "45.00万",
        },
      ],
    };
  },
};
</script>

<style scoped>
.details {
  width: 100%;
  min-height: calc(100vh - 120px);
  height: calc(100vh - 120px);
  background-color: aqua;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 99%;
  height: 95%;
}
.info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 35%;
  background-color: #f7f8fa;
}
.info-title {
  margin-bottom: 0.5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 61rem;
  height: 20%;
  font-size: 1.5rem;
}
.info-tag {
  width: 100%;
  height: 15%;
}
.info-item {
  padding: 0.3rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 2fr);
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;

  width: 100%;
  height: 65%;

  border-right: 0.6rem solid #ff5600;
  box-sizing: border-box;
}
.item-info {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 75%;

  font-size: 0.9rem;
}
.item-info span:nth-child(1) {
  width: 35%;
  color: #8c929b;
}
.item-info span:nth-child(2) {
  width: 65%;
}
.require {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 75%;
  background-color: #f7f8fa;
}
.require-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 61rem;
  height: 2rem;
  color: #5c5d5d;
  font-size: 1rem;
}
.require-tag {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  height: 30%;
}
.require-info-title {
  color: #8c929b;
  font-size: 0.9rem;
}
.tag-items {
  margin-right: 0.5rem;
}
.require-info {
  padding: 1rem 1rem 0.1rem 0;
  margin-bottom: 0.5rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 2fr);
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;

  width: 100%;
  height: 70%;
  border-bottom: 0.03rem solid #e4e6ea;
  box-sizing: border-box;
}
.info-items {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  font-size: 0.9rem;
}
.reuqire-note {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 28%;
}
.reuqire-note div {
  display: flex;
  flex-direction: column;
}
.list {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40%;
  background-color: #f7f8fa;
}
.list-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 61rem;
  height: 2rem;
  color: #5c5d5d;
  font-size: 1rem;
}
.list-operate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 25%;
}
.operate-left {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 25%;
}
.operate-right {
  display: flex;
}
.list-table {
  width: 100%;
}
.list-note {
  padding-left: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 25%;
}
.quote {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40%;
  background-color: #f7f8fa;
}
.quote-title{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 61rem;
  height: 2rem;
  color: #5c5d5d;
  font-size: 1rem;
}
.quote-table {
  width: 100%;
}
</style>