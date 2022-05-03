<template>
  <div class="price-list">
    <div class="title">我的询价单</div>
    <div class="content">
      <div class="content-operate">
        <div class="operate-select">
          <el-radio-group v-model="radio" size="large">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="询价中"></el-radio-button>
            <el-radio-button label="已获报价"></el-radio-button>
            <el-radio-button label="已结束"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="operate-search">
          <el-input placeholder="请输入内容" v-model="search" clearable>
          </el-input>
          <el-button class="search-btn" plain>搜索订单</el-button>
        </div>
      </div>
      <div class="content-table">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column fixed prop="date" label="发布日期 ↓" width="120">
          </el-table-column>
          <el-table-column prop="name" label="询价单" width="300">
          </el-table-column>
          <el-table-column prop="quote" label="已有报价" width="120">
          </el-table-column>
          <el-table-column prop="quantity" label="采购产品数" width="120">
          </el-table-column>
          <el-table-column prop="remainTime" label="剩余时间 ↓" width="150">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template v-slot="scope">
              <el-button
                @click="detailsClick(scope.row)"
                type="text"
                size="small"
                >详情</el-button
              >
              <el-button type="text" @click="editClick(scope.row)" size="small"
                >修改</el-button
              >
              <el-button type="text" size="small">结束</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 25]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination> -->
      </div>
      <div class="content-more"><span>点击查看更多需求 > ></span></div>
    </div>
    <div class="bottom">
      <el-button class="bottom-btn" type="primary">我要询价</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "priceList",
  data() {
    return {
      radio: "全部",
      search: "",
      currentPage: "",
      tableData: [
        {
          date: "2022-03-29",
          name: "2022年4月金属接近开光、链轮",
          quote: "8条",
          quantity: "3种",
          remainTime: "还剩2小时",
          state: "进行中",
        },
        {
          date: "2022-03-29",
          name: "2022年4月金属接近开光、链轮",
          quote: "8条",
          quantity: "3种",
          remainTime: "还剩2小时",
          state: "进行中",
        },
        {
          date: "2022-03-29",
          name: "2022年4月金属接近开光、链轮",
          quote: "8条",
          quantity: "3种",
          remainTime: "还剩2小时",
          state: "进行中",
        },
        {
          date: "2022-03-29",
          name: "2022年4月金属接近开光、链轮",
          quote: "8条",
          quantity: "3种",
          remainTime: "还剩2小时",
          state: "进行中",
        },
        {
          date: "2022-03-29",
          name: "2022年4月金属接近开光、链轮",
          quote: "8条",
          quantity: "3种",
          remainTime: "还剩2小时",
          state: "进行中",
        },
        {
          date: "2022-03-29",
          name: "2022年4月金属接近开光、链轮",
          quote: "8条",
          quantity: "3种",
          remainTime: "还剩2小时",
          state: "进行中",
        },
        {
          date: "2022-03-29",
          name: "2022年4月金属接近开光、链轮",
          quote: "8条",
          quantity: "3种",
          remainTime: "还剩2小时",
          state: "进行中",
        },
        {
          date: "2022-03-29",
          name: "2022年4月金属接近开光、链轮",
          quote: "8条",
          quantity: "3种",
          remainTime: "还剩2小时",
          state: "进行中",
        },
        {
          date: "2022-03-29",
          name: "2022年4月金属接近开光、链轮",
          quote: "8条",
          quantity: "3种",
          remainTime: "还剩2小时",
          state: "进行中",
        },
      ],
    };
  },
  methods: {
    editClick(info) {
      console.log("修改", info);
      this.$router.push("/price/priceList/modify");
    },
    detailsClick(info) {
      console.log("详情", info);
      this.$router.push("/price/priceList/details");
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
  },
};
</script>

<style scoped>
.price-list {
  width: 90%;
  height: calc(100vh - 110px);
  background-color: #ffffff;
}
.title {
  display: flex;
  align-items: center;
  width: 100%;
  height: 8%;

  font-size: 1.3rem;
  font-weight: 550;
}
.content {
  width: 100%;
  height: 80%;
}
.content-operate {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 10%;
}
.operate-search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
}
.search-btn {
  width: 40%;
  color: white;
  background-color: #2d3741;
}
.content-table {
  width: 100%;
  max-height: 80%;
  background-color: blue;
  overflow: scroll;
  overflow-x: hidden;
}
.content-more {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 10%;
}
.content-more span {
  margin-right: 3rem;

  font-size: 0.8rem;
  color: #80c5fa;
  cursor: pointer;
}

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 12%;
}
.bottom-btn {
  width: 17.25rem;
}
</style>