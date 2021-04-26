<template>
  <div id="user-statistics">
    <el-row class="headArea" :gutter="20">
      <el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>新增用户数</span>
          </div>
          <div class="box-card-body">9999</div></el-card
        ></el-col
      >
      <el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>活跃用户数</span>
          </div>
          <div class="box-card-body">9999</div></el-card
        ></el-col
      ><el-col :span="8"
        ><el-card class="box-card">
          <div slot="header" class="box-card-header">
            <span>累计用户数</span>
          </div>
          <div class="box-card-body">9999</div></el-card
        ></el-col
      >
    </el-row>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="新增用户数" name="first">
        <div class="selectArea">
          <el-select v-model="timeType" placeholder="请选择">
            <el-option
              v-for="item in dayOrMonth"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click="ddd(item.value)"
            >
            </el-option>
          </el-select>
          <span v-text="timeType == 'day' ? '按日:' : '按月:'"></span>
          <el-date-picker
            v-if="timeType == 'day'"
            v-model="timeValue"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-date-picker
            v-else
            v-model="timeValue"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          >
          </el-date-picker>
          <el-button type="primary" @click="searchData">查询</el-button>
        </div>
        <div id="chartArea" style="width: 100%; height: 30rem"></div>
      </el-tab-pane>
      <el-tab-pane label="活跃用户数" name="second">
        <div
          id="chartArea2"
          ref="second"
          style="width: 100rem; height: 30rem"
        ></div>
      </el-tab-pane>
      <el-tab-pane label="累计用户数" name="third"
        ><div
          id="chartArea3"
          ref="third"
          style="width: 100rem; height: 30rem"
        ></div
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { query_new_user } from "../api/manageApi";
export default {
  data() {
    return {
      activeName: "first",
      timeType: "day",
      timeValue: "",
      timeValue2: "",
      dayOrMonth: [
        {
          value: "day",
          label: "按日",
        },
        {
          value: "month",
          label: "按月",
        },
      ],
    };
  },
  watch: {},
  methods: {
    initEchart1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("chartArea"));

      // 指定图表的配置项和数据
      //表一
      let option = {
        title: {},
        tooltip: {},
        legend: {
          data: ["用户数"],
        },
        xAxis: {
          name: "日期",
          data: [
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
          ],
        },
        yAxis: {
          name: "消息数（条）",
        },
        series: [
          {
            name: "用户数",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
            itemStyle: { normal: { label: { show: true } } },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    initEchart2() {
      let myChart2 = echarts.init(document.getElementById("chartArea2"));
      //表2
      let option2 = {
        title: {},
        tooltip: {},
        legend: {
          data: ["用户数"],
        },
        xAxis: {
          name: "日期",
          data: [
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
          ],
        },
        yAxis: {
          name: "消息数（条）",
        },
        series: [
          {
            name: "用户数",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(option2);
    },
    initEchart3() {
      let myChart3 = echarts.init(document.getElementById("chartArea3"));
      //表三
      let option3 = {
        title: {},
        tooltip: {},
        legend: {
          data: ["用户数"],
        },
        xAxis: {
          name: "日期",
          data: [
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
            "2021-2-2",
          ],
        },
        yAxis: {
          name: "消息数（条）",
        },
        series: [
          {
            name: "用户数",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart3.setOption(option3);
    },
    //特殊查询
    searchData() {
      let beginTime = this.timeValue[0].getTime() / 1000;
      let endTime = this.timeValue[1].getTime() / 1000;
      console.log(beginTime, endTime);

      let parameter = {};
      parameter.optionID = "555";
      parameter.beginTime = Number(beginTime);
      parameter.endTime = Number(endTime);
      console.log(parameter, "查询用户数参数");
      query_new_user(parameter).then((res) => {
        console.log(res, "返回值");
      });
    },
    //初始化查询
    initData(date) {
      let today = new Date(date);
      let yesterday = new Date(date - 86400000);

      // //现在的时间
      // let Y = today.getFullYear() + "-";
      // let M =
      //   (today.getMonth() + 1 < 10
      //     ? "0" + (today.getMonth() + 1)
      //     : today.getMonth() + 1) + "-";
      // let D =
      //   (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " ";
      // let h =
      //   (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) +
      //   ":";
      // let m =
      //   (today.getMinutes() < 10
      //     ? "0" + today.getMinutes()
      //     : today.getMinutes()) + ":";
      // let s =
      //   today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
      // let strDate = Y + M + D + h + m + s;
      // //昨天的时间
      // let yY = yesterday.getFullYear() + "-";
      // let yM =
      //   (yesterday.getMonth() + 1 < 10
      //     ? "0" + (yesterday.getMonth() + 1)
      //     : yesterday.getMonth() + 1) + "-";
      // let yD =
      //   (yesterday.getDate() < 10
      //     ? "0" + yesterday.getDate()
      //     : yesterday.getDate()) + " ";
      // let yh =
      //   (yesterday.getHours() < 10
      //     ? "0" + yesterday.getHours()
      //     : yesterday.getHours()) + ":";
      // let ym =
      //   (yesterday.getMinutes() < 10
      //     ? "0" + yesterday.getMinutes()
      //     : yesterday.getMinutes()) + ":";
      // let ys =
      //   yesterday.getSeconds() < 10
      //     ? "0" + yesterday.getSeconds()
      //     : yesterday.getSeconds();
      // let strDateY = yY + yM + yD + yh + ym + ys;
      // console.log(strDate, "今天天的时间");
      // console.log(strDateY, "昨天的时间");
      let parameter = {};
      parameter.optionID = "555";
      parameter.beginTime = Number(yesterday);
      parameter.endTime = Number(today);
      console.log(parameter, "查询用户数参数");
      query_new_user(parameter).then((res) => {
        console.log(res, "返回值");
      });
    },
  },
  mounted() {
    this.initEchart1();
    this.initEchart2();
    this.initEchart3();
    // let timestamp = new Date().getTime(); //当前时间戳
    // this.initData(timestamp);
  },
};
</script>

<style lang="scss" scoped>
#user-statistics {
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
    }
  }
}
</style>