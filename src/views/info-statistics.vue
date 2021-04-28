<template>
  <div id="info-statistics">
    <el-row class="headArea" :gutter="20">
      <el-col :span="6"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>单聊消息数</span>
          </div>
          <div class="box-card-body">99999</div></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>群聊消息数</span>
          </div>
          <div class="box-card-body">99999</div></el-card
        ></el-col
      ><el-col :span="6"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>今日新建群组数</span>
          </div>
          <div class="box-card-body">99999</div></el-card
        ></el-col
      ><el-col :span="6"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>累计建群数</span>
          </div>
          <div class="box-card-body">99999</div></el-card
        ></el-col
      >
    </el-row>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="单聊消息数" name="first">
        <div class="selectArea">
          <span>查询日期</span>
          <el-date-picker
            v-model="timeValue"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions1"
          >
          </el-date-picker>

          <el-button type="primary" @click="searchData">查询</el-button>
          <span class="tips">(查询时长最长为90天)</span>
        </div>

        <NewInfoChart :dd="timeValue" ref="NewInfoChart" />
      </el-tab-pane>
      <el-tab-pane label="群聊消息数" name="second">
        <div
          id="chartArea2"
          ref="second"
          style="width: 100rem; height: 30rem"
        ></div>
      </el-tab-pane>
      <el-tab-pane label="今日新建群组数" name="third"
        ><div
          id="chartArea3"
          ref="third"
          style="width: 100rem; height: 30rem"
        ></div></el-tab-pane
      ><el-tab-pane label="累计建群数" name="fourth"
        ><div
          id="chartArea4"
          ref="fourth"
          style="width: 100rem; height: 30rem"
        ></div
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NewInfoChart from "@/components/NewInfoChart.vue";

export default {
  components: {
    NewInfoChart,
  },
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 90 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
        },
      },
      activeName: "first",
      timeValue: "",
    };
  },
  methods: {
    searchData() {
      this.$refs.NewInfoChart.searchData();
    },
  },
};
</script>

<style lang="scss" scoped>
#info-statistics {
  padding: 1.2rem;
  .box-card-header {
    text-align: center;
  }
  .box-card-body {
    text-align: center;
    min-height: 5rem;
    line-height: 5rem;
    font-size: 30px;
  }
  .el-tabs {
    margin-top: 3rem;
    .selectArea {
      margin-left: 7rem;
      margin-bottom: 2rem;
      span {
        margin-left: 2rem;
        margin-right: 1rem;
      }
      button {
        margin-left: 2rem;
      }
      .tips {
        color: #97a8be;
      }
    }
  }
}
</style>